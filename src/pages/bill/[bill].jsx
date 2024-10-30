import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import {
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHeart,
  FaPlus,
  FaStore,
  FaCoins,
} from "react-icons/fa";
import apiClient from "@/lib/api-client";

import { GET_DATA_BY_USERID, GET_USER } from "@/utilities/constant";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { format, addDays } from "date-fns";
const initialTabs = [
  { name: "ĐANG HIỂN THỊ", count: 0 },
  { name: "HẾT HẠN", count: 0 },
  { name: "BỊ TỪ CHỐI", count: 0 },
  { name: "CẦN THANH TOÁN", count: 0 },
  { name: "TIN NHẬP", count: 0 },
  { name: "CHỜ DUYỆT", count: 0 },
  { name: "ĐÃ ĂN", count: 0 },
];
const fetchUserInfo = async () => {
  const access_token = Cookies.get("access_token");

  if (access_token) {
    try {
      const response = await apiClient.get(`${GET_USER}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user info:",
        error.response?.data || error.message
      );
      return null;
    }
  } else {
    console.error("No access token found");
    return null;
  }
};

const BillPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("ĐANG HIỂN THỊ");
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState(initialTabs);
  const [dataByUserId, setDataByUserId] = useState({});
  // const currentProduct = productData[activeTab];

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await fetchUserInfo();
      setUser(userInfo);

      if (userInfo) {
        try {
          const response = await apiClient.get(
            `${GET_DATA_BY_USERID}/${userInfo.id}`
          );
          const fetchedData = response.data.data;
          const formattedData = {
            "ĐANG HIỂN THỊ": fetchedData.filter((item) => item.approved === 1),
            "HẾT HẠN": fetchedData.filter((item) => item.status === "HẾT HẠN"),
            "BỊ TỪ CHỐI": fetchedData.filter(
              (item) => item.status === "BỊ TỪ CHỐI"
            ),
            "CẦN THANH TOÁN": fetchedData.filter(
              (item) => item.status === "CẦN THANH TOÁN"
            ),
            "TIN NHẬP": fetchedData.filter(
              (item) => item.status === "TIN NHẬP"
            ),
            "CHỜ DUYỆT": fetchedData.filter((item) => item.approved === 2),
            "ĐÃ ĂN": fetchedData.filter((item) => item.status === "ĐÃ ĂN"),
          };
          const updatedTabs = tabs.map((tab) => ({
            ...tab,
            count: formattedData[tab.name] ? formattedData[tab.name].length : 0,
          }));
          setDataByUserId(formattedData);
          setTabs(updatedTabs);
        } catch (error) {
          console.error("Signin error:", error.response?.data || error.message);
          toast.error(
            `Signin failed: ${error.response?.data?.message || error.message}`
          );
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("dataByUserId", dataByUserId);
  }, [dataByUserId]);
  // const currentProduct = dataByUserId[activeTab]
  //   ? dataByUserId[activeTab][0]
  //   : null;
  const currentProducts = dataByUserId[activeTab] || [];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="max-w-7xl mx-auto p-4 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="p-4 flex justify-between items-center border-b">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="font-semibold text-lg">
                    {user?.firstname + " " + user?.lastname}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FaStore />
                    <span>Tạo cửa hàng</span>
                  </button>
                  <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <FaPlus className="text-gray-600" />
                    <span>Số dư: 0</span>
                  </div>
                </div>
              </div>

              <div className="flex overflow-x-auto p-2 bg-gray-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg mr-2 ${
                      activeTab === tab.name
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>
            </div>
            {currentProducts.map((item) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={item.id}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>

                  <div className="md:w-1/2 p-6">
                    <div className="flex justify-between items-start">
                      <h1 className="text-2xl font-bold text-gray-800">
                        {item.title}
                      </h1>
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-full ${
                          isLiked ? "text-red-500" : "text-gray-400"
                        }`}
                      >
                        <FaHeart className="text-xl" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center">
                      <FaCoins className="mr-2" />
                      <p className="text-3xl font-bold text-blue-600">
                        {item.cost}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>
                          {item.province_code + " - " + item.ward_code}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2" />
                        <span>
                          Ngày đăng tin:{" "}
                          {format(new Date(item.updated_at), "dd/MM/yyyy")}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span>
                          Hết hạn:{" "}
                          {format(
                            addDays(
                              new Date(item.updated_at),
                              item.day_package_expirition
                            ),
                            "dd/MM/yyyy"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <FaEye className="mr-2" />
                        <span>{item.views} lượt xem</span>
                      </div>
                    </div>

                    <div className="mt-8 space-x-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Xem chi tiết
                      </button>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Gia hạn tin
                      </button>
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Đẩy tin
                      </button>
                    </div>

                    <div className="mt-6">
                      <h2 className="font-semibold text-gray-700">
                        Dịch vụ gần đây
                      </h2>
                      <p className="text-gray-500 mt-1">
                        {item.type_posting_id === 1
                          ? "đăng tin thường"
                          : item.type_posting_id === 2
                          ? "đăng tin VIP"
                          : item.type_posting_id === 3
                          ? "đăng tin ưu tiên"
                          : "Chưa mua gói"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
export default BillPage;
