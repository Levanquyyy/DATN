import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";

import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaMotorcycle,
  FaCar,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaUser,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";
const DetailPage = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("category"));
  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showWarranty, setShowWarranty] = useState(false);

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
                      <Button onClick={() => setShowContact(true)}>
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
                    <h2 className="text-lg font-medium ">Warranty Policy</h2>
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
                        <FaClock className="mr-2" /> Fast selling within 2 hours
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
      </div>
    </div>
  );
};
export default DetailPage;
