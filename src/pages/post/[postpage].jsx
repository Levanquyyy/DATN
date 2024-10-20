import { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaRegBuilding,
  FaBed,
  FaRulerCombined,
  FaMoneyBillWave,
  FaAngleDown,
} from "react-icons/fa";
import { useAppStore } from "@/store";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const ServiceOption = ({
  title,
  price,
  description,
  selected,
  onSelect,
  highlight,
  daysOptions,
  discount,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedDays, setSelectedDays] = useState(daysOptions[0]);

  const toggleExpand = () => setExpanded(!expanded);

  const handleDaysChange = (value) => {
    const days = parseInt(value, 10);
    setSelectedDays(days);
    onSelect(selected, days);
  };

  const calculatePrice = () => {
    const basePrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    let totalPrice = basePrice * selectedDays;
    if (discount && discount[selectedDays]) {
      totalPrice -= totalPrice * discount[selectedDays];
    }
    totalPrice = Math.ceil(totalPrice / 1000) * 1000;
    return totalPrice.toLocaleString();
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } ${highlight ? "border-yellow-500 bg-yellow-50" : ""}`}
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
            <h4 className="font-semibold">{title}</h4>
          </div>
          <p className="text-sm text-gray-600">{price}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
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
            value={selectedDays.toString()}
            onValueChange={handleDaysChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>{selectedDays} ngày</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {daysOptions.map((days) => (
                <SelectItem key={days} value={days.toString()}>
                  {days} ngày
                </SelectItem>
              ))}
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
    featuredPost: { selected: null, days: 1, pricePerDay: 30000 }, // Premium
    comboOffer: { selected: false, days: 1, pricePerDay: 16666 },
  });

  // Cập nhật giá và số ngày khi chọn dịch vụ
  const handleServiceSelection = (
    service,
    selected,
    days = 1,
    pricePerDay = 0
  ) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: { selected, days, pricePerDay },
    }));
  };

  // Tổng tiền của các dịch vụ đã chọn
  const totalPrice = calculateTotalPrice(selectedServices);
  const data = useAppStore((state) => state.data);
  const user = useAppStore((state) => state.userInfo);
  const onSubmit = async () => {
    console.log(data);
    // const transformedData = {
    //   vnp_txnref: "35",
    //   username: data.fullName,
    //   product_id: data.id,
    //   content: data.content,
    //   vnp_amount: Math.ceil(totalPrice / 1000) * 1000,
    // };
    // console.log(transformedData);
    // try {
    //   const res = await axios.post(
    //     "http://127.0.0.1:8000/api/auth/product/add-posting-type",
    //     transformedData,
    //     {
    //       headers: {
    //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjkxMDgwNzIsImV4cCI6MTcyOTE5NDQ3MSwibmJmIjoxNzI5MTA4MDcyLCJqdGkiOiJjYlN6blNkWjB0TnQ5Z0hvIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KgnaAleFnkWnaLqbdcZ8WCaL4N8OkZrIefDwMrDhFHo`,
    //       },
    //     }
    //   );
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Nội dung các dịch vụ */}

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Dịch vụ bán nhanh hơn</h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <InfoItem
              icon={<FaRegBuilding />}
              label="tiêu đề"
              value={data.title}
            />
            <InfoItem icon={<FaBed />} label="phòng" value={data.bedroom_id} />
            <InfoItem
              icon={<FaRulerCombined />}
              label="diện tích"
              value={data.land_area + "m²"}
            />
            <InfoItem
              icon={<FaMoneyBillWave />}
              label="Giá"
              value={data.cost + "triệu" + " /tháng"}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Service Options</h2>
            <p className="mb-4">
              Offer additional services for faster selling:
            </p>

            <div className="space-y-4">
              <ServiceOption
                title="Sponsored Post"
                price="13,571 VND/day"
                description="Increase selling efficiency"
                selected={selectedServices.sponsoredPost.selected}
                onSelect={(value, days) =>
                  handleServiceSelection("sponsoredPost", value, days, 13571)
                }
                daysOptions={[1, 2, 3, 5, 7]}
              />

              <div>
                <h3 className="font-semibold mb-2">
                  Featured Post - Multiple images
                </h3>
                <div className="space-y-2">
                  <ServiceOption
                    title="Premium"
                    price="30,000 VND/day"
                    selected={
                      selectedServices.featuredPost.selected === "premium"
                    }
                    onSelect={(value, days) =>
                      handleServiceSelection(
                        "featuredPost",
                        "premium",
                        days,
                        30000
                      )
                    }
                    daysOptions={[1, 2, 3, 5, 7]}
                  />
                </div>
              </div>

              <ServiceOption
                title="Combo ưu đãi & tiện lợi"
                price="16,666 VND/day"
                description="Kết hợp các dịch vụ để tăng tối đa hiệu quả tin đăng, với mức giá ưu đãi cực tiết kiệm"
                selected={selectedServices.comboOffer.selected}
                onSelect={(value, days) =>
                  handleServiceSelection("comboOffer", value, days, 16666)
                }
                highlight={true}
                daysOptions={[1, 3, 7]}
                discount={{ 3: 0.28, 7: 0.16 }}
              />
            </div>
          </div>

          {/* Hiển thị tổng tiền */}
          {/*  */}
          <div className="flex justify-between items-center p-6">
            <span className="text-xl font-semibold">
              Tổng tiền:{" "}
              {(Math.ceil(totalPrice / 1000) * 1000).toLocaleString()} VND
            </span>

            {/* fix */}
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
