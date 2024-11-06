import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { MultiSelect } from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

import {
  Select,
  SelectContent,
  SelectItem,
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
const ServiceOption = ({
  title,
  price,
  description,
  selected,
  onSelect,
  highlight,
  daysOptions,
  discount,
  setTotalPrice, // Nhận setTotalPrice từ props
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedDays, setSelectedDays] = useState(daysOptions);
  const [selectedOption, setSelectedOption] = useState();
  const [optionsDataType, setOptionsDataType] = useState();
  useEffect(() => {
    const getOptionsDataType = async () => {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_SERVER_URL}/${GET_DATA_POSTINGTYPE2}`
        );

        // setSelectedServices(updatedServices);
        console.log(response.data.data);

        setOptionsDataType(response.data.data);
      } catch (error) {
        console.error("Signin error:", error.response?.data || error.message);
        toast.error(
          `Signin failed: ${error.response?.data?.message || error.message}`
        );
      }
    };

    getOptionsDataType();
  }, []);
  // console.log(selectedDays);
  // console.log(daysOptions[0]);

  const toggleExpand = () => setExpanded(!expanded);

  const handleDaysChange = (value) => {
    const days = parseInt(value, 10);
    setSelectedDays(days);
    onSelect(selected, days);
    console.log(value);
  };

  const handleOptionsChange = (value) => {
    // const selectedOption = optionsDataType.find(
    //   (item) => item.id.toString() === value
    // );
    // if (selectedOption) {
    //   setSelectedOption(selectedOption);
    //   onSelect(selected, selectedOption);
    //   console.log(selectedOption.name);
    // }

    const basePrice = parseFloat(price.replace(" VND/days", "")); // Lọc giá
    const selectedItemsCount = value.length; // Độ dài mảng đã chọn
    const updatedTotalPrice = basePrice * selectedItemsCount; // Tính tổng giá mới

    setTotalPrice(updatedTotalPrice); // Cập nhật totalPrice
    console.log("Giá mỗi ngày:", basePrice);
    console.log("Số lượng đã chọn:", selectedItemsCount);
    console.log("Tổng giá:", updatedTotalPrice);
  };
  const calculatePrice = () => {
    const basePrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    let totalPrice = basePrice * selectedDays;

    if (discount && discount[selectedDays]) {
      totalPrice -= totalPrice * discount[selectedDays];
    }

    return totalPrice.toLocaleString();
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        selected ? "border-blue-500 " : "border-gray-200"
      } ${
        highlight ? "border-yellow-500 bg-yellow-50 dark:text-blue-500" : ""
      }`}
    >
      <label className="flex items-start cursor-pointer">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            onSelect(e.target.checked, selectedDays);
            if (e.target.checked) setExpanded(true);
            else setExpanded(false);
          }}
          className="mt-1 mr-3"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold ">{title}</h4>
          </div>
          <p className="text-sm ">{price}</p>
          {description && (
            <p className="text-sm text-blue-500 mt-1 dark:text-yellow-500">
              {description}
            </p>
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
      {selected && expanded && (
        <div className="mt-4 space-y-2">
          <Select
            value={
              selectedDays
                ? selectedDays.toString()
                : selectedOption
                ? selectedOption.id.toString()
                : "1"
            }
            onValueChange={daysOptions ? handleDaysChange : handleOptionsChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {daysOptions
                  ? `${selectedDays} ngày`
                  : selectedOption
                  ? `${selectedOption.name} ngày`
                  : "1 ngày"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {daysOptions ? (
                daysOptions.map((days) => (
                  <SelectItem key={days} value={days.toString()}>
                    {days} ngày
                  </SelectItem>
                ))
              ) : optionsDataType ? (
                <MultiSelect
                  data={optionsDataType}
                  onChange={handleOptionsChange}
                />
              ) : (
                <div>Loading...</div>
              )}
            </SelectContent>
          </Select>

          <div className="mt-2">
            <span className="font-semibold">Total Price: </span>
            <span>{calculatePrice()} VND</span>
          </div>
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
const calculateTotalPrice = (selectedServices) => {
  let total = 0;
  Object.values(selectedServices).forEach((service) => {
    if (service.selected && service.days && service.pricePerDay) {
      total += service.days * service.pricePerDay;
    }
  });
  return total;
};

const PropertyPost = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState({
    sponsoredPost: { selected: false, days: 1, pricePerDay: 13571 },
    featuredPost: { selected: false, days: 1, pricePerDay: 30000 }, // Premium
    comboOffer: { selected: false, days: 1, pricePerDay: 16666 },
  });

  const [postingType, setPostingType] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedServiceUnder, setSelectedServiceUnder] = useState();
  const [daysOptions, setDaysOptions] = useState();

  useEffect(() => {
    const getPostingType = async () => {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_SERVER_URL}/${GET_DATA_POSTINGTYPE1}`
        );
        setPostingType(response.data.data);
        const updatedServices = {
          sponsoredPost: {
            selected: response.data.data.some(
              (item) => item.name === "sponsoredPost"
            ),
            days:
              response.data.data.find((item) => item.name === "sponsoredPost")
                ?.rule_day || 1,
            pricePerDay:
              response.data.data.find((item) => item.name === "sponsoredPost")
                ?.cost || 13571,
          },
          featuredPost: {
            selected: response.data.data.some(
              (item) => item.name === "featuredPost"
            ),
            days:
              response.data.data.find((item) => item.name === "featuredPost")
                ?.rule_day || 1,
            pricePerDay:
              response.data.data.find((item) => item.name === "featuredPost")
                ?.cost || 30000,
          },
          comboOffer: {
            selected: response.data.data.some(
              (item) => item.name === "comboOffer"
            ),
            days:
              response.data.data.find((item) => item.name === "comboOffer")
                ?.rule_day || 1,
            pricePerDay:
              response.data.data.find((item) => item.name === "comboOffer")
                ?.cost || 16666,
          },
        };
        setSelectedServices(updatedServices);
      } catch (error) {
        console.error("Signin error:", error.response?.data || error.message);
        toast.error(
          `Signin failed: ${error.response?.data?.message || error.message}`
        );
      }
    };

    getPostingType();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(selectedServices));
  }, [selectedServices]);

  const handleServiceSelection = (
    service,
    selected,
    days = 1,
    pricePerDay = 0
  ) => {
    setSelectedServices((prevSelectedServices) => {
      setDaysOptions(days);
      setSelectedServiceUnder(service);
      const updatedServices = Object.keys(prevSelectedServices).reduce(
        (acc, key) => {
          acc[key] = { ...prevSelectedServices[key], selected: false };
          return acc;
        },
        {}
      );
      return {
        ...updatedServices,
        [service]: { selected, days, pricePerDay },
      };
    });
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
        type_posting_id:
          selectedServiceUnder === "sponsoredPost"
            ? 1
            : selectedServiceUnder === "comboOffer"
            ? 2
            : selectedServiceUnder === "featuredPost"
            ? 3
            : 0,
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

  const onSubmit = async () => {
    const access_token = Cookies.get("access_token");
    const product_id = Cookies.get("productData");
    // const product_id = "productData";
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
        console.log(paymentResponse);

        if (paymentResponse.message === "success") {
          console.log(paymentResponse.data);

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
                  title={service.name}
                  price={`${service.cost} VND/days`}
                  description={service.title}
                  selected={selectedServices[service.name]?.selected}
                  onSelect={(selected, days) =>
                    handleServiceSelection(
                      service.name,
                      selected,
                      days,
                      service.cost
                    )
                  }
                  daysOptions={JSON.parse(service.rule_day)
                    ?.replace(/[\[\]]/g, "")
                    ?.split(",")
                    .map((day) => parseInt(day))}
                  setTotalPrice={setTotalPrice} // Truyền setTotalPrice
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center p-6">
            <span className="text-xl font-semibold">
              Tổng tiền: {totalPrice.toLocaleString()} VND
            </span>
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
