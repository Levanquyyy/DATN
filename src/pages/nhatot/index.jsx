import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FaChevronDown,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaStore,
  FaUser,
  FaUserTie,
} from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import PropertyListings from '@/components/ui/property-listing';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  bedRoomId,
  getFilterData,
  minMaxPrice,
} from '@/routes/apiforRentHouse.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { fetchLocation } from '@/routes/apiforLocation.jsx';
import { PropertyFilterSkeleton } from '@/components/ui/PropertyFilterSkeleton';

const FormSchemaForTypeOfHouse = z.object({
  typeOfHouse: z.string().min(1, {
    message: 'Vui lòng chọn loại nhà ở',
  }),
});

const FormSchemaForbed = z.object({
  bedroom_id: z.string().nonempty('You have to select at least one item.'),
});

const FormSchemaForPrices = z.object({
  minPrice: z.string().nonempty('Min price is required'),
  maxPrice: z.string().nonempty('Max price is required'),
});
const FormSchema = z.object({
  province_code: z.string().min(1, {
    message: 'Vui lòng chọn tỉnh thành',
  }),

  district_code: z.string().min(1, {
    message: 'Vui lòng chọn quận',
  }),

  ward_code: z.string().min(1, {
    message: 'Vui lòng chọn phường ',
  }),
});

const NhatotPage = () => {
  const [open, setOpen] = useState(false);
  const [openforBed, setOpenforBed] = useState(false);
  const [openforPrice, setOpenforPrice] = useState(false);
  const [value, setValue] = useState('');
  const [valueforbed, setValueforbed] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [forSale, setForSale] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [filterbyCategory, setFilterbyCategory] = useState({
    category: 'Nhà ở',
    userType: 'Tất cả',
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedprovince_code, setSelectedprovince_code] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [openprovince_code, setOpenprovince_code] = useState(false);
  const [opendistrict, setOpenDistrict] = useState(false);
  const [openward, setOpenWard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameofbuilding: 'Wuys 1',
      // citi: "",
      namedistrict: 'Levanquy',

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
      subdivision_code: 'phan khu 1',
      propertyofhouse: '',
      horizontal: '',
      length: '',
      // fix
      usable_area: 0,
      cost: 0,

      land_area: 0,

      ward_code: '',

      code: `${Math.random().toString(36).substr(2, 9)}`,
      type_product: 1,
      type_rental: 3,
      category_id: 1,

      images: '',
      video: '1',
      cost_deposit: 0,
      car_alley: false,
      back_house: false,
      blooming_house: false,
      not_completed_yet: false,
      land_not_changed_yet: false,
      planning_or_road: false,
      diff_situation: false,
      approved: 2,
      type_user: false,
      district_code: '',
    },
  });
  const handleRentSubmit = (data) => {
    // onSubmit(data, true);
    console.log(data);
  };
  const [errors, setErrors] = useState({
    city: null,
    district: null,
    ward: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFilterData();
        setDataFromServer(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // xu ly viec lay location
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

  const formForTypeOfHouse = useForm({
    resolver: zodResolver(FormSchemaForTypeOfHouse),
    defaultValues: {
      typeOfHouse: '',
    },
  });
  const formForBed = useForm({
    resolver: zodResolver(FormSchemaForbed),
    defaultValues: {
      bedroom_id: '',
    },
  });

  const formForPrices = useForm({
    resolver: zodResolver(FormSchemaForPrices),
    defaultValues: {
      minPrice: '',
      maxPrice: '',
    },
  });

  const options = [
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: 'more_than_6',
      label: 'More than 6',
    },
  ];

  const propertyCategories = [
    'Nhà ở',
    'Căn hộ/Chung cư',
    'Đất',
    'Văn phòng, Mặt bằng kinh doanh',
  ];

  const userTypes = ['Tất cả', 'Cá nhân', 'Môi giới'];
  const typeofhouse = [
    { value: 'can-ho-chung-cu', label: 'Căn hộ/Chung cư' },
    { value: 'nha-o', label: 'Nhà ở' },
    {
      value: 'van-phong-mat-bang-kinh-doanh',
      label: 'Văn phòng, Mặt bằng kinh doanh',
    },
    { value: 'dat', label: 'Đất' },
    { value: 'phong-tro', label: 'Phòng trọ' },
    { value: 'can-ho-dich-vu-mini', label: 'Căn hộ dịch vụ, mini' },
  ];
  const filterbyprice = [
    { label: 'Giá dưới 1 tỷ', value: '<1' },
    { label: 'Giá 1 - 2 tỷ', value: '1-2' },
    { label: 'Giá 2 - 3 tỷ', value: '2-3' },
    { label: 'Giá 3 - 5 tỷ', value: '3-5' },
    { label: 'Giá 5 - 7 tỷ', value: '5-7' },
    { label: 'Giá 7 - 10 tỷ', value: '7-10' },
    { label: 'Giá 10 - 15 tỷ', value: '10-15' },
    { label: 'Giá 15 - 20 tỷ', value: '15-20' },
    { label: 'Giá 20 - 30 tỷ', value: '20-30' },
    { label: 'Giá trên 30 tỷ', value: '>30' },
  ];
  const highlightoftypes = [
    { label: 'Loại hình nổi bật', value: 'highlight' },
    { label: 'Nhà đất Tp Hồ Chí Minh', value: 'nhadat-tphcm' },
    { label: 'Chung cư Tp Hồ Chí Minh', value: 'chungcu-tphcm' },
    { label: 'Nhà đất Hà Nội', value: 'nhadat-hanoi' },
    { label: 'Đất Tp Hồ Chí Minh', value: 'dat-tphcm' },
    { label: 'Nhà đất Đà Nẵng', value: 'nhadat-danang' },
    { label: 'Chung cư Hà Nội', value: 'chungcu-hanoi' },
    { label: 'Đất Bình Dương', value: 'dat-binhduong' },
    { label: 'Đất Đồng Nai', value: 'dat-dongnai' },
    { label: 'Nhà đất Bình Dương', value: 'nhadat-binhduong' },
    { label: 'Đất Đà Nẵng', value: 'dat-danang' },
  ];
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PropertyFilterSkeleton />;
  }
  const onChange = (data) => {
    console.log({ data });
  };
  const onSubmit = async (data) => {
    const minPrice = parseCurrency(data.minPrice);
    const maxPrice = parseCurrency(data.maxPrice);

    if (parseInt(minPrice) > parseInt(maxPrice)) {
      setErrorMessage('Giá tối thiểu không được lớn hơn giá tối đa');
    } else {
      setErrorMessage('');
      console.log({ minPrice, maxPrice });
      // Proceed with form submission
      const res = await minMaxPrice(minPrice, maxPrice);
      setDataFromServer(res.data);
    }
  };
  const onChageCategory = (category) => {
    setFilterbyCategory((prevState) => ({
      ...prevState,
      category,
    }));
    console.log({ ...filterbyCategory, category });
  };
  const onChageUserType = (userType) => {
    setFilterbyCategory((prevState) => ({
      ...prevState,
      userType,
    }));
    console.log({ ...filterbyCategory, userType });
  };

  const onSubmitForBed = async (data) => {
    const res = await bedRoomId(data);
    console.log(res);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };
  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, '');
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
              <h1 className="text-3xl font-bold mb-6 ">
                Tìm kiếm Bất động sản
              </h1>

              {/* Main filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="relative border rounded-md flex ">
                  <Popover>
                    <PopoverTrigger className="w-full h-9  text-left py-2 px-3">
                      Toàn quốc
                    </PopoverTrigger>
                    <PopoverContent>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleRentSubmit)}
                          className="space-y-8"
                        >
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
                                                    field.onChange(
                                                      currentValue
                                                    ); // Cập nhật giá trị mã code
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
                                                  district.code ===
                                                  selectedDistrict
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
                                                    field.onChange(
                                                      currentValue
                                                    ); // Cập nhật giá trị mã code
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
                                                (ward) =>
                                                  ward.code === selectedWard
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
                                                      currentValue ===
                                                        selectedWard
                                                        ? null
                                                        : currentValue
                                                    ); // Lưu mã code
                                                    setOpenWard(false);
                                                    field.onChange(
                                                      currentValue
                                                    ); // Cập nhật giá trị mã code
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
                          <Button type="submit" className="w-full">
                            Lọc
                          </Button>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>

                  <FaChevronDown className="absolute right-3 top-3 " />
                </div>

                <div className="relative">
                  <Form {...formForTypeOfHouse}>
                    <form>
                      <FormField
                        control={formForTypeOfHouse.control}
                        name="typeOfHouse"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              onChange(value);
                            }}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Chọn loại hình nhà ở" />
                            </SelectTrigger>

                            <SelectContent>
                              {typeofhouse.map((type, index) => (
                                <SelectItem key={index} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </form>
                  </Form>
                </div>

                <div className="relative">
                  <Form {...formForTypeOfHouse}>
                    <form>
                      <FormField
                        control={formForTypeOfHouse.control}
                        name="typeOfHouse"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              onChange(value);
                            }}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Lọc theo khoảng giá" />
                            </SelectTrigger>

                            <SelectContent>
                              {filterbyprice.map((type, index) => (
                                <SelectItem key={index} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                {/* fix */}
                <div className="relative">
                  <Form {...formForTypeOfHouse}>
                    <form>
                      <FormField
                        control={formForTypeOfHouse.control}
                        name="typeOfHouse"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              onChange(value);
                            }}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Loại hình nổi bật" />
                            </SelectTrigger>

                            <SelectContent>
                              {highlightoftypes.map((type, index) => (
                                <SelectItem key={index} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="relative">
                  <Popover open={openforPrice} onOpenChange={setOpenforPrice}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openforPrice}
                        className="w-full justify-between"
                      >
                        {forSale ? `Giá bán` : 'Giá thuê'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <Form {...formForPrices}>
                              <form
                                className="space-y-8 p-5"
                                onSubmit={formForPrices.handleSubmit(onSubmit)}
                              >
                                <FormField
                                  control={formForPrices.control}
                                  name="minPrice"
                                  render={({ field }) => (
                                    <div className="flex items-center gap-3">
                                      <Input
                                        type="text"
                                        placeholder="Giá tối thiểu "
                                        {...field}
                                        value={formatCurrency(field.value)}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseCurrency(e.target.value)
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                />

                                <FormField
                                  control={formForPrices.control}
                                  name="maxPrice"
                                  render={({ field }) => (
                                    <div className="flex items-center gap-3">
                                      <Input
                                        type="text"
                                        placeholder="Giá tối đa "
                                        {...field}
                                        value={formatCurrency(field.value)}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseCurrency(e.target.value)
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                />

                                {errorMessage && (
                                  <span className="text-red-500">
                                    {errorMessage}
                                  </span>
                                )}

                                <Button type="submit">Lọc</Button>
                              </form>
                            </Form>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Projects filter */}
                <div className="relative">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? projects.find((project) => project.value === value)
                              ?.label
                          : 'Chọn dự án'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="tìm dự án..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy dự án</CommandEmpty>
                          <CommandGroup></CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative">
                  {/* for bed */}
                  <Popover open={openforBed} onOpenChange={setOpenforBed}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {valueforbed
                          ? options.find((option) => option === valueforbed)
                          : 'Chọn số phòng ngủ'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Form {...formForBed}>
                        <form
                          onSubmit={formForBed.handleSubmit(onSubmitForBed)}
                          className="space-y-8 p-5"
                        >
                          <FormField
                            control={formForBed.control}
                            name="bedroom_id"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroup
                                    defaultValue="comfortable"
                                    value={field.value}
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                  >
                                    {options?.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                      >
                                        <RadioGroupItem
                                          value={item.id}
                                          id={`r${item.id}`}
                                        />
                                        <Label htmlFor={`r${item.id}`}>
                                          {item.label}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Submit</Button>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Price range filter */}

              {/* Prominent property types */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Loại hình nổi bật
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyCategories.map((category, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
                      onClick={() => onChageCategory(category)}
                    >
                      {index === 0 && <FaHome className="text-blue-500 mb-2" />}
                      {index === 1 && (
                        <FaBuilding className="text-green-500 mb-2" />
                      )}
                      {index === 2 && (
                        <FaLandmark className="text-yellow-500 mb-2" />
                      )}
                      {index === 3 && (
                        <FaStore className="text-purple-500 mb-2" />
                      )}
                      <h3 className="font-semibold">{category}</h3>
                    </div>
                  ))}
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
                {filterbyCategory.category === 'Nhà ở' &&
                  filterbyCategory.userType === 'Tất cả' && (
                    <>
                      <PropertyListings dataFromServer={dataFromServer} />
                    </>
                  )}
              </div>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
};
export default NhatotPage;
