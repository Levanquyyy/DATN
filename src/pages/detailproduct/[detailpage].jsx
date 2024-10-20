import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaMotorcycle,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaInfoCircle,
} from "react-icons/fa";

// page nha dat
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/lib/api-client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBed,
  FaRulerCombined,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useEffect, useState } from "react";
import MapIframe from "@/components/Map.jsx";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Cookies from "js-cookie";
const DetailPage = () => {
  // nha dat
  const navigate = useNavigate();

  const handleClick = () => {
    // Kiểm tra xem có access_token trong cookie không
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      // Nếu có token, hiển thị số liên lạc
      setShowContact(true);
      return true;
    } else {
      // Nếu không có, chuyển hướng về trang /auth
      navigate("/auth");
    }
  };
  useEffect(() => {
    // Giả lập việc tải dữ liệu
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [isNhaDat, setIsNhaDat] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [showFullImage, setShowFullImage] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [showDetailedDescription, setShowDetailedDescription] = useState(false);
  const rating = 0;
  const totalReviews = 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });
  function onSubmit(values) {
    const templateParams = {
      email_id: values.username,
      message: values.phone,
      from_name: values.email,
      market: "Nhà đất",
    };
    emailjs
      .send(
        "service_71t3k2h",
        "template_nj5zhvb",
        templateParams,
        "hlF3QHN-uRCXJzVgl"
      )
      .then(
        (response) => {
          toast.success("Email sent successfully");
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          toast.warning("Email not sent. Please try again later");
          console.log("FAILED...", error);
        }
      );
  }
  const toggleDetailedDescription = () => {
    setShowDetailedDescription((prev) => !prev);
  };

  const imagesForHouse = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b",
  ];

  const propertyDetails = {
    address:
      "Đường Man Thiện, Phường Hiệp Phú (Quận 9 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh",
    pricePerSqm: "45,000,000 VND",
    bedrooms: 3,
    floors: 4,
    legalStatus: "Full ownership",
    propertyType: "Townhouse",
    width: "5m",
    description:
      "A modern townhouse in a prime location with excellent amenities and convenient access to public transportation.",
    detailedDescription: `BÁN NHÀ C4 KHU CẢNH VỆ MAN THIỆN, TNP A, QUẬN 9, THỦ ĐỨC, 50M2, NHỈNH 4.X TỶ

      Mô tả chi tiết:
      - Vị trí: khu dân cư cảnh vệ, Tăng Nhơn Phú A, Quận 9, Thủ Đức, TP Hồ Chí Minh. Đường thông, trước nhà 4m. Tiện ích đầy đủ, khu dân cư sầm uất, thuận tiện di chuyển sang Lê Văn Việt, Võ Nguyên Giáp, Xa Lộ Hà Nội, Võ Văn Ngân, Hoàng Diệu, Lê Văn Chí, Lã Xuân Oai… Bệnh viện Lê Văn Việt, trường học Lê Văn Việt, THCS Khai Nguyên, Trần Quốc Toản, Đại học Makerting, Học viện Công nghệ, quán xá không thiếu thứ gì.
      - Kết cấu: Nhà 2 tầng, 1 PN, DT 50m2, đường thông, trước nhà 4m. Ngang 5m
      - Phù hợp: Mua ở và đầu tư.
      - Pháp lý: Pháp lý sạch, chuẩn chỉnh, công chứng nhanh gọn ngay trong ngày.
      - Liên hệ NGAY em Hậu để được tư vấn biết thêm thông tin Mua bán nhà đất, bất động sản tại Quận 2, Quận 9, Thủ Đức, Hồ Chí Minh.
      Em nhận ký gửi mua bán nhà đất TP Hồ Chí Minh, Thành Phố Thủ Đức nhanh gọn.
      
      Mua Bán Nhà Quận 9 Giá Rẻ Mới Nhất
      Mua bán nhà đất, bất động sản tại Quận 9, Hồ Chí Minh
      Mua Bán Nhà Đất Quận 9 (TP. Thủ Đức) Giá Tốt, Chất Lượng
      Mua bán nhà đất Hồ Chí Minh, Nhà đất Thủ Đức nhanh chóng
      
 `,
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price Trend (Million VND/sqm)",
        data: [43, 44, 45, 44.5, 45, 45.5],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const toggleFullImage = () => {
    setShowFullImage((prev) => !prev);
  };
  const calculateLoan = () => {
    // Kiểm tra xem có access_token trong cookie không
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      // Nếu có token, hiển thị số liên lạc
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const time = parseFloat(loanTenure) * 12;

      if (principal && rate && time) {
        const x = Math.pow(1 + rate, time);
        const monthly = (principal * x * rate) / (x - 1);
        setMonthlyPayment(monthly.toFixed(2));
      } else {
        setMonthlyPayment(null);
      }
    } else {
      // Nếu không có, chuyển hướng về trang /auth
      navigate("/auth");
    }
  };
  //xe

  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showWarranty, setShowWarranty] = useState(false);
  useEffect(() => {
    const nhaDat = searchParams.get("nhadat");
    console.log("nhaDat:", nhaDat); // Kiểm tra giá trị của query parameter
    if (nhaDat) {
      setIsNhaDat(true);
      console.log("nhaDat:", nhaDat); // Kiểm tra giá trị của query parameter
    } else {
      setIsNhaDat(false);
    }
    // console.log(123);
  }, [location.search]);
  const images = [
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1558980664-769d59546b3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const similarListings = [
    {
      image:
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Xe Click 2011 nguyên rin 1 đời chủ biển 43",
      price: "11,500,000 VND",
      type: "Special Sale",
      time: "3 weeks ago",
      location: "Quận Hải Châu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "Honda Click 2012 - Excellent Condition",
      price: "10,800,000 VND",
      type: "Regular Sale",
      time: "2 days ago",
      location: "Quận Sơn Trà",
    },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        {isNhaDat ? (
          <div className="max-w-7xl mx-auto p-6 b rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 ">Property Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative h-96 mb-4 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={imagesForHouse[activeImage]}
                    alt={`Full size property view ${activeImage + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={toggleFullImage}
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full"
                    aria-label="Previous image"
                  >
                    <FaArrowLeft className="" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full"
                    aria-label="Next image"
                  >
                    <FaArrowRight className="" />
                  </button>
                </div>

                <div className="flex space-x-2 mb-4 overflow-x-auto">
                  {imagesForHouse.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover cursor-pointer rounded ${
                        index === activeImage ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>

                <div className=" p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4 ">
                    Property Details
                  </h2>
                  <p className=" mb-2">Address: {propertyDetails.address}</p>
                  <p className=" mb-2">
                    Price per sqm: {propertyDetails.pricePerSqm}
                  </p>
                  <div className="flex items-center mb-2">
                    <FaBed className="mr-2 " />
                    <span className="">
                      {propertyDetails.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaBuilding className="mr-2 " />
                    <span className="">{propertyDetails.floors} Floors</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaFileAlt className="mr-2 " />
                    <span className="">
                      Legal Status: {propertyDetails.legalStatus}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaRulerCombined className="mr-2 " />
                    <span className="">Width: {propertyDetails.width}</span>
                  </div>
                  <p className=" mt-4">{propertyDetails.description}</p>
                  <button
                    onClick={toggleDetailedDescription}
                    className="mt-4 flex items-center   transition duration-300"
                  >
                    <FaInfoCircle className="mr-2" />
                    {showDetailedDescription
                      ? "Hide Detailed Description"
                      : "View Detailed Description"}
                  </button>
                  {showDetailedDescription && (
                    <div className="mt-4 p-4 dark:bg-gray-100 dark:text-black rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm ">
                        {propertyDetails.detailedDescription}
                      </pre>
                    </div>
                  )}

                  <div className=" p-4 flex items-center justify-between gap-3">
                    <Dialog>
                      <DialogTrigger>
                        <Button>Đăng ký vay mua nhà</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Bạn cần tư vấn thêm?</DialogTitle>
                          <DialogDescription>
                            Để lại thông tin để người đăng tin liên hệ với bạn
                            ngay.
                          </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                          >
                            <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Put your name"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Put your phone number"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Put your Email"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Submit</Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline">GỌI CHUYÊN GIA TƯ VẤN</Button>
                    {showContact ? (
                      <p className="mt-1 text-xl font-semibold ">
                        <FaPhone className="inline mr-2" />
                        0932685801
                      </p>
                    ) : (
                      <Button onClick={handleClick}>Show Contact Number</Button>
                    )}
                  </div>

                  <div className=" p-4 flex items-center justify-between gap-3">
                    <MapIframe address={propertyDetails.address} />
                  </div>
                </div>
              </div>

              <div>
                <div className=" p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold mb-4 ">Price Trend</h2>
                  <Line data={chartData} options={{ responsive: true }} />
                </div>
                {isLoading ? (
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ) : (
                  <div className=" p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 ">
                      Loan Calculator
                    </h2>
                    <div className="mb-4">
                      <label htmlFor="loanAmount" className="block  mb-2">
                        Loan Amount (VND)
                      </label>
                      <input
                        type="number"
                        id="loanAmount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full p-2 border rounded dark:text-black"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="interestRate" className="block  mb-2 ">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        id="interestRate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full p-2 border rounded dark:text-black"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="loanTenure" className="block  mb-2">
                        Loan Tenure (Years)
                      </label>
                      <input
                        type="number"
                        id="loanTenure"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                        className="w-full p-2 border rounded dark:text-black"
                      />
                    </div>
                    <Button onClick={calculateLoan} className="w-full">
                      Calculate
                    </Button>
                    {monthlyPayment && (
                      <p className="mt-4 text-lg font-semibold ">
                        Estimated Monthly Payment: {monthlyPayment} VND
                      </p>
                    )}
                  </div>
                )}

                {isLoading ? (
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ) : (
                  <div className=" p-6 rounded-lg shadow-md">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <strong className="block mb-4">
                                Bạn cần tư vấn thêm?
                              </strong>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Put your name" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Put your phone number"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Put your Email"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ) : (
                  <Carousel
                    opts={{ align: "start" }}
                    className="w-full max-w-screen-lg"
                  >
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-full lg:basis-full"
                        >
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
                              <div className="flex flex-col">
                                <div className="w-full">
                                  <img
                                    className="h-64 w-full object-cover"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="User profile"
                                  />
                                </div>
                                <div className="p-6">
                                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                    Cường Luxury
                                  </div>
                                  <p className="block mt-1 text-lg leading-tight font-medium text-black">
                                    Mua Bán Tốt
                                  </p>
                                  <div
                                    className="mt-2 flex items-center"
                                    aria-label={`Rating: ${rating} out of 5 stars`}
                                  >
                                    {renderStars(rating)}
                                    <span className="ml-2 text-sm text-gray-600">{`(${totalReviews})`}</span>
                                  </div>
                                  <p className="mt-2 text-gray-500">
                                    Chuyên mua bán - cho thuê - chuyển nhượng
                                    Vinhomes
                                  </p>
                                </div>
                              </div>

                              {showContact ? (
                                <p className="mt-1 text-xl font-semibold text-center p-3 ">
                                  <FaPhone className="inline mr-2" />
                                  0932685801
                                </p>
                              ) : (
                                <Button
                                  onClick={() => setShowContact(true)}
                                  className="w-full"
                                >
                                  Show Contact Number
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                )}
              </div>
            </div>

            <p className="mt-6  text-right">Updated {lastUpdate} seconds ago</p>

            {showFullImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={toggleFullImage}
              >
                <img
                  src={imagesForHouse[activeImage]}
                  alt={`Full size property view ${activeImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <div className="mt-8 p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Similar Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarListings.map((listing, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-md overflow-hidden border-gray-800"
                  >
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold ">
                        {listing.title}
                      </h3>
                      <p className="mt-2 text-xl font-bold ">{listing.price}</p>
                      <p className="mt-1 text-sm ">{listing.type}</p>
                      <p className="mt-1 text-sm ">
                        <FaClock className="inline mr-1" />
                        {listing.time}
                      </p>
                      <p className="mt-1 text-sm ">
                        <FaMapMarkerAlt className="inline mr-1" />
                        {listing.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div
              className="flex  rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3"></div>
            </div>
            <div className="min-h-screen bg-gradient-to-br p-8">
              <div className="max-w-6xl mx-auto  rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 w-full md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <img
                        className="w-full h-full object-cover"
                        src={images[activeImage]}
                        alt={`Product image ${activeImage + 1}`}
                      />
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        aria-label="Next image"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                    <div className="flex mt-4 space-x-2 overflow-x-auto p-2">
                      {images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-20 h-20 object-cover cursor-pointer rounded-md ${
                            index === activeImage ? "ring-2 ring-pink-500" : ""
                          }`}
                          onClick={() => setActiveImage(index)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-8 md:w-1/2">
                    <div className="uppercase tracking-wide text-sm  font-semibold">
                      Honda
                    </div>
                    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                      Clit
                    </h1>
                    <p className="mt-2 text-xl ">
                      Pink • 2013 • 30,000 km • Used
                    </p>
                    <p className="mt-4 text-4xl font-bold ">10,500,000 VND</p>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium ">Price Range</h2>
                      <p className="mt-1 text-sm ">
                        5,000,000 VND - 7,000,000 VND
                      </p>
                    </div>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium ">Location</h2>
                      <p className="mt-1 text-sm ">
                        <FaMapMarkerAlt className="inline mr-2" />
                        Phường Thạc Gián, Quận Thanh Khê, Đà Nẵng
                      </p>
                    </div>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium ">Post Details</h2>
                      <p className="mt-1 text-sm ">
                        <FaClock className="inline mr-2" />
                        Posted: 13 minutes ago
                      </p>
                      <p className="mt-2 text-sm ">
                        "Xe đẹp nguyên rin mua bán tại nhà áo đẹp lốp mới Chạy
                        nhẹ"
                      </p>
                    </div>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium ">
                        Contact Information
                      </h2>
                      {showContact ? (
                        <p className="mt-1 text-xl font-semibold ">
                          <FaPhone className="inline mr-2" />
                          0932685801
                        </p>
                      ) : (
                        <Button onClick={() => handleClick()}>
                          Show Contact Number
                        </Button>
                      )}
                    </div>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium ">Specifications</h2>
                      <ul className="mt-2 space-y-2 text-sm ">
                        <li>Brand: Honda</li>
                        <li>Model: Click</li>
                        <li>Registration Year: 2013</li>
                        <li>Mileage: 30,000 km</li>
                        <li>Weight: &gt; 50 kg</li>
                        <li>Type: Scooter</li>
                        <li>Origin: Not specified</li>
                      </ul>
                    </div>
                    <div className="mt-4 border-t  pt-4">
                      <h2 className="text-lg font-medium ">
                        Hiện mô tả chi tiết
                      </h2>
                      {showWarranty ? (
                        <p className="mt-1 text-sm ">Manufacturer's warranty</p>
                      ) : (
                        <button
                          onClick={() => setShowWarranty(true)}
                          className="mt-1 text-sm font-medium "
                        >
                          View More
                        </button>
                      )}
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h2 className="text-lg font-medium  ">
                        Utility Services Options
                      </h2>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-indigo-600 hover:bg-indigo-700">
                          <FaMotorcycle className="mr-2" /> Buy old motorcycles
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-green-600 hover:bg-green-700">
                          <FaClock className="mr-2" /> Fast selling within 2
                          hours
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-yellow-600 hover:bg-yellow-700">
                          <FaMoneyBillWave className="mr-2" /> Instant cash
                          payment
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  bg-purple-600 hover:bg-purple-700">
                          <FaExchangeAlt className="mr-2" /> Easy ownership
                          transfer support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold mb-4">Similar Listings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarListings.map((listing, index) => (
                      <div
                        key={index}
                        className="rounded-lg shadow-md overflow-hidden border-gray-800"
                      >
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold ">
                            {listing.title}
                          </h3>
                          <p className="mt-2 text-xl font-bold ">
                            {listing.price}
                          </p>
                          <p className="mt-1 text-sm ">{listing.type}</p>
                          <p className="mt-1 text-sm ">
                            <FaClock className="inline mr-1" />
                            {listing.time}
                          </p>
                          <p className="mt-1 text-sm ">
                            <FaMapMarkerAlt className="inline mr-1" />
                            {listing.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
export default DetailPage;
