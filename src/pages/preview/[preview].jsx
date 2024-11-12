import { useAppStore } from "@/store";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaCompass,
  FaFileContract,
  FaCouch,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaRegBuilding,
  FaRulerHorizontal,
  FaRulerVertical,
  FaRegObjectGroup,
} from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:bg-background text-foreground ">
    <div className="text-indigo-500 mr-3">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);
const PropertyDetails = ({
  data,
  images,
  currentImageIndex,
  prevImage,
  nextImage,
  forsale,
  page1020,
  page1060,
  page1070,
  page1080,
  page1090,
  page1100,
  page1110,
}) => {
  const navigate = useNavigate();
  let content;
  const propertyKeys = [
    { key: "car_alley", label: "Hẻm xe hơi" },
    { key: "back_house", label: "Nhà tóp hậu" },
    { key: "blooming_house", label: "Nhà nở hậu" },
    { key: "not_completed_yet", label: "Nhà chưa hoàn công" },
    { key: "land_not_changed_yet", label: "Đất chưa chuyển thổ" },
    { key: "planning_or_road", label: "Nhà dính quy hoạch / lộ giới" },
    { key: "diff_situation", label: "Hiện trạng khác" },
  ];
  const getPropertyLabels = (propertyObject) => {
    return propertyKeys
      .filter(({ key }) => propertyObject[key])
      .map(({ label }) => label)
      .join(", ");
  };
  const getConditionInteriorLabel = (value) => {
    switch (value) {
      case "1":
        return "Nội thất cao cấp";
      case "2":
        return "Đầy đủ";
      case "3":
        return "Nhà trống";
      default:
        return "Không xác định";
    }
  };
  const conditionInteriorValue = getConditionInteriorLabel(
    forsale ? data.funiture : data?.condition_interior
  );

  const propertyValue = getPropertyLabels(data);
  if (page1060) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<IoIosResize />}
              label="Tình trạng"
              value={data.status}
              className="dark:bg-background text-foreground"
            />
            <DetailItem icon={<FaExpand />} label="Hãng" value={data.brand} />
            <DetailItem
              icon={<FaExpand />}
              label="Dòng máy"
              value={"dang hard code dong may"}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Màu sắc"
              value={data.color}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Dung lượng"
              value={data.memory}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Xuất xứ"
              value={data.from}
            />
          </div>
        </div>
      </div>
    );
  } else if (page1020) {
    console.log(forsale);
    console.log(data);
    console.log(page1020);

    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {forsale ? data.price : data?.cost} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.province_code},{data?.ward_code}
              {data.numberofstreet}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{forsale ? data.title : data?.title}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<IoIosResize />}
              label="Diện tích"
              value={forsale ? data.acreage : data?.land_area + " m² "}
              className="dark:bg-background text-foreground"
            />
            {!forsale ? (
              <DetailItem
                icon={<FaExpand />}
                label="Giá thuê"
                value={data.cost + " VND"}
              />
            ) : (
              ""
            )}

            <DetailItem
              icon={<FaExpand />}
              label="số tầng"
              value={forsale ? data.numberoffloor : data?.floor}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Mô hình nhà ở"
              value={
                forsale
                  ? data.typeofhouse
                  : data?.type_product === 1
                  ? "Nhà ở"
                  : "nhà trọ"
              }
            />
            <DetailItem
              icon={<FaExpand />}
              label="Diện tích đã sử dụng"
              value={forsale ? data.acreaged : data?.usable_area + " m² "}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Chiều rộng mặt tiền"
              value={forsale ? data.horizontal : data?.horizontal + " m² "}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Chiều dài mặt tiền"
              value={forsale ? data.vertical : data?.length + " m² "}
            />
            <DetailItem
              icon={<FaRegObjectGroup />}
              label="Đặc điểm phân khu"
              value={propertyValue}
            />
            <DetailItem
              icon={<FaBed />}
              label="Bedrooms"
              value={forsale ? data.numberofbedroom : data?.bedroom_id}
            />
            <DetailItem
              icon={<FaBath />}
              label="Bathrooms"
              value={forsale ? data.numberofbath : data?.bathroom_id}
            />

            <DetailItem
              icon={<FaCompass />}
              label="Main Door Direction"
              value={forsale ? data.viewmaindoor : data?.main_door_id}
            />
            <DetailItem
              icon={<FaFileContract />}
              label="Legal Documents"
              value={forsale ? data.liescene : data?.legal_id}
            />
            <DetailItem
              icon={<FaCouch />}
              label="Furnishing Status"
              value={conditionInteriorValue}
            />
            <DetailItem icon={<FaExpand />} label="Size" value="42 m²" />
            <DetailItem
              icon={<FaRegBuilding />}
              label="Phân khu/Lô"
              value={forsale ? data.sperate : data.subdivision_code}
            />
            {!forsale ? (
              <DetailItem
                icon={<FaExpand />}
                label="Giá thuê"
                value={data?.cost_deposit + " VND"}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else if (page1070) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<IoIosResize />}
              label="Tình trạng"
              value={data.status}
              className="dark:bg-background text-foreground"
            />
            <DetailItem icon={<FaExpand />} label="Hãng" value={data.brand} />
            <DetailItem
              icon={<FaExpand />}
              label="Dòng máy"
              value={"dang hard code dong may"}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Màu sắc"
              value={data.color}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Dung lượng"
              value={data.memory}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Xuất xứ"
              value={data.from}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Kích thước màn hình"
              value={data.sizescreen}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Hỗ trợ 3G | 4G"
              value={data.use3G}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Version"
              value={data.version}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Saleman"
              value={data.typeperson}
            />
          </div>
        </div>
      </div>
    );
  } else if (page1080) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<IoIosResize />}
              label="Brand"
              value={data.brand}
              className="dark:bg-background text-foreground"
            />
            <DetailItem icon={<FaExpand />} label="Hãng" value={data.brand} />
            <DetailItem
              icon={<FaExpand />}
              label="graphic_card"
              value={data.graphic_card}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Ổ cứng"
              value={data.hard_drive}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Vi xử lý"
              value={data.microprocessor}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Ram"
              value={data.ram}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Kích thước màn hình"
              value={data.sizescreen}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Tình trạng"
              value={data.status}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Loại ổ cứng"
              value={data.type_of_hard_drive}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
          </div>
        </div>
      </div>
    );
  } else if (page1090) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<FaExpand />}
              label="graphic_card"
              value={data.graphic_card}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Ổ cứng"
              value={data.hard_drive}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Vi xử lý"
              value={data.microprocessor}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Ram"
              value={data.ram}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Kích thước màn hình"
              value={data.sizescreen}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Tình trạng"
              value={data.status}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Loại ổ cứng"
              value={data.type_of_hard_drive}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
          </div>
        </div>
      </div>
    );
  } else if (page1100) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<FaRulerVertical />}
              label="Tình trạng"
              value={data.status}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Thiết bị"
              value={data.machines}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Hãng thiết bị"
              value={data.brandofmachine}
            />

            <DetailItem
              icon={<FaRulerVertical />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
          </div>
        </div>
      </div>
    );
  } else if (page1110) {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {data.price} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{data.describedetail}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<FaRulerVertical />}
              label="Tình trạng"
              value={data.status}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Thiết bị"
              value={data.machines}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Hãng thiết bị"
              value={data.brandofmachine}
            />

            <DetailItem
              icon={<FaRulerVertical />}
              label="Chính sách bảo hành"
              value={data.warranty_policy}
            />
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-3xl font-bold text-indigo-600">
            {forsale ? data.price : data?.priceforrent} VND
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data?.city},{data?.district},{data?.ward}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">
            {forsale ? data.describedetail : data?.describedetailforrent}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
              icon={<IoIosResize />}
              label="Diện tích"
              value={forsale ? data.acreage : data?.acreageforrent}
              className="dark:bg-background text-foreground"
            />
            <DetailItem
              icon={<FaExpand />}
              label="Block/Tháp"
              value={forsale ? data.block : data?.blockforrent}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Floor Number"
              value={forsale ? data.numberoffloor : data?.numberoffloorforrent}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Apartment Type"
              value={forsale ? data.typeofhouse : data?.typeofhouseforrent}
            />
            <DetailItem
              icon={<FaExpand />}
              label="Diện tích đã sử dụng"
              value={forsale ? data.acreaged : data?.acreagedforrent}
            />
            <DetailItem
              icon={<FaRulerHorizontal />}
              label="Chiều rộng mặt tiền"
              value={forsale ? data.horizontal : data?.horizontalforrent}
            />
            <DetailItem
              icon={<FaRulerVertical />}
              label="Chiều dài mặt tiền"
              value={forsale ? data.vertical : data?.verticalforrent}
            />
            <DetailItem
              icon={<FaRegObjectGroup />}
              label="Đặc điểm phân khu"
              value={
                forsale ? data.propertyofhouse : data?.propertyofhouseforrent
              }
            />
            <DetailItem
              icon={<FaBed />}
              label="Bedrooms"
              value={
                forsale ? data.numberofbedroom : data?.numberofbedroomforrent
              }
            />
            <DetailItem
              icon={<FaBath />}
              label="Bathrooms"
              value={forsale ? data.numberofbath : data?.numberofbathforrent}
            />
            <DetailItem
              icon={<FaCompass />}
              label="Balcony Direction"
              value={forsale ? data.viewbalcony : data?.viewbalconyforrent}
            />
            <DetailItem
              icon={<FaCompass />}
              label="Main Door Direction"
              value={forsale ? data.viewmaindoor : data?.viewmaindoorforrent}
            />
            <DetailItem
              icon={<FaFileContract />}
              label="Legal Documents"
              value={forsale ? data.liescene : data?.liesceneforrent}
            />
            <DetailItem
              icon={<FaCouch />}
              label="Furnishing Status"
              value={forsale ? data.funiture : data?.funitureforrent}
            />
            <DetailItem icon={<FaExpand />} label="Size" value="42 m²" />

            {!forsale ? (
              <DetailItem
                icon={<FaExpand />}
                label="Giá thuê"
                value={data?.priceforrent}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen dark:bg-background text-foreground">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-background text-foreground">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={images[currentImageIndex]}
            alt={`Marina Park ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-3xl font-bold text-white">
              {page1060 || page1070 ? data.title : data?.nameofbuilding}
            </h1>
          </div>
        </div>

        {content}

        <div className="flex justify-end items-center gap-3 p-6">
          <Button variant="outline">Sửa tin</Button>
          <Button onClick={() => navigate("/post")}>Đăng tin</Button>
        </div>
      </div>
    </div>
  );
};

const ReviewPage = () => {
  const data = useAppStore((state) => state.data);
  const imageNames = useAppStore((state) => state.imageNames);
  const video = useAppStore((state) => state.video);
  const forsale = useAppStore((state) => state.forsale);
  const page1060 = useAppStore((state) => state.page1060);
  const page1020 = useAppStore((state) => state.page1020);
  const page1070 = useAppStore((state) => state.page1070);
  const page1080 = useAppStore((state) => state.page1080);
  const page1090 = useAppStore((state) => state.page1090);
  const page1100 = useAppStore((state) => state.page1100);
  const page1110 = useAppStore((state) => state.page1110);
  const [currentData, setCurrentData] = useState(data);

  const images = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
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
                  <PropertyDetails
                    data={currentData}
                    images={images}
                    currentImageIndex={currentImageIndex}
                    prevImage={prevImage}
                    nextImage={nextImage}
                    forsale={forsale}
                    page1020={page1020}
                    page1060={page1060}
                    page1070={page1070}
                    page1080={page1080}
                    page1090={page1090}
                    page1100={page1100}
                    page1110={page1110}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewPage;
