import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Cookies from 'js-cookie';
import apiClient from '@/lib/api-client';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { useAppStore } from '@/store';
import { setEncryptedCookie } from '@/store/cookies/cookies.js';
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

const FormSchema = z.object({
  nameofbuilding: z.string().min(2, {
    message: 'Vui lòng nhập tên tòa nhà',
  }),
  condition_interior: z.string().min(1, {
    message: 'Vui lòng nhập nội thất',
  }),
  namedistrict: z.string().min(2, {
    message: 'Vui lòng nhâp tên đường',
  }),

  legal_id: z.string().min(1, {
    message: 'Vui lòng chọn giấy tờ pháp lý',
  }),

  city: z.string().min(1, {
    message: 'Vui lòng chọn tỉnh thành',
  }),

  typeofhouse: z.string().min(1, {
    message: 'Vui lòng chọn loại hình căn hộ',
  }),
  bedroom_id: z.string().min(1, {
    message: 'Vui lòng chọn số phòng ngủ',
  }),

  // fix

  content: z.string().min(2, {
    message: 'Vui lòng nhập mô tả chi tiết',
  }),
  title: z.string().min(1, {
    message: 'Vui lòng nhập tiêu đề',
  }),

  province_code: z.string().min(1, {
    message: 'Vui lòng chọn quận',
  }),
  land_area: z.number().min(1, {
    message: 'Vui lòng nhập diện tích đất',
  }),
  usable_area: z.number().min(1, {
    message: 'Vui lòng nhập diện tích sử dụng',
  }),

  ward_code: z.string().min(1, {
    message: 'Vui lòng chọn phường ',
  }),
  cost: z.number().min(1, {
    message: 'Vui lòng nhập giá tiền',
  }),
  // fix
  numberofstreet: z.string().optional(),
  positionBDS: z.string().optional(),
  block: z.string().optional(),
  floor: z.string().min(1, {
    message: 'Vui lòng nhập số tầng',
  }),
  bathroom_id: z.string().optional(),
  viewbalcony: z.string().optional(),
  main_door_id: z.string().optional(),

  subdivision_code: z.string().optional(),
  propertyofhouse: z.string().optional(),
  horizontal: z.string().optional(),
  length: z.string().optional(),
  images: z.string().optional(),

  category_id: z.number().optional(),
  type_rental: z.number().optional(),
  code: z.string().optional(),
  type_product: z.number().optional(),
  video: z.string().optional(),

  car_alley: z.boolean().default(false).optional(),
  back_house: z.boolean().default(false).optional(),
  blooming_house: z.boolean().default(false).optional(),
  not_completed_yet: z.boolean().default(false).optional(),
  land_not_changed_yet: z.boolean().default(false).optional(),
  planning_or_road: z.boolean().default(false).optional(),
  diff_situation: z.boolean().default(false).optional(),
  approved: z.number().optional(),

  cost_deposit: z.string().min(1, {
    message: 'Vui lòng nhập giá tiền cọc',
  }),
  type_user: z.boolean().default(false).optional(),
});

const CategoryPage1020 = () => {
  const setFormData = useAppStore((state) => state.setFormData);
  const setpage1020 = useAppStore((state) => state.setpage1020);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameofbuilding: '',
      // citi: "",
      namedistrict: '',
      district: '',
      condition_interior: '',
      typeofhouse: '',
      bedroom_id: '',
      legal_id: '',

      content: '',
      city: '',
      numberofstreet: '',
      positionBDS: '',
      block: '',
      floor: '',
      bathroom_id: '',
      viewbalcony: '',
      main_door_id: '',
      subdivision_code: '',
      propertyofhouse: '',
      horizontal: '',
      length: '',
      // fix
      usable_area: '',
      cost: '',

      land_area: '',

      ward_code: '',

      code: `${Math.random().toString(36).substr(2, 9)}`,
      type_product: 1,
      type_rental: 3,
      category_id: 1,
      province_code: '',
      images: 'png2',
      video: '1',
      cost_deposit: '',
      car_alley: false,
      back_house: false,
      blooming_house: false,
      not_completed_yet: false,
      land_not_changed_yet: false,
      planning_or_road: false,
      diff_situation: false,
      approved: 2,
      type_user: false,
      // district_code: "hcm",
    },
  });
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [opencity, setOpenCity] = useState(false);
  const [opendistrict, setOpenDistrict] = useState(false);
  const [openward, setOpenWard] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDescribeDetail, setIsFocusDescribeDetail] = useState(false);
  const [errors, setErrors] = useState({
    city: null,
    district: null,
    ward: null,
  });
  const funitureOptions = [
    { value: '1', label: 'Nội thất cao cấp' },
    { value: '2', label: 'Nội thất đầy đủ' },
    { value: '3', label: 'Hoàn thiện cơ bản' },
    { value: '4', label: 'Bàn giao thô' },
  ];
  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if (!access_token) {
      navigate('/auth');
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setCities(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((city) => city.Name === selectedCity);
      setDistricts(city?.Districts || []);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedCity, cities]); // Run when selectedCity or cities change

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Name === selectedDistrict
      );
      setWards(district?.Wards || []);
      setSelectedWard(null);
    }
  }, [selectedDistrict, districts]); // Run when selectedDistrict or districts change

  const [imageNames, setImageNames] = useState([]);
  const [video, setVideo] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map((file) => file.name);
    setImageNames(fileNames);
  };
  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map((file) => file.name);
    setVideo(fileNames);
  };

  const postProduct = async (transformedData, forsale = false) => {
    try {
      const response = await apiClient.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/product/add-product-rent`,
        transformedData
      );

      setEncryptedCookie('productData', response.data.data.id);

      setFormData(response.data.data, imageNames, video, forsale);
      console.log(response.data);
    } catch (error) {
      console.error(
        'Error posting product:',
        error.response?.data || error.message
      );
    }
  };
  const fetchUserInfo = async () => {
    const access_token = Cookies.get('access_token');

    if (access_token) {
      try {
        const response = await apiClient.get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
        );
        return response.data;
      } catch (error) {
        console.error(
          'Error fetching user info:',
          error.response?.data || error.message
        );
        return null;
      }
    } else {
      console.error('No access token found');
      return null;
    }
  };
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
      type_user: data.type_user ? 2 : 1,
      user_id: user_id,
    };
    // console.log(transformedData);
    let hasError = false;
    const newErrors = { city: null, district: null, ward: null };

    if (!selectedCity) {
      newErrors.city = 'Vui lòng chọn tỉnh thành.';
      hasError = true;
    }
    if (!selectedDistrict) {
      newErrors.district = 'Vui lòng chọn quận.';
      hasError = true;
    }
    if (!selectedWard) {
      newErrors.ward = 'Vui lòng chọn huyện.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      if (isForRent) {
        setpage1020(true);
        // setFormData(data, imageNames, video, false);
        // setisforsale(false);
        await postProduct(transformedData, false);
        navigate('/preview');
      } else {
        setpage1020(true);
        // setFormData(data, imageNames, video, true);
        // setisforsale(true);
        await postProduct(transformedData, true);
        // navigate("/preview");
      }
    }
  };
  const handleSaleSubmit = (data) => {
    onSubmit(data, false);
  };

  const handleRentSubmit = (data) => {
    onSubmit(data, true);
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
              <div class="font-[sans-serif] max-w-md ">
                <label class="text-base text-gray-500 font-semibold mb-2 block">
                  ĐĂNG TỪ 03 ĐẾN 12 HÌNH
                </label>
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" />
              </div>

              <div class="font-[sans-serif] max-w-md ">
                <Label htmlFor="video">Video</Label>
                <Input id="video" type="file" accept="video/*" />
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
                {/* check sale */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSaleSubmit)}
                    className="space-y-8"
                  >
                    <TabsContent value="sale">
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
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={opencity}
                                  onOpenChange={setOpenCity}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={opencity}
                                      className="w-full justify-between"
                                    >
                                      {selectedCity
                                        ? cities.find(
                                            (city) => city.Name === selectedCity
                                          )?.Name
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
                                              value={city.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedCity(
                                                  currentValue === selectedCity
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenCity(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {city.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedCity === city.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.city && (
                                  <p className="text-red-600">
                                    {form.formState.errors.city.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="province_code"
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
                                      disabled={!selectedCity}
                                    >
                                      {selectedDistrict
                                        ? districts.find(
                                            (district) =>
                                              district.Name === selectedDistrict
                                          )?.Name
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
                                              value={district.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedDistrict(
                                                  currentValue ===
                                                    selectedDistrict
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenDistrict(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {district.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedDistrict ===
                                                    district.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
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
                                            (ward) => ward.Name === selectedWard
                                          )?.Name
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
                                              value={ward.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedWard(
                                                  currentValue === selectedWard
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenWard(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {ward.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedWard === ward.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
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
                        name="namedistrict"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên đường</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập tên đường" {...field} />
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
                        name="subdivision_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên Phân Khu/lô</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên phân khu/lô" {...field} />
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Loại hình căn hộ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Loại hình nhà ở:</SelectLabel>
                                  <SelectItem value="Nhà mặt phố/ mặt tiền">
                                    Nhà mặt phố/ mặt tiền
                                  </SelectItem>
                                  <SelectItem value="Nhà ngõ, hẻm">
                                    Nhà ngõ, hẻm
                                  </SelectItem>
                                  <SelectItem value="Nhà biệt thự">
                                    Nhà biệt thự
                                  </SelectItem>
                                  <SelectItem value="Nhà phố liền kề">
                                    Nhà phố liền kề
                                  </SelectItem>
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
                          <div className="mt-2 ">
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Số phòng ngủ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng ngủ</SelectLabel>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value=">6">
                                    Nhiều hơn 6
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Số phòng vệ sinh'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng vệ sinh</SelectLabel>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value="Nhiều hơn 6">
                                    Nhiều hơn 6
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Hướng ban công:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng ban công:</SelectLabel>
                                  <SelectItem value="Đông">Đông</SelectItem>
                                  <SelectItem value="Tây">Tây</SelectItem>
                                  <SelectItem value="Nam">Nam</SelectItem>
                                  <SelectItem value="Bắc">Bắc</SelectItem>
                                  <SelectItem value="Đông Bắc">
                                    Đông Bắc
                                  </SelectItem>
                                  <SelectItem value="Đông Nam">
                                    Đông Nam
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Hướng cửa chính:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
                                  <SelectItem value="1">Đông</SelectItem>
                                  <SelectItem value="2">Tây</SelectItem>
                                  <SelectItem value="3">Nam</SelectItem>
                                  <SelectItem value="4">Bắc</SelectItem>
                                  <SelectItem value="5">Đông Bắc</SelectItem>
                                  <SelectItem value="6">Đông Nam</SelectItem>
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
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá bán</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Giá thuê "
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
                        name="legal_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Giấy tờ pháp lý'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  <SelectItem value="1">Đã có sổ</SelectItem>
                                  <SelectItem value="2">Đang chờ sổ</SelectItem>
                                  <SelectItem value="3">Không có sổ</SelectItem>
                                  <SelectItem value="4">
                                    Sổ chung / công chứng vi bằng
                                  </SelectItem>
                                  <SelectItem value="5">
                                    Giấy tờ viết tay
                                  </SelectItem>
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
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {field.value || 'Nội thất'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Nội thất</SelectLabel>

                                {funitureOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                            <FormLabel>Mô tả chi tiết</FormLabel>

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
                      <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bạn là:</FormLabel>

                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="broker"
                                  onCheckedChange={handleCheckedChange}
                                />
                                <Label htmlFor="broker" className="uppercase">
                                  Môi giới
                                </Label>
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4">
                            <FormControl>
                              <>
                                <Popover
                                  open={opencity}
                                  onOpenChange={setOpenCity}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={opencity}
                                      className="w-full justify-between"
                                    >
                                      {selectedCity
                                        ? cities.find(
                                            (city) => city.Name === selectedCity
                                          )?.Name
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
                                              value={city.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedCity(
                                                  currentValue === selectedCity
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenCity(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {city.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedCity === city.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.city && (
                                  <p className="text-red-600">
                                    {form.formState.errors.city.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="province_code"
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
                                      disabled={!selectedCity}
                                    >
                                      {selectedDistrict
                                        ? districts.find(
                                            (district) =>
                                              district.Name === selectedDistrict
                                          )?.Name
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
                                              value={district.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedDistrict(
                                                  currentValue ===
                                                    selectedDistrict
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenDistrict(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {district.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedDistrict ===
                                                    district.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
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
                                            (ward) => ward.Name === selectedWard
                                          )?.Name
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
                                              value={ward.Name}
                                              onSelect={(currentValue) => {
                                                setSelectedWard(
                                                  currentValue === selectedWard
                                                    ? null
                                                    : currentValue
                                                );
                                                setOpenWard(false);
                                                field.onChange(currentValue); // Update form field value
                                              }}
                                            >
                                              {ward.Name}
                                              <CheckIcon
                                                className={cn(
                                                  'ml-auto h-4 w-4',
                                                  selectedWard === ward.Id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
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
                        name="namedistrict"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên đường</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập tên đường" {...field} />
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
                        name="subdivision_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên Phân Khu/lô</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên phân khu/lô" {...field} />
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Loại hình căn hộ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Loại hình nhà ở:</SelectLabel>
                                  <SelectItem value="Nhà mặt phố/ mặt tiền">
                                    Nhà mặt phố/ mặt tiền
                                  </SelectItem>
                                  <SelectItem value="Nhà ngõ, hẻm">
                                    Nhà ngõ, hẻm
                                  </SelectItem>
                                  <SelectItem value="Nhà biệt thự">
                                    Nhà biệt thự
                                  </SelectItem>
                                  <SelectItem value="Nhà phố liền kề">
                                    Nhà phố liền kề
                                  </SelectItem>
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
                          <div className="mt-2 ">
                            <FormLabel>Số phòng ngủ: </FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Số phòng ngủ'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng ngủ</SelectLabel>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value=">6">
                                    Nhiều hơn 6
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Số phòng vệ sinh'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Số phòng vệ sinh</SelectLabel>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                  <SelectItem value="Nhiều hơn 6">
                                    Nhiều hơn 6
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Hướng ban công:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng ban công:</SelectLabel>
                                  <SelectItem value="Đông">Đông</SelectItem>
                                  <SelectItem value="Tây">Tây</SelectItem>
                                  <SelectItem value="Nam">Nam</SelectItem>
                                  <SelectItem value="Bắc">Bắc</SelectItem>
                                  <SelectItem value="Đông Bắc">
                                    Đông Bắc
                                  </SelectItem>
                                  <SelectItem value="Đông Nam">
                                    Đông Nam
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Hướng cửa chính:'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
                                  <SelectItem value="1">Đông</SelectItem>
                                  <SelectItem value="2">Tây</SelectItem>
                                  <SelectItem value="3">Nam</SelectItem>
                                  <SelectItem value="4">Bắc</SelectItem>
                                  <SelectItem value="5">Đông Bắc</SelectItem>
                                  <SelectItem value="6">Đông Nam</SelectItem>
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
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá thuê</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Giá thuê "
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
                        name="cost_deposit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số tiền cọc</FormLabel>

                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Số tiền cọc "
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="legal_id"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Giấy tờ pháp lý'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  <SelectItem value="1">Đã có sổ</SelectItem>
                                  <SelectItem value="2">Đang chờ sổ</SelectItem>
                                  <SelectItem value="3">Không có sổ</SelectItem>
                                  <SelectItem value="4">
                                    Sổ chung / công chứng vi bằng
                                  </SelectItem>
                                  <SelectItem value="5">
                                    Giấy tờ viết tay
                                  </SelectItem>
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
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || 'Nội thất'}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Nội thất</SelectLabel>

                                  {funitureOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
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
                            <FormLabel>Mô tả chi tiết</FormLabel>

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
                      <FormField
                        control={form.control}
                        name="type_user"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bạn là:</FormLabel>

                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="broker"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <Label htmlFor="broker" className="uppercase">
                                  Môi giới
                                </Label>
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
