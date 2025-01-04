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

import apiClient from '@/lib/api-client';
import { GET_DATA_POSTINGTYPE1 } from '@/utilities/constant';
import { getDecryptedCookie } from '@/store/cookies/cookies.js';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataProductByIdRent } from '@/routes/apiforRentHouse.jsx';
import { fetchUserInfo } from '@/routes/apiforUser.jsx';
import { postPayment, postPaymentForPaypal } from '@/routes/apiforpayment.jsx';

const PropertyPost = ({ id }) => {
  const navigate = useNavigate();
  const [postingType, setPostingType] = useState([]);

  const [selectedDays, setSelectedDays] = React.useState();

  const [isFirstOptionExpanded, setIsFirstOptionExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [postCount, setPostCount] = useState(1);
  const [saveindex, setSaveIndex] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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
          setSaveIndex(1);
          return [1];
        } else {
          return prev.filter((opt) => opt !== 1 && opt !== 3);
        }
      } else if (index === 1) {
        // Tin Vip
        if (checked) {
          setSaveIndex(4);
          return [2];
        } else {
          return prev.filter((opt) => opt !== 2 && opt !== 3);
        }
      } else if (index === 2) {
        // Load tin
        if (checked) {
          if (prev.includes(1)) {
            setSaveIndex(1);
            return [...new Set([...prev, 3])];
          } else if (prev.includes(2)) {
            setSaveIndex(4);
            return [...new Set([...prev, 3])];
          } else {
            // If neither Tin thường nor Tin Vip is selected, default to Tin thường
            setSaveIndex(1);
            return [1, 3];
          }
        } else {
          return prev.filter((opt) => opt !== 3);
        }
      }
      return prev;
    });

    setIsFirstOptionExpanded((prev) =>
      index === 0 || index === 1 ? checked : prev
    );
  };

  const createTransformedData = (userData, product_id, totalPrice) => {
    const transformSelectedDays = parseInt(selectedDays);

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
        type: 1,
      };
    } else {
      return;
    }
  };
  const transformDataForPaypal = (userData, product_id, totalPrice) => {
    const transformSelectedDays = parseInt(selectedDays);

    console.log(transformSelectedDays);
    if (userData && product_id && totalPrice) {
      return [
        {
          user_id: userData,
          product_id: product_id,
          type_posting_id: saveindex,
          load_key_post: postCount,
          price: totalPrice,
        },
      ];
    } else {
      return;
    }
  };
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    // console.log(`Selected payment method: ${method}`);

    toast.success(
      `Đã chọn phương thức thanh toán: ${method === 'vnpay' ? 'VNPay' : 'PayPal'}`
    );
  };

  const onSubmit = async () => {
    const getData = await getDataProductByIdRent(id);
    const getUser = await fetchUserInfo();

    let total = calculateTotalPrice();
    // Convert total to a number
    total = parseFloat(total.replace(/[^\d.-]/g, '')) * 1000;
    if (!getData || !getUser) {
      toast.error('Sản phẩm không hợp lệ! hoặc bạn chưa đăng nhập');
      return;
    }

    try {
      const transformedData = createTransformedData(
        getUser.id,
        getData.data.id,
        total
      );
      const transformedDataForPaypal = transformDataForPaypal(
        +getUser.id,
        getData.data.id,
        total
      );

      if (transformedData === undefined) {
        navigate('/myads');
      } else if (selectedPaymentMethod === 'vnpay') {
        transformedData.payment_method = selectedPaymentMethod;
        const paymentResponse = await postPayment(transformedData);
        if (paymentResponse.message === 'success') {
          window.open(paymentResponse.data, '_blank');
          toast.success(`Payment successful with ${selectedPaymentMethod}!`);
        }
      } else if (selectedPaymentMethod === 'paypal') {
        const paymentResponse = await postPaymentForPaypal(
          transformedDataForPaypal
        );
        if (paymentResponse.message === 'Thanh toán thành công') {
          window.open(paymentResponse.approval_link, '_blank');
          toast.success(`Payment successful with ${selectedPaymentMethod}!`);
          // console.log(123);
        }
        console.log('Paypal');
      }
    } catch (error) {
      toast.error(
        `Payment failed: ${error.response?.data?.message || error.message}`
      );
    }
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
                      {selectedOptions.includes(index + 1) && (
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
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="text-lg font-semibold">
            Tổng tiền: {calculateTotalPrice()}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <p className="font-medium">Chọn phương thức thanh toán:</p>
            <div className="flex space-x-4">
              <Button
                variant={
                  selectedPaymentMethod === 'vnpay' ? 'default' : 'outline'
                }
                onClick={() => handlePaymentMethodSelect('vnpay')}
                className="flex-1 h-20 flex flex-col items-center justify-center"
              >
                <img
                  src="/imgs/vnpay.png"
                  alt="VNPay logo"
                  className="h-10 w-20 object-contain mb-2"
                />
                <span>VNPay</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'paypal' ? 'default' : 'outline'
                }
                onClick={() => handlePaymentMethodSelect('paypal')}
                className="flex-1 h-20 flex flex-col items-center justify-center"
              >
                <img
                  src="/imgs/paypal.png"
                  alt="VNPay logo"
                  className="h-10 w-20 object-contain mb-2"
                />
                <span>PayPal</span>
              </Button>
            </div>
          </div>
          <Button
            size="lg"
            className="px-8 w-full"
            onClick={onSubmit}
            disabled={!selectedPaymentMethod}
          >
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
