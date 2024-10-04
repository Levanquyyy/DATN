import { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";

import {
  FaRegBuilding,
  FaBed,
  FaRulerCombined,
  FaMoneyBillWave,
  FaRegClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaAngleDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceOption = ({
  title,
  price,
  description,
  selected,
  onSelect,
  highlight,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  const options = [
    { days: 7, price: 45000, oldPrice: 56000, discount: 20 },
    { days: 14, price: 84000, oldPrice: 112000, discount: 25 },
    { days: 30, price: 144000, oldPrice: 240000, discount: 40 },
    { days: 30, price: 144000, oldPrice: 250000, discount: 41 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

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
            onSelect(e.target.checked);
            if (e.target.checked) setExpanded(true);
            else setSelectedOption(null);
          }}
          className="mt-1 mr-3"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{title}</h4>
            {highlight && (
              <span className="text-yellow-600 text-sm font-medium">
                Combo tối ưu
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{price}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          {highlight && (
            <div className="mt-2 text-sm text-gray-700">
              <p>
                <FaCheckCircle className="inline mr-1 text-green-500" /> Tin nổi
                bật + Đẩy tin
              </p>
              <p>
                <FaCheckCircle className="inline mr-1 text-green-500" /> Bao gồm
                Tin nổi bật - Nhiều hình ảnh và Đẩy tin tự động mỗi ngày
              </p>
              <p className="mt-1">
                <span className="line-through text-gray-500">
                  23.000 đ/ngày
                </span>{" "}
                <span className="font-semibold text-green-600">
                  16.666 đ/ngày
                </span>
              </p>
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
      {selected && expanded && (
        <div className="mt-4 space-y-2">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                selectedOption === index ? "bg-blue-100" : "bg-gray-100"
              }`}
              onClick={() => setSelectedOption(index)}
            >
              <span>{option.days} ngày</span>
              <div>
                <span className="font-semibold">
                  {option.price.toLocaleString()} đ
                </span>
                <span className="ml-2 line-through text-gray-500">
                  {option.oldPrice.toLocaleString()} đ
                </span>
                <span className="ml-2 text-green-600">-{option.discount}%</span>
              </div>
            </div>
          ))}
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
  const [selectedServices, setSelectedServices] = useState({
    sponsoredPost: false,
    featuredPost: null,
    priorityPost: false,
    comboOffer: false,
    Pushmessagesontimer: false,
  });

  const handleServiceSelection = (service, value) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: value,
    }));
  };
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Beautiful Apartment</h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <InfoItem icon={<FaRegBuilding />} label="Quantity" value="1" />
            <InfoItem icon={<FaBed />} label="Rooms" value="3" />
            <InfoItem icon={<FaRulerCombined />} label="Area" value="120 m²" />
            <InfoItem
              icon={<FaMoneyBillWave />}
              label="Price"
              value="15,000,000 VND/month"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Phương thức đăng tin</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Regular Posting (Free)</h3>
              <p>Displayed on Nhà Tốt as a regular listing for 60 days.</p>
              <div className="mt-2">
                <p className="flex items-center">
                  <FaRegClock className="mr-2" /> Posting Duration: 60 days
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2" /> Posting Period: From
                  02/10/2024 to 01/12/2024
                </p>
              </div>
            </div>
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
                selected={selectedServices.sponsoredPost}
                onSelect={(value) =>
                  handleServiceSelection("sponsoredPost", value)
                }
              />

              <div>
                <h3 className="font-semibold mb-2">
                  Featured Post - Multiple images
                </h3>
                <div className="space-y-2">
                  <ServiceOption
                    title="Basic"
                    price="4,800 VND/day"
                    selected={selectedServices.featuredPost === "basic"}
                    onSelect={() =>
                      handleServiceSelection("featuredPost", "basic")
                    }
                  />
                  <ServiceOption
                    title="Premium"
                    price="8,000 VND/day"
                    selected={selectedServices.featuredPost === "premium"}
                    onSelect={() =>
                      handleServiceSelection("featuredPost", "premium")
                    }
                  />
                </div>
              </div>

              <ServiceOption
                title="Priority Post"
                price="115,000 VND/day"
                selected={selectedServices.priorityPost}
                onSelect={(value) =>
                  handleServiceSelection("priorityPost", value)
                }
              />

              <ServiceOption
                title="Combo ưu đãi & tiện lợi"
                price="16,666 đ/ngày"
                description="Kết hợp các dịch vụ để tăng tối đa hiệu quả tin đăng, với mức giá ưu đãi cực tiết kiệm"
                selected={selectedServices.comboOffer}
                onSelect={(value) =>
                  handleServiceSelection("comboOffer", value)
                }
                highlight={true}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 p-6">
          <Button onClick={() => navigate("/paid")}>Thanh Toán</Button>
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
