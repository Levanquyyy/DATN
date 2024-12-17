import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { Button } from '@/components/ui/button';

import {
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
} from 'react-icons/fa';
import { IoIosResize } from 'react-icons/io';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataProductByIdRent } from '@/routes/apiforRentHouse.jsx';

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:bg-background text-foreground ">
    <div className="text-indigo-500 mr-3">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const PropertyDetails = memo(({ id }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgsFromApi, setImgsFromApi] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgsFromApi.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imgsFromApi.length) % imgsFromApi.length
    );
  };

  const getConditionInteriorLabel = (value) => {
    switch (value) {
      case 1:
        return 'Nội thất cao cấp';
      case 2:
        return 'Đầy đủ';
      case 3:
        return 'Nhà trống';
      default:
        return 'Không xác định';
    }
  };

  const conditionInteriorValue = getConditionInteriorLabel(
    data?.condition_interior
  );

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDataProductByIdRent(id);
        setData(res.data);
        setImgsFromApi(res.data.images);
      } catch (error) {
        console.error('Error fetching product by id:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  if (!data) {
    return <div>Không có dữ liệu của sản phẩm!</div>; // Hiển thị nếu không có dữ liệu
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen dark:bg-background text-foreground">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-background text-foreground">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={imgsFromApi[currentImageIndex]}
            alt={`Marina Park ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
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
            {imgsFromApi.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-3xl font-bold text-white">{data.title}</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="text-3xl font-bold text-indigo-600">
              {data.cost} VND
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Thông tin chi tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailItem
                icon={<IoIosResize />}
                label="Diện tích"
                value={data?.land_area + ' m² '}
                className="dark:bg-background text-foreground"
              />
              <DetailItem
                icon={<FaExpand />}
                label="số tầng"
                value={data.floor}
              />
              <DetailItem
                icon={<FaExpand />}
                label="Mô hình nhà ở"
                value={data.cost_deposit ? 'Nhà cho thuê' : 'Nhà bán'}
              />
              <DetailItem
                icon={<FaExpand />}
                label="Diện tích đã sử dụng"
                value={data?.usable_area + ' m² '}
              />
              <DetailItem
                icon={<FaRulerHorizontal />}
                label="Chiều rộng mặt tiền"
                value={data?.horizontal + ' m² '}
              />
              <DetailItem
                icon={<FaRulerVertical />}
                label="Chiều dài mặt tiền"
                value={data?.length + ' m² '}
              />
              <DetailItem
                icon={<FaBed />}
                label="Số phòng ngủ"
                value={data?.bedroom_id}
              />
              <DetailItem
                icon={<FaBath />}
                label="Số phòng tắm"
                value={data?.bathroom_id}
              />
              <DetailItem
                icon={<FaCompass />}
                label="Số tầng"
                value={data?.main_door_id}
              />
              <DetailItem
                icon={<FaFileContract />}
                label="Bản hợp đồng hợp lệ"
                value={data?.legal_id}
              />
              <DetailItem
                icon={<FaCouch />}
                label="Tình trạng nội thất"
                value={conditionInteriorValue}
              />

              <DetailItem
                icon={<FaRegBuilding />}
                label="Phân khu/Lô"
                value={data.subdivision_code}
              />
              <DetailItem
                icon={<FaExpand />}
                label="Giá thuê"
                value={data?.cost_deposit + ' VND'}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 p-6">
          <Button variant="outline">Sửa tin</Button>
          <Button onClick={() => navigate(`/post/${data.id}`)}>Đăng tin</Button>
        </div>
      </div>
    </div>
  );
});

const ReviewPage = () => {
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
                  <PropertyDetails id={id} /> {/* Truyền id ở đây */}
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
