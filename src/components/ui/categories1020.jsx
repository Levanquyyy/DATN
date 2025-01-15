import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Cookies from 'js-cookie';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// select city ward district

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { fetchUserInfo } from '@/routes/apiforUser.jsx';
import { getdataTypeOfHouse, postProduct } from '@/routes/apiforRentHouse.jsx';
import { fetchLocation } from '@/routes/apiforLocation.jsx';
import { toast } from 'sonner';

const FormSchema = z.object({
  nameofbuilding: z.string().min(1, 'Tên toà nhà là bắt buộc'),
  address: z.string().min(1, 'Địa chỉ là bắt buộc'),
  condition_interior: z.number().min(1, 'Tình trạng nội thất là bắt buộc'),
  typeofhouse: z.number().min(1, 'Loại hình nhà ở là bắt buộc'),
  bedroom_id: z.number().min(1, 'Số phòng ngủ là bắt buộc'),
  legal_id: z.number().min(1, 'Giấy tờ pháp lý là bắt buộc'),
  content: z.string().min(10, 'Mô tả chi tiết phải có ít nhất 10 ký tự'),
  province_code: z.string().min(1, 'Tỉnh thành là bắt buộc'),
  numberofstreet: z.string().min(1, 'Số nhà là bắt buộc'),
  positionBDS: z.string().min(1, 'Vị trí BĐS là bắt buộc'),
  block: z.string().optional(),
  floor: z.string().optional(),
  bathroom_id: z.number().min(1, 'Số phòng vệ sinh là bắt buộc'),
  viewbalcony: z.number().optional(),
  main_door_id: z.number().optional(),
  propertyofhouse: z.string().optional(),
  horizontal: z.string().optional(),
  length: z.string().optional(),
  usable_area: z.number().min(1, 'Diện tích sử dụng là bắt buộc'),
  cost: z.number().min(1, 'Giá bán là bắt buộc'),
  land_area: z.number().min(1, 'Diện tích đất là bắt buộc'),
  ward_code: z.string().min(1, 'Phường/Xã là bắt buộc'),
  district_code: z.string().min(1, 'Quận/Huyện là bắt buộc'),
  title: z.string().min(1, 'Tiêu đề tin đăng là bắt buộc'),
  car_alley: z.boolean(),
  back_house: z.boolean(),
  blooming_house: z.boolean(),
  not_completed_yet: z.boolean(),
  land_not_changed_yet: z.boolean(),
  planning_or_road: z.boolean(),
  diff_situation: z.boolean(),
});

const CategoryPage1020 = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameofbuilding: 'Wuys 1',
      address: '',
      condition_interior: '',
      typeofhouse: '',
      bedroom_id: '',
      legal_id: '',
      content: 'dsadasd',
      province_code: '',
      numberofstreet: '123165',
      positionBDS: '23/20',
      block: '5',
      floor: '6',
      bathroom_id: '',
      viewbalcony: '',
      main_door_id: '',
      propertyofhouse: '',
      horizontal: '',
      length: '',
      usable_area: 0,
      cost: 0,
      land_area: 0,
      ward_code: '',
      code: `${Math.random().toString(36).substr(2, 9)}`,
      type_product: 1,
      type_rental: 3,
      category_id: 1,
      images: '',
      video: '',
      cost_deposit: 0,
      car_alley: false,
      back_house: false,
      blooming_house: false,
      not_completed_yet: false,
      land_not_changed_yet: false,
      planning_or_road: false,
      diff_situation: false,
      approved: 2,
      district_code: '',
    },
  });
  const formForSale = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameofbuilding: 'Wuys 1',
      address: '',
      condition_interior: '',
      typeofhouse: '',
      bedroom_id: '',
      legal_id: '',
      content: 'dsadasd',
      province_code: '',
      numberofstreet: '123165',
      positionBDS: '23/20',
      block: '5',
      floor: '6',
      bathroom_id: '',
      viewbalcony: '',
      main_door_id: '',
      propertyofhouse: '',
      horizontal: '',
      length: '',
      usable_area: 0,
      cost: 0,
      land_area: 0,
      ward_code: '',
      code: `${Math.random().toString(36).substr(2, 9)}`,
      type_product: 0,
      type_rental: 3,
      category_id: 1,
      images: '',
      video: '',
      car_alley: false,
      back_house: false,
      blooming_house: false,
      not_completed_yet: false,
      land_not_changed_yet: false,
      planning_or_road: false,
      diff_situation: false,
      approved: 2,
      district_code: '',
    },
  });

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedprovince_code, setSelectedprovince_code] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [openprovince_code, setOpenprovince_code] = useState(false);
  const [opendistrict, setOpenDistrict] = useState(false);
  const [openward, setOpenWard] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDescribeDetail, setIsFocusDescribeDetail] = useState(false);

  // Add these state variables at the top with other useState declarations
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [typeOfHouse, setTypeOfHouse] = useState([]);
  const [bedRoom, setBedRoom] = useState([]);
  const [bathRoom, setBathRoom] = useState([]);
  const [viewBalcony, setViewBalcony] = useState([]);
  const [mainDoor, setMainDoor] = useState([]);
  const [legal, setLegal] = useState([]);
  const [interior, setInterior] = useState([]);

  useEffect(() => {
    const fetchDataTypeOfHouse = async () => {
      const res = await getdataTypeOfHouse('loai-hinh-nha-o');
      setTypeOfHouse(res);
    };
    const fetchDataBedRoom = async () => {
      const res = await getdataTypeOfHouse('so-phong-ngu');
      setBedRoom(res);
    };
    const fetchDataBathRoom = async () => {
      const res = await getdataTypeOfHouse('so-phong-ve-sinh');
      setBathRoom(res);
    };
    const fetchDataViewBalcony = async () => {
      const res = await getdataTypeOfHouse('huong-ban-cong');
      setViewBalcony(res);
    };
    const fetchDataMainDoor = async () => {
      const res = await getdataTypeOfHouse('huong-cua-chinh');
      setMainDoor(res);
    };
    const fetchDataLegal = async () => {
      const res = await getdataTypeOfHouse('giay-to-phap-ly');
      setLegal(res);
    };
    const fetchDatainterior = async () => {
      const res = await getdataTypeOfHouse('tinh-trang-noi-that');
      setInterior(res);
    };

    fetchDataTypeOfHouse();
    fetchDataBedRoom();
    fetchDataBathRoom();
    fetchDataViewBalcony();
    fetchDataMainDoor();
    fetchDataLegal();
    fetchDatainterior();
  }, []);
  const CurrencyInput = ({ form, name, placeholder }) => {
    const [numericValue, setNumericValue] = useState(null);
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      if (numericValue !== null) {
        form.setValue(name, numericValue);
      }
    }, [numericValue, form, name]);

    const handleInputChange = (e) => {
      const value = e.target.value;

      if (value === '') {
        setDisplayValue('');
        setNumericValue(null);
      } else {
        // Loại bỏ các ký tự không phải số
        const number = parseInt(value.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(number)) {
          setNumericValue(number);
          setDisplayValue(formatCurrency(number));
        }
      }
    };

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN').format(value);
    };

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{placeholder}</FormLabel>
            <FormControl>
              <Input
                type="text" // Sử dụng type="text" để có thể xử lý định dạng số mà không gây lỗi
                placeholder={placeholder}
                value={displayValue}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  const [errors, setErrors] = useState({
    province_code: null,
    district_code: null,
    ward: null,
  });

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if (!access_token) {
      navigate('/auth');
    }
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      const data = await fetchLocation('provinces', 1);
      setCities(data);
    };
    fetchCities();
  }, []);

  // Fetch districts when a city is selected
  useEffect(() => {
    if (selectedprovince_code) {
      const fetchDistricts = async () => {
        const data = await fetchLocation('districts', selectedprovince_code);
        console.log('districts', data);
        setDistricts(data);
        setSelectedDistrict(null); // Reset selected district when province_code changes
      };
      fetchDistricts();
    }
  }, [selectedprovince_code]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const data = await fetchLocation('wards', selectedDistrict);
        setWards(data);
        setSelectedWard(null); // Reset selected ward when district changes
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  // Update the handleFileChange function
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedImages(files); // Store the actual files instead of just names
  };

  // Update the handleVideoChange function
  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedVideo(files[0]); // Store the first video file
  };

  // Update the onSubmit function
  const onSubmit = async (data, isForRent = false) => {
    const userInfo = await fetchUserInfo();
    if (!userInfo) {
      console.error('Failed to fetch user info');
      return;
    }

    const user_id = userInfo.id;
    const transformedData = {
      ...data,
      car_alley: data.car_alley ? 1 : 0,
      back_house: data.back_house ? 1 : 0,
      blooming_house: data.blooming_house ? 1 : 0,
      not_completed_yet: data.not_completed_yet ? 1 : 0,
      land_not_changed_yet: data.land_not_changed_yet ? 1 : 0,
      planning_or_road: data.planning_or_road ? 1 : 0,
      diff_situation: data.diff_situation ? 1 : 0,
      user_id: user_id,
      type_product: isForRent ? 2 : 1,
      province_code: data.province_code,
      district_code: data.district_code,
      ward_code: data.ward_code,
      category_id: 1,
    };

    const formData = new FormData();
    Object.keys(transformedData).forEach((key) => {
      formData.append(key, transformedData[key]);
    });

    if (selectedImages && selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append('images[]', image);
      });
    }

    if (selectedVideo) {
      formData.append('file', selectedVideo);
    }

    try {
      const id = await postProduct(formData);
      navigate(`/preview/${id}`);
      if (id) {
        toast.success('Đăng tin thành công');
      } else {
        toast.error('Đăng tin thất bại');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleRentSubmit = async (data) => {
    await onSubmit(data, true);
  };
  const handleSaleSubmit = async (data) => {
    await onSubmit(data, false);
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

          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <div className="font-[sans-serif] max-w-md ">
                <label className="text-base text-gray-500 font-semibold mb-2 block">
                  ĐĂNG TỪ 03 ĐẾN 12 HÌNH
                </label>
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="font-[sans-serif] max-w-md ">
                <Label htmlFor="video">Video</Label>
                <Input
                  id="videos"
                  type="file"
                  accept="video/*,.mkv,.avi,.mov,.mp4,.webm"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
            <div className="flex-1">
              <Tabs
                defaultValue="rent"
                className="w-[400px] sm:w-full flex flex-col  gap-3"
              >
                <TabsList>
                  <TabsTrigger value="sale">Cần bán</TabsTrigger>
                  <TabsTrigger value="rent">Cho thuê</TabsTrigger>
                </TabsList>

                {/*  for sale*/}
                <Form {...formForSale}>
                  <form
                    onSubmit={formForSale.handleSubmit((data) =>
                      handleSaleSubmit(data)
                    )}
                    className="space-y-8"
                  >
                    <TabsContent value="sale">
                      <FormField
                        control={formForSale.control}
                        name="nameofbuilding"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ BĐS và Hình ảnh</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên toà nhà" {...field} />
                            </FormControl>
                            <FormDescription>
                              Không tìm thấy dự án cần đăng tin?
                              <Link to="/" className="text-blue-600">
                                Yêu cầu thêm dự án
                              </Link>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormLabel>Địa chỉ </FormLabel>
                      <FormField
                        control={formForSale.control}
                        name="province_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={openprovince_code}
                                  onOpenChange={setOpenprovince_code}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openprovince_code}
                                      className="w-full justify-between"
                                    >
                                      {selectedprovince_code
                                        ? cities.find(
                                            (city) =>
                                              city.code ===
                                              selectedprovince_code
                                          )?.full_name
                                        : 'Chọn tỉnh thành'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search city..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No city found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {cities.map((city) => (
                                            <CommandItem
                                              key={city.Id}
                                              value={city.code} // Gửi mã code khi chọn
                                              onSelect={(currentValue) => {
                                                setSelectedprovince_code(
                                                  currentValue ===
                                                    selectedprovince_code
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenprovince_code(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {city.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của thành phố */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedprovince_code ===
                                                    city.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {formForSale.formState.errors.province_code && (
                                  <p className="text-red-600">
                                    {
                                      formForSale.formState.errors.province_code
                                        .message
                                    }
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="district_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={opendistrict}
                                  onOpenChange={setOpenDistrict}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={opendistrict}
                                      className="w-full justify-between"
                                      disabled={!selectedprovince_code}
                                    >
                                      {selectedDistrict
                                        ? districts.find(
                                            (district) =>
                                              district.code === selectedDistrict
                                          )?.full_name
                                        : 'Chọn quận'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search district..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No district found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {districts.map((district) => (
                                            <CommandItem
                                              key={district.Id}
                                              value={district.code} // Set value to district code
                                              onSelect={(currentValue) => {
                                                setSelectedDistrict(
                                                  currentValue ===
                                                    selectedDistrict
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenDistrict(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {district.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của quận */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedDistrict ===
                                                    district.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.district && (
                                  <p className="text-red-600">
                                    {form.formState.errors.district.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="ward_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={openward}
                                  onOpenChange={setOpenWard}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openward}
                                      className="w-full justify-between"
                                      disabled={!selectedDistrict}
                                    >
                                      {selectedWard
                                        ? wards.find(
                                            (ward) => ward.code === selectedWard
                                          )?.full_name
                                        : 'Chọn huyện'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search ward..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No ward found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {wards.map((ward) => (
                                            <CommandItem
                                              key={ward.Id}
                                              value={ward.code} // Set value to ward code
                                              onSelect={(currentValue) => {
                                                setSelectedWard(
                                                  currentValue === selectedWard
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenWard(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {ward.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của huyện */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedWard === ward.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.ward && (
                                  <p className="text-red-600">
                                    {form.formState.errors.ward.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Địa chỉ" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="numberofstreet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số nhà</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Số nhà" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="positionBDS"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vị trí BĐS</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Mã căn" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="block"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Block/Tháp</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="typeofhouse"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Loại hình nhà ở:</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? typeOfHouse.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Loại hình căn hộ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Loại hình nhà ở:</SelectLabel>
                                  {typeOfHouse.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.typeofhouse && (
                              <p className="text-red-600">
                                {
                                  formForSale.formState.errors.typeofhouse
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="bedroom_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng ngủ: </FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? bedRoom.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Số phòng ngủ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng ngủ</SelectLabel>
                                  {bedRoom.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.bedroom_id && (
                              <p className="text-red-600">
                                {
                                  formForSale.formState.errors.bedroom_id
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        control={formForSale.control}
                        name="bathroom_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng vệ sinh</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? bathRoom.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Số phòng vệ sinh'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng vệ sinh</SelectLabel>
                                  {bathRoom.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.bathroom_id && (
                              <p className="text-red-600">
                                {
                                  formForSale.formState.errors.bathroom_id
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="viewbalcony"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng ban công</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? viewBalcony.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Hướng ban công:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng ban công:</SelectLabel>
                                  {viewBalcony.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.viewbalcony && (
                              <p className="text-red-600">
                                {
                                  formForSale.formState.errors.viewbalcony
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="main_door_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng cửa chính</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? mainDoor.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Hướng cửa chính:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
                                  {mainDoor.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.main_door_id && (
                              <p className="text-red-600">
                                {
                                  formForSale.formState.errors.main_door_id
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhập Số tầng</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Số tầng" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* diện tích */}
                      <FormField
                        control={formForSale.control}
                        name="land_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích & giá</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Diện tích "
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="usable_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích sử dụng</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Diện tích "
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="horizontal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chiều ngang</FormLabel>

                            <FormControl>
                              <Input placeholder="Chiều ngang " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <CurrencyInput
                        form={formForSale}
                        name="cost"
                        placeholder="Giá bán"
                      />

                      <FormField
                        control={formForSale.control}
                        name="legal_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? legal.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Giấy tờ pháp lý'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  {legal.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formForSale.formState.errors.legal_id && (
                              <p className="text-red-600">
                                {formForSale.formState.errors.legal_id.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="condition_interior"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Nội thất</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? interior.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Nội thất'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Nội thất</SelectLabel>
                                  {interior.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <FormField
                          control={formForSale.control}
                          name="car_alley"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Hẻm xe hơi</FormLabel>

                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="back_house"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà tóp hậu</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="blooming_house"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà nở hậu</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="not_completed_yet"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà chưa hoàn công</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="land_not_changed_yet"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Đất chưa chuyển thổ</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="planning_or_road"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>
                                  Nhà dính quy hoạch / lộ giới
                                </FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formForSale.control}
                          name="diff_situation"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Hiện trạng khác</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={formForSale.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Tiêu đề tin đăng và Mô tả chi tiết
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Tiêu đề tin đăng "
                                {...field}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                              />
                            </FormControl>

                            <FormDescription>
                              {isFocus && (
                                <h1 className="text-base">
                                  {' '}
                                  Nếu bạn cung cấp thêm một số thông tin chi
                                  tiết như:Phong cách thiết kế: Hiện đại, cổ
                                  điển, tối giản,...Màu sắc chủ đạo: Trắng,
                                  xanh, nâu,..Vị trí nổi bật: Gần công viên,
                                  view sông,...Đặc điểm nổi bật: Ban công rộng,
                                  bếp hiện đại,...
                                </h1>
                              )}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForSale.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả chi tiết1</FormLabel>

                            <FormControl>
                              <Textarea
                                placeholder="Tiêu đề tin đăng"
                                {...field}
                                onFocus={() => setIsFocusDescribeDetail(true)}
                                onBlur={() => setIsFocusDescribeDetail(false)}
                              />
                            </FormControl>
                            <FormDescription>
                              {isFocusDescribeDetail && (
                                <h1 className="text-base">
                                  {' '}
                                  Nên có: Loại căn hộ chung cư, vị trí, tiện
                                  ích, diện tích, số phòng, thông tin pháp lý,
                                  tình trạng nội thất, v.v. Ví dụ: Tọa lạc tại
                                  đường Số 2 Đ. N4, Căn hộ Duplex Celadon City
                                  Q. Tân Phú 68m2 2PN, 1WC. Tiện ích đầy đủ
                                </h1>
                              )}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* fix */}

                      <div className="flex gap-3 mt-3">
                        <Button variant="outline">Xem trước</Button>
                        <Button type="submit">Đăng tin</Button>
                      </div>
                    </TabsContent>
                  </form>
                </Form>

                {/* check rent */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleRentSubmit)}
                    className="space-y-8"
                  >
                    <TabsContent value="rent">
                      <FormField
                        control={form.control}
                        name="nameofbuilding"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ BĐS và Hình ảnh</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên toà nhà" {...field} />
                            </FormControl>
                            <FormDescription>
                              Không tìm thấy dự án cần đăng tin?
                              <Link to="/" className="text-blue-600">
                                Yêu cầu thêm dự án
                              </Link>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormLabel>Địa chỉ </FormLabel>
                      <FormField
                        control={form.control}
                        name="province_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={openprovince_code}
                                  onOpenChange={setOpenprovince_code}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openprovince_code}
                                      className="w-full justify-between"
                                    >
                                      {selectedprovince_code
                                        ? cities.find(
                                            (city) =>
                                              city.code ===
                                              selectedprovince_code
                                          )?.full_name
                                        : 'Chọn tỉnh thành'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search city..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No city found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {cities.map((city) => (
                                            <CommandItem
                                              key={city.Id}
                                              value={city.code} // Gửi mã code khi chọn
                                              onSelect={(currentValue) => {
                                                setSelectedprovince_code(
                                                  currentValue ===
                                                    selectedprovince_code
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenprovince_code(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {city.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của thành phố */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedprovince_code ===
                                                    city.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.province_code && (
                                  <p className="text-red-600">
                                    {
                                      form.formState.errors.province_code
                                        .message
                                    }
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="district_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={opendistrict}
                                  onOpenChange={setOpenDistrict}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={opendistrict}
                                      className="w-full justify-between"
                                      disabled={!selectedprovince_code}
                                    >
                                      {selectedDistrict
                                        ? districts.find(
                                            (district) =>
                                              district.code === selectedDistrict
                                          )?.full_name
                                        : 'Chọn quận'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search district..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No district found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {districts.map((district) => (
                                            <CommandItem
                                              key={district.Id}
                                              value={district.code} // Set value to district code
                                              onSelect={(currentValue) => {
                                                setSelectedDistrict(
                                                  currentValue ===
                                                    selectedDistrict
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenDistrict(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {district.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của quận */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedDistrict ===
                                                    district.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.district && (
                                  <p className="text-red-600">
                                    {form.formState.errors.district.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ward_code"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={openward}
                                  onOpenChange={setOpenWard}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openward}
                                      className="w-full justify-between"
                                      disabled={!selectedDistrict}
                                    >
                                      {selectedWard
                                        ? wards.find(
                                            (ward) => ward.code === selectedWard
                                          )?.full_name
                                        : 'Chọn huyện'}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search ward..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          No ward found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {wards.map((ward) => (
                                            <CommandItem
                                              key={ward.Id}
                                              value={ward.code} // Set value to ward code
                                              onSelect={(currentValue) => {
                                                setSelectedWard(
                                                  currentValue === selectedWard
                                                    ? null
                                                    : currentValue
                                                ); // Lưu mã code
                                                setOpenWard(false);
                                                field.onChange(currentValue); // Cập nhật giá trị mã code
                                              }}
                                            >
                                              {ward.full_name}{' '}
                                              {/* Hiển thị tên đầy đủ của huyện */}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedWard === ward.code
                                                    ? 'opacity-100'
                                                    : 'opacity-0' // So sánh với mã code
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.ward && (
                                  <p className="text-red-600">
                                    {form.formState.errors.ward.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Địa chỉ" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="numberofstreet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số nhà</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Số nhà" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="positionBDS"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vị trí BĐS</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Mã căn" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="block"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Block/Tháp</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="typeofhouse"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Loại hình nhà ở:</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? typeOfHouse.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Loại hình căn hộ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Loại hình nhà ở:</SelectLabel>
                                  {typeOfHouse.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.typeofhouse && (
                              <p className="text-red-600">
                                {form.formState.errors.typeofhouse.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bedroom_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng ngủ: </FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? bedRoom.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Số phòng ngủ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng ngủ</SelectLabel>
                                  {bedRoom.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.bedroom_id && (
                              <p className="text-red-600">
                                {form.formState.errors.bedroom_id.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bathroom_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng vệ sinh</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? bathRoom.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Số phòng vệ sinh'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng vệ sinh</SelectLabel>
                                  {bathRoom.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.bathroom_id && (
                              <p className="text-red-600">
                                {form.formState.errors.bathroom_id.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="viewbalcony"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng ban công</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? viewBalcony.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Hướng ban công:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng ban công:</SelectLabel>
                                  {viewBalcony.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.viewbalcony && (
                              <p className="text-red-600">
                                {form.formState.errors.viewbalcony.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="main_door_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng cửa chính</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? mainDoor.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Hướng cửa chính:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
                                  {mainDoor.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.main_door_id && (
                              <p className="text-red-600">
                                {form.formState.errors.main_door_id.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhập Số tầng</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập Số tầng" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* diện tích */}
                      <FormField
                        control={form.control}
                        name="land_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích & giá</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Diện tích "
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="usable_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích sử dụng</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Diện tích "
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="horizontal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chiều ngang</FormLabel>

                            <FormControl>
                              <Input placeholder="Chiều ngang " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chiều dài</FormLabel>

                            <FormControl>
                              <Input placeholder="Chiều dài " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CurrencyInput
                        form={form}
                        name="cost"
                        placeholder="Giá thuê"
                      />

                      <CurrencyInput
                        form={form}
                        name="cost_deposit"
                        placeholder="Số tiền cọc"
                      />

                      <FormField
                        control={form.control}
                        name="legal_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? legal.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Giấy tờ pháp lý'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  {legal.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.legal_id && (
                              <p className="text-red-600">
                                {form.formState.errors.legal_id.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="condition_interior"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Nội thất</FormLabel>
                            <Select
                              value={
                                field.value ? field.value.toString() : undefined
                              }
                              onValueChange={(value) =>
                                field.onChange(parseInt(value, 10))
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value
                                    ? interior.find(
                                        (type) => type.id === field.value
                                      )?.name
                                    : 'Nội thất'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Nội thất</SelectLabel>
                                  {interior.map((type) => (
                                    <SelectItem
                                      key={type.id}
                                      value={type.id.toString()}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="car_alley"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Hẻm xe hơi</FormLabel>

                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="back_house"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà tóp hậu</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="blooming_house"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà nở hậu</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="not_completed_yet"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Nhà chưa hoàn công</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="land_not_changed_yet"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Đất chưa chuyển thổ</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="planning_or_road"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>
                                  Nhà dính quy hoạch / lộ giới
                                </FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="diff_situation"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex gap-3 p-1 h-12 items-center">
                                <FormLabel>Hiện trạng khác</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Tiêu đề tin đăng và Mô tả chi tiết
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Tiêu đề tin đăng "
                                {...field}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                              />
                            </FormControl>

                            <FormDescription>
                              {isFocus && (
                                <h1 className="text-base">
                                  {' '}
                                  Nếu bạn cung cấp thêm một số thông tin chi
                                  tiết như:Phong cách thiết kế: Hiện đại, cổ
                                  điển, tối giản,...Màu sắc chủ đạo: Trắng,
                                  xanh, nâu,..Vị trí nổi bật: Gần công viên,
                                  view sông,...Đặc điểm nổi bật: Ban công rộng,
                                  bếp hiện đại,...
                                </h1>
                              )}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả chi tiết1</FormLabel>

                            <FormControl>
                              <Textarea
                                placeholder="Tiêu đề tin đăng"
                                {...field}
                                onFocus={() => setIsFocusDescribeDetail(true)}
                                onBlur={() => setIsFocusDescribeDetail(false)}
                              />
                            </FormControl>
                            <FormDescription>
                              {isFocusDescribeDetail && (
                                <h1 className="text-base">
                                  {' '}
                                  Nên có: Loại căn hộ chung cư, vị trí, tiện
                                  ích, diện tích, số phòng, thông tin pháp lý,
                                  tình trạng nội thất, v.v. Ví dụ: Tọa lạc tại
                                  đường Số 2 Đ. N4, Căn hộ Duplex Celadon City
                                  Q. Tân Phú 68m2 2PN, 1WC. Tiện ích đầy đủ
                                </h1>
                              )}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* fix */}

                      <div className="flex gap-3 mt-3">
                        <Button variant="outline">Xem trước</Button>
                        <Button type="submit">Đăng tin</Button>
                      </div>
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage1020;
