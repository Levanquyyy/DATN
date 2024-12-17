import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaHeart, FaStore, FaCoins } from 'react-icons/fa';
import apiClient from '@/lib/api-client';

import { GET_DATA_BY_USERID, GET_USER } from '@/utilities/constant';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';
import {
  hiddenPost,
  loadPost,
  showHiddenPost,
} from '@/routes/apiforRentHouse.jsx';
import { fetchUserInfo } from '@/routes/apiforUser.jsx';
import { PostBoostPurchase } from '@/components/website/ui/PostBoostPurchase.tsx';
import { PostItem } from '@/components/website/ui/PostItem.tsx';
import { v4 as uuidv4 } from 'uuid';
import { subpayment } from '@/routes/apiforpayment.jsx';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
const initialTabs = [
  { name: 'ĐANG HIỂN THỊ', count: 0 },
  { name: 'Tin Vip', count: 0 },
  { name: 'Đã ẩn', count: 0 },
];

const BillPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('ĐANG HIỂN THỊ');
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState(initialTabs);
  const [dataByUserId, setDataByUserId] = useState({});
  const [flagged, setFlagged] = useState(false);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // const currentProduct = productData[activeTab];
  const checkLoadBtn = async (id) => {
    try {
      const res = await loadPost(id);
      if (res === 'warning') {
        toast.error('Đợi thêm 5 tiếng cho lần đẩy tiếp theo');
      } else if (res === 'error') {
        toast.error('Hết lượt đẩy tin!');
        setFlagged(true);
        setId(id);
      } else {
        // Handle successful post boost
        toast.success('Đẩy tin thành công');
        // Update your UI or state as needed
      }
    } catch (error) {
      console.error('Error loading post:', error);
      toast.error('Có lỗi xảy ra khi đẩy tin');
    }
  };

  const handlePurchase = async (amount) => {
    try {
      const vnp_txnref = uuidv4();
      const userInfo = await fetchUserInfo();

      const data = {
        vnp_txnref: vnp_txnref,
        id: id,
        vnp_amount: 30000 * amount, // Hardcoded value
        user_id: userInfo.id,
        load_key_post: amount,
      };
      const paymentResponse = await subpayment(data);
      if (paymentResponse.message === 'success') {
        window.open(paymentResponse.data, '_blank');
        toast.success('Payment successful!');
      }
      setFlagged(false);
      // Update your UI or state as needed after successful purchase
    } catch (error) {
      console.error('Error purchasing boosts:', error);
      toast.error('Có lỗi xảy ra khi mua lượt đẩy tin');
    }
  };
  const handleHiddenToggle = async (id, isHidden) => {
    try {
      let response;
      const status = isHidden ? 1 : 0; // Convert isHidden to 1 or 0
      if (isHidden) {
        // Gỡ bỏ ẩn tin
        response = await showHiddenPost(id, status);
        localStorage.setItem(id, 'false'); // Lưu trạng thái "không ẩn" vào localStorage
      } else {
        // Ẩn tin
        response = await hiddenPost(id, status);
        localStorage.setItem(id, 'true'); // Lưu trạng thái "ẩn" vào localStorage
      }
      return {
        ...response,
      };
    } catch (error) {
      console.error('Error toggling post visibility:', error);
      return {
        status: 'error',
        message: 'Có lỗi xảy ra khi thực hiện thao tác',
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userInfo = await fetchUserInfo();
      setUser(userInfo);

      if (userInfo) {
        try {
          const response = await apiClient.get(
            `${GET_DATA_BY_USERID}/${userInfo.id}`
          );
          const fetchedData = response.data.data;

          // Lưu trạng thái "ẩn" từ localStorage vào dữ liệu bài đăng
          const updatedData = fetchedData.map((item) => {
            const isHidden = localStorage.getItem(item.id) === 'true';
            return { ...item, isHidden };
          });

          const formattedData = {
            'ĐANG HIỂN THỊ': updatedData.filter(
              (item) => item.approved === 1 && item.status === 1
            ),
            'Tin Vip': updatedData.filter(
              (item) => item.type_posting_id === 4 && item.status === 1
            ),
            'Đã ẩn': updatedData.filter(
              (item) => item.approved === 1 && item.status === 0
            ),
          };

          const updatedTabs = tabs.map((tab) => ({
            ...tab,
            count: formattedData[tab.name] ? formattedData[tab.name].length : 0,
          }));

          setDataByUserId(formattedData);
          setTabs(updatedTabs);
        } catch (error) {
          console.error('Signin error:', error.response?.data || error.message);
          toast.error(
            `Signin failed: ${error.response?.data?.message || error.message}`
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab]);

  const currentProducts = dataByUserId[activeTab] || [];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="w-full  p-4 shadow-2xl">
            <div className=" rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="p-4 flex justify-between items-center border-b">
                <div className="flex items-center space-x-4">
                  {isLoading ? (
                    <Skeleton className="w-48 h-12" />
                  ) : (
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-semibold text-lg">
                        {user?.firstname + ' ' + user?.lastname}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Button>
                    <FaStore />
                    <span>Tạo cửa hàng</span>
                  </Button>
                </div>
              </div>

              <div className="flex overflow-x-auto p-2">
                {isLoading ? (
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="w-32 h-10" />
                    ))}
                  </div>
                ) : (
                  tabs.map((tab) => (
                    <Button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      variant={activeTab === tab.name ? 'default' : 'outline'}
                      className="whitespace-nowrap mr-2"
                    >
                      {tab.name} ({tab.count})
                    </Button>
                  ))
                )}
              </div>
            </div>

            {isLoading ? (
              // Skeleton for product cards
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                      <Skeleton className="w-full md:w-1/2 h-[400px]" />
                      <div className="md:w-1/2 p-6 space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex space-x-4">
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-10 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              currentProducts.map((item) => {
                const firstImageUrl = item.images[0];
                return (
                  <div
                    className="rounded-lg shadow-lg overflow-hidden mb-6"
                    key={item.id}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img
                          src={firstImageUrl}
                          alt={`${item.title} 1`}
                          className="w-full h-[400px] object-cover"
                          loading={'lazy'}
                        />
                      </div>
                      <div className="md:w-1/2 p-6">
                        <div className="flex justify-between items-start">
                          <h1 className="text-2xl font-bold">{item.title}</h1>
                          <Button
                            variant="outline"
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                          >
                            <FaHeart className="text-xl" />
                          </Button>
                        </div>
                        <div className="mt-4 flex items-center">
                          <FaCoins className="mr-2" />
                          <p className="text-3xl font-bold">{item.cost} VND</p>
                        </div>
                        <div className="mt-6 space-y-3">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            <span>
                              Ngày đăng tin:{' '}
                              {format(new Date(item.updated_at), 'dd/MM/yyyy')}
                            </span>
                          </div>
                          <div className="mt-6">
                            <h2 className="font-semibold ">
                              Dịch vụ gần đây: {''}
                              {item.type_posting_id === 1
                                ? 'Đăng tin thường'
                                : item.type_posting_id === 4
                                  ? 'Đăng tin VIP'
                                  : 'Gói không xác định'}
                            </h2>
                          </div>
                        </div>
                        <div className="mt-8 space-x-4">
                          <Button variant="secondary" onClick={() => {}}>
                            Xem chi tiết
                          </Button>
                          <PostItem
                            key={item.id}
                            id={item.id}
                            onHiddenToggle={handleHiddenToggle}
                          />
                          <Button
                            variant="default"
                            onClick={() => checkLoadBtn(item.id)}
                          >
                            Đẩy tin ({item.load_btn_post})
                          </Button>
                          <PostBoostPurchase
                            isOpen={flagged}
                            onClose={() => setFlagged(false)}
                            onPurchase={handlePurchase}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default BillPage;
