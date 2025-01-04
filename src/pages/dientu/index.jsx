import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';

import { FaUser, FaUserTie } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useState } from 'react';
import { LaptopMinimal, Smartphone } from 'lucide-react';

const DientuPage = () => {
  const [filterByVehicle, setFilterByVehicle] = useState({
    type: 'Tất cả',
  });
  const userTypes = ['Tất cả', 'Cá nhân', 'Môi giới'];

  const onChangeVehicleType = (type) => {
    setFilterByVehicle({ type });
    console.log({ type });
  };

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
          <header className="p-6 shadow-md">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold mb-6 ">Tìm kiếm đồ điện tử</h1>

              {/* Main filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Color filter */}
                <div className="relative">
                  <Popover>
                    <PopoverTrigger className="w-full h-9 text-left py-2 px-3 border rounded-md">
                      Danh mục
                    </PopoverTrigger>
                    <PopoverContent>
                      {/* Add color selection options here */}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Brand filter */}
                <div className="relative">
                  <Popover>
                    <PopoverTrigger className="w-full h-9 text-left py-2 px-3 border rounded-md">
                      Màu sắc
                    </PopoverTrigger>
                    <PopoverContent>
                      {/* Add brand selection options here */}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Manufacturing year filter */}
                <div className="relative">
                  <Popover>
                    <PopoverTrigger className="w-full h-9 text-left py-2 px-3 border rounded-md">
                      Năm sản xuất
                    </PopoverTrigger>
                    <PopoverContent>
                      {/* Add date-picker for manufacturing year here */}
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Price range filter (keep existing implementation) */}
              </div>

              {/* Vehicle types */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Loại hình nổi bật
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => onChangeVehicleType('phone')}
                  >
                    <Smartphone className="text-blue-500 mb-2" />
                    <h3 className="font-semibold">điện thoại</h3>
                  </div>
                  <div
                    className="p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => onChangeVehicleType('lap')}
                  >
                    <LaptopMinimal className="text-green-500 mb-2" />
                    <h3 className="font-semibold">Laptop</h3>
                  </div>
                </div>
              </div>

              {/* User types */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Loại người dùng</h2>
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    {userTypes.map((type, index) => (
                      <button
                        key={index}
                        className="flex items-center p-2 border rounded-md hover:dark:bg-white hover:dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-black hover:text-white"
                        onClick={() => onChageUserType(type)}
                      >
                        {index === 0 ? (
                          <FaUser className="mr-2" />
                        ) : (
                          <FaUserTie className="mr-2" />
                        )}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured listings */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Danh sách nổi bật
                </h2>
                {/*{filterByVehicle.type === 'Tất cả' && (*/}
                {/*  <>*/}
                {/*    {dataFromServer?.length === 0 ? (*/}
                {/*      <div className="text-center">No data found</div>*/}
                {/*    ) : (*/}
                {/*      <VehicleListings dataFromServer={dataFromServer} />*/}
                {/*    )}*/}
                {/*  </>*/}
                {/*)}*/}
              </div>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
};
export default DientuPage;
