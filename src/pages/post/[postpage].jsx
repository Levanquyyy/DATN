import { useEffect, useState } from 'react';
import * as React from 'react';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { v4 as uuidv4 } from 'uuid';

import { format, isBefore, startOfDay } from 'date-fns';

import apiClient from '@/lib/api-client';
import { GET_DATA_POSTINGTYPE1 } from '@/utilities/constant';
import { getDecryptedCookie } from '@/store/cookies/cookies.js';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataProductByIdRent } from '@/routes/apiforRentHouse.jsx';
import { fetchUserInfo } from '@/routes/apiforUser.jsx';
import { postPayment } from '@/routes/apiforpayment.jsx';

const PropertyPost = ({ id }) => {
  const navigate = useNavigate();
  const [postingType, setPostingType] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();
  const [selectedDays, setSelectedDays] = React.useState();
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [posting_data_type, setPosting_data_type] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [isFirstOptionExpanded, setIsFirstOptionExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [postCount, setPostCount] = useState(1);
  const today = startOfDay(new Date());
  const [saveindex, setSaveIndex] = useState(0);
  useEffect(() => {
    setSelectedTimeSlots([]);
  }, [selectedOption]);
  const isDateDisabled = (date) => {
    return isBefore(date, today);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (selectedOptions.includes(1)) {
      totalPrice += 15000;
    }
    if (selectedOptions.includes(2)) {
      totalPrice += 50000;
    }
    if (selectedOptions.includes(3)) {
      totalPrice += parseInt(postingType[2]?.cost || 0) * postCount;
    }
    return totalPrice.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const handlePostCountChange = (increment) => {
    setPostCount((prev) => Math.max(1, Math.min(5, prev + increment)));
  };

  useEffect(() => {
    const getPostingType = async () => {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_SERVER_URL}/${GET_DATA_POSTINGTYPE1}`
        );
        setPostingType(response.data.data);

        response.data.data.map((item) => {
          if (item.code === 'nZa6Z81KVR') {
            setPosting_data_type(item.posting_data_type);
          }
        });
      } catch (error) {
        console.error('Signin error:', error.response?.data || error.message);
        toast.error(
          `Signin failed: ${error.response?.data?.message || error.message}`
        );
      }
    };

    getPostingType();
  }, []);
  const handleCheckboxChange = (index, checked) => {
    setSelectedOptions((prev) => {
      if (index === 0) {
        // Tin thường
        if (checked) {
          setSaveIndex(1); // Set index value = 1 cho Tin thường
          return [1];
        } else {
          return prev.filter((opt) => opt !== 1 && opt !== 3);
        }
      } else if (index === 1) {
        // Tin Vip
        if (checked) {
          setSaveIndex(4); // Set index value = 4 cho Tin Vip
          return [2];
        } else {
          return prev.filter((opt) => opt !== 2);
        }
      } else if (index === 2) {
        // Load tin
        if (checked) {
          setSaveIndex(1); // Set index value = 4 (Load tin thuộc cùng loại)
          return [...new Set([...prev, 1, 3])];
        } else {
          return prev.filter((opt) => opt !== 3);
        }
      }
      return prev;
    });

    setIsFirstOptionExpanded((prev) => (index === 0 ? checked : prev));
  };

  const createTransformedData = (userData, product_id, totalPrice) => {
    const transformSelectedDays = parseInt(selectedDays);
    const transformTime = parseInt(selectedOption);
    console.log(transformSelectedDays);
    const vnp_txnref = uuidv4();
    if (userData && product_id && totalPrice) {
      return {
        vnp_txnref: vnp_txnref,
        product_id: product_id,
        vnp_amount: totalPrice,
        user_id: userData,
        type_posting_id: saveindex,
        load_key_post: postCount,
      };
    } else {
      return;
    }
  };

  const onSubmit = async () => {
    const getData = await getDataProductByIdRent(id);
    const getUser = await fetchUserInfo();

    let total = calculateTotalPrice();
    // Convert total to a number
    total = parseFloat(total.replace(/[^\d.-]/g, '')) * 1000;
    if (!getData || !getUser) {
      toast.error('Sản phẩm không hợp lệ! hoặc bạn chưa đăng nhập');
    }

    try {
      const transformedData = createTransformedData(
        getUser.id,
        getData.data.id,
        total
      );

      if (transformedData === undefined) {
        navigate('/myads');
      } else {
        const paymentResponse = await postPayment(transformedData);

        if (paymentResponse.message === 'success') {
          window.open(paymentResponse.data, '_blank');
          toast.success('Payment successful!');
        }
      }
    } catch (error) {
      toast.error(
        `Payment failed: ${error.response?.data?.message || error.message}`
      );
    }
  };
  const handleTimeChange = (selectedTime) => {
    console.log('Selected time: ', selectedTime);

    setSelectedTimeSlots((prev) => {
      if (prev.includes(selectedTime)) {
        return prev.filter((item) => item !== selectedTime);
      } else {
        return [...prev, selectedTime];
      }
    });
  };
  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Dịch vụ bán nhanh hơn
          </CardTitle>
          <p className="text-sm text-muted-foreground">Service Options</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {postingType.slice(0, 2).map((service, index) => (
              <Card
                key={service.id}
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={`${index + 1}`}
                      className="mt-1"
                      checked={selectedOptions.includes(index + 1)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(index, checked)
                      }
                      disabled={index === 1 && selectedOptions.includes(1)}
                    />
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor={`${index + 1}`}
                        className="font-medium cursor-pointer"
                      >
                        {service.name} (
                        {parseInt(service.cost).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                        )
                      </label>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                        <li>{service.benefits}</li>
                      </ul>
                      {index === 0 && isFirstOptionExpanded && (
                        <Card className="mt-4 border border-dashed">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                id="3"
                                className="mt-1"
                                checked={selectedOptions.includes(3)}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(2, checked)
                                }
                              />
                              <div className="flex-1 space-y-2">
                                <label
                                  htmlFor="3"
                                  className="font-medium cursor-pointer"
                                >
                                  {postingType[2]?.name} (
                                  {parseInt(
                                    postingType[2]?.cost || 0
                                  ).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                  })}
                                  )
                                </label>
                                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                                  <li>{postingType[2]?.benefits}</li>
                                </ul>
                                {selectedOptions.includes(3) && (
                                  <div className="flex items-center space-x-4 mt-2">
                                    <span className="text-sm font-medium">
                                      Số lượng tin:
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => handlePostCountChange(-1)}
                                      disabled={postCount === 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={postCount}
                                      onChange={(e) =>
                                        setPostCount(
                                          Math.max(
                                            1,
                                            Math.min(
                                              5,
                                              parseInt(e.target.value) || 1
                                            )
                                          )
                                        )
                                      }
                                      className="w-16 text-center"
                                      min="1"
                                      max="5"
                                    />
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => handlePostCountChange(1)}
                                      disabled={postCount === 5}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Tổng tiền: {calculateTotalPrice()}
          </div>
          <Button size="lg" className="px-8" onClick={onSubmit}>
            Thanh Toán
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const PostPage = () => {
  const { id } = useParams();

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
                <div className="w-full flex justify-center items-center">
                  <PropertyPost id={id} />
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
