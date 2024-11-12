import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { SmartDatetimeInput } from "@/components/core/dateTime-input";
import { useAppStore } from "@/store";
import { MultiSelect } from "@/components/core/multi-selector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaAngleDown,
  FaBed,
  FaMoneyBillWave,
  FaRegBuilding,
  FaRulerCombined,
} from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";

import apiClient from "@/lib/api-client";
import {
  GET_DATA_POSTINGTYPE1,
  GET_DATA_POSTINGTYPE2,
} from "@/utilities/constant";
import { getDecryptedCookie } from "@/store/cookies/cookies.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ServiceOption = ({ data, isSelected, onSelect }) => {
  const { name, cost, title, description, rule_day } = data;
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [save_day, setSaveDay] = useState(0);
  const days = useAppStore((state) => state.days);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleExpand = () => setExpanded(!expanded);

  const calculatePrice = () => {
    const numericPrice = parseFloat(cost.replace(/[^0-9.-]+/g, ""));
    console.log(
      "name",
      name,
      "rule_day",
      save_day,
      "numericPrice",
      numericPrice
    );

    if (isNaN(numericPrice)) {
      console.error("Invalid price:", cost);
      return "Invalid price";
    }

    let totalPrice;
    if (name === "Tin thường") {
      totalPrice = numericPrice * save_day;
    } else {
      const daysLength = Array.isArray(days) ? days.length : 0;
      if (isNaN(daysLength)) {
        console.error("Invalid days length:", daysLength);
        return "Invalid days length";
      }
      totalPrice = numericPrice * daysLength;
    }

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(totalPrice);

    return formattedPrice;
  };

  // Parse rule_day into an array and format it for Select
  const parsedRuleDays = rule_day
    ? JSON.parse(rule_day.replace(/'/g, '"').replace(/^"|"$/g, "")).map(
        (day) => ({
          label: `${day} ngày`,
          value: day.toString(),
        })
      )
    : [];

  if (!Array.isArray(parsedRuleDays)) {
    console.error("Invalid rule_day format:", rule_day);
    return null;
  }

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        isSelected ? "border-blue-500 " : "border-gray-200"
      } ${expanded ? "border-yellow-500 bg-yellow-50 dark:text-blue-500" : ""}`}
    >
      <label className="flex items-start cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            onSelect(isSelected ? null : data);
            if (e.target.checked) setExpanded(true);
            else setExpanded(false);
          }}
          className="mt-1 mr-3"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold ">{title}</h4>
          </div>
          <p className="text-sm ">{cost}</p>
          {description && (
            <p className="text-sm text-blue-500 mt-1 dark:text-yellow-500">
              {description}
            </p>
          )}
          {name === "Tin thường" ? (
            <div className="pt-8 pb-16 w-96 mx-auto">
              <Select onValueChange={(value) => setSaveDay(parseInt(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn số ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Số ngày</SelectLabel>
                    {parsedRuleDays.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="pt-8 pb-16 w-96 mx-auto">
              <SmartDatetimeInput
                value={selectedDate}
                onValueChange={handleDateChange}
                placeholder="Enter a date and time"
              />
              {selectedDate && (
                <p className="mt-4">
                  Selected Date: {selectedDate.toLocaleString()}
                </p>
              )}
              <ul>
                {[...new Set(days)]?.map((time, index) => (
                  <li key={index} className="text-sm">
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={toggleExpand} className="ml-2 focus:outline-none">
          <FaAngleDown
            className={`transition-transform ${
              expanded ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </label>
      {isSelected && expanded && (
        <div className="mt-2">
          <span className="font-semibold">Total Price: </span>
          <span>{calculatePrice()}</span>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-blue-500 mr-2">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const PropertyPost = () => {
  const navigate = useNavigate();
  const [postingType, setPostingType] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getPostingType = async () => {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_SERVER_URL}/${GET_DATA_POSTINGTYPE1}`
        );
        setPostingType(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Signin error:", error.response?.data || error.message);
        toast.error(
          `Signin failed: ${error.response?.data?.message || error.message}`
        );
      }
    };

    getPostingType();
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };
  const createTransformedData = (userData, product_id, totalPrice) => {
    const vnp_txnref = uuidv4();
    if (userData && product_id && totalPrice) {
      return {
        vnp_txnref: vnp_txnref,
        username: userData.lastname,
        product_id: getDecryptedCookie(product_id),
        vnp_amount: Math.ceil(totalPrice / 1000) * 1000,
        user_id: userData.id,
        day: daysOptions,
        // type_posting_id:
        //   selectedServiceUnder === "sponsoredPost"
        //     ? 1
        //     : selectedServiceUnder === "comboOffer"
        //     ? 2
        //     : selectedServiceUnder === "featuredPost"
        //     ? 3
        //     : 0,
      };
    } else {
      return;
    }
  };

  const postPayment = async (transformedData) => {
    try {
      const response = await apiClient.post(
        "http://localhost:8000/api/zalopay/payment",
        transformedData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error posting payment:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  const getUserData = async () => {
    try {
      const response = await apiClient.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user info:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  const onSubmit = async () => {
    const access_token = Cookies.get("access_token");
    const product_id = Cookies.get("productData");
    if (!access_token || !product_id) {
      console.error("No access token or product id not found");
      toast.error("No access token or product id not found");
      return;
    }

    try {
      const userData = await getUserData();
      const transformedData = createTransformedData(
        userData,
        product_id,
        totalPrice
      );

      if (transformedData === undefined) {
        navigate("/myads");
      } else {
        const paymentResponse = await postPayment(transformedData);

        if (paymentResponse.message === "success") {
          window.open(paymentResponse.data, "_blank");
          toast.success("Payment successful!");
        }
      }
    } catch (error) {
      toast.error(
        `Payment failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Dịch vụ bán nhanh hơn</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"></div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Service Options</h2>
            <p className="mb-4">
              Offer additional services for faster selling:
            </p>

            <div className="space-y-4">
              {postingType.map((service) => (
                <ServiceOption
                  key={service.id}
                  data={service}
                  isSelected={selectedService?.id === service.id}
                  onSelect={handleSelectService}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center p-6">
            <Button onClick={() => onSubmit()}>Thanh Toán</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div
            className="flex rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3"></div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <div className="font-[sans-serif] w-full">
                {/* Your new div tag */}
                <div className="w-full flex justify-center items-center">
                  {/* Content for the new div */}
                  <PropertyPost />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default PostPage;
