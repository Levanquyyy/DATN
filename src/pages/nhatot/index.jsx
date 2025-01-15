import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';

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
  filterLocation,
  getFilterData,
  minMaxPrice,
  getType_Product,
} from '@/routes/apiforRentHouse.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { fetchLocation } from '@/routes/apiforLocation.jsx';
import { PropertyFilterSkeleton } from '@/components/ui/PropertyFilterSkeleton';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

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

  district_code: z.string().optional(),

  ward_code: z.string().optional(),
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
  const [isSelling, setIsSelling] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ward_code: '',
      district_code: '',
      province_code: '',
    },
  });
  const formatLocationString = (data) => {
    if (!data.district_code && !data.ward_code) {
      return `${data.province_code}`;
    } else if (!data.ward_code) {
      return `${data.district_code}d${data.province_code}`;
    } else {
      return `${data.district_code}d${data.province_code}w${data.ward_code}`;
    }
  };

  const handleRentSubmit = async (data) => {
    console.log(data);
    const formattedString = formatLocationString(data);
    // console.log(formattedString); // Check the formatted string

    try {
      const res = await filterLocation(formattedString); // Gọi API với formatted string
      console.log(res); // Kiểm tra dữ liệu trả về

      if (res && res.data) {
        setDataFromServer(res.data); // Gán dữ liệu vào state
      } else {
        setDataFromServer([]); // Xử lý khi không có dữ liệu
      }
    } catch {
      toast.error('Error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFilterData();

        setDataFromServer(res);
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
  ];

  const propertyCategories = [
    'Nhà ở',
    'Căn hộ/Chung cư',
    'Đất',
    'Văn phòng, Mặt bằng kinh doanh',
  ];

  const userTypes = ['Tất cả', 'Cá nhân', 'Môi giới'];

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
    const { bedroom_id } = data;
    // console.log(bedroom_id);
    try {
      const res = await bedRoomId(bedroom_id);
      setDataFromServer(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
  const handleSwitchChange = async (checked) => {
    setIsSelling(checked);
    if (checked) {
      try {
        const data = await getType_Product(1);
        setDataFromServer(data);
        console.log('Fetched data for selling:', data);
        // Handle the fetched data as needed
      } catch (error) {
        console.error('Error fetching selling data:', error);
      }
    } else {
      try {
        const data = await getType_Product(2);
        setDataFromServer(data);

        console.log('Fetched data for buying:', data);
        // Handle the fetched data as needed
      } catch (error) {
        console.error('Error fetching buying data:', error);
      }
    }
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
                <div className="flex items-center space-x-2 justify-between">
                  <h2 className="text-xl font-semibold mb-2">
                    Danh sách nổi bật
                  </h2>
                  <div className="flex items-center space-x-2  ">
                    <Switch
                      id="sale"
                      checked={isSelling}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="sale">{isSelling ? 'Bán' : 'Mua'}</Label>
                  </div>
                </div>
                {filterbyCategory.category === 'Nhà ở' &&
                  filterbyCategory.userType === 'Tất cả' && (
                    <>
                      {dataFromServer?.length === 0 ? (
                        <div className="text-center">No data found</div>
                      ) : (
                        <PropertyListings
                          initialDataFromServer={dataFromServer}
                        />
                      )}
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
