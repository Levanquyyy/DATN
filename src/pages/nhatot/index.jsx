import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import apiClient from "@/lib/api-client";
import Cookies from "js-cookie";

import { GET_DATA_PRODUCT_RENTHOUSE } from "@/utilities/constant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FaChevronDown,
  FaHome,
  FaBuilding,
  FaLandmark,
  FaStore,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const FormSchema = z.object({
  city: z.string().min(1, {
    message: "Vui lòng chọn tỉnh thành",
  }),
  district: z.string().min(1, {
    message: "Vui lòng chọn quận",
  }),
  ward: z.string().min(1, {
    message: "Vui lòng chọn huyện",
  }),
  space: z.string().optional(),
});
const FormSchemaFortransactionTypes = z.object({
  transactionTypes: z.string().min(1, {
    message: "Vui lòng chọn loại hình",
  }),
});
const FormSchemaForTypeOfHouse = z.object({
  typeOfHouse: z.string().min(1, {
    message: "Vui lòng chọn loại nhà ở",
  }),
});

const FormSchemaForbed = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
const FormSchemaForProjects = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
const FormSchemaForPrices = z.object({
  minPrice: z.string().nonempty("Min price is required"),
  maxPrice: z.string().nonempty("Max price is required"),
});

const NhatotPage = () => {
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [opencity, setOpenCity] = useState(false);
  const [opendistrict, setOpenDistrict] = useState(false);
  const [openward, setOpenWard] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sliderValue, setSliderValue] = useState();
  const [open, setOpen] = useState(false);
  const [openforBed, setOpenforBed] = useState(false);
  const [openforPrice, setOpenforPrice] = useState(false);
  const [value, setValue] = useState("");
  const [valueforbed, setValueforbed] = useState("");
  const [valueforprice, setValueforprice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forSale, setForSale] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [filterbyCategory, setFilterbyCategory] = useState({
    category: null,
    userType: null,
  });
  const [errors, setErrors] = useState({
    city: null,
    district: null,
    ward: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        const response = await apiClient.get(GET_DATA_PRODUCT_RENTHOUSE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }
        console.log(response);
        setDataFromServer(response.data.data);
      } catch (error) {
        const errorMessage = error.message || "An unknown error occurred";
        console.error("Signup error:", errorMessage);
        toast.error(`Signup failed: ${errorMessage}`);
      }
    };

    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((city) => city.Name === selectedCity);
      setDistricts(city?.Districts || []);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Name === selectedDistrict
      );
      setWards(district?.Wards || []);
      setSelectedWard(null);
    }
  }, [selectedDistrict, districts]);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: "",
      district: "",
      ward: "",
      space: "",
    },
  });
  const formFortransactionTypes = useForm({
    resolver: zodResolver(FormSchemaFortransactionTypes),
    defaultValues: {
      transactionTypes: "",
    },
  });
  const formForTypeOfHouse = useForm({
    resolver: zodResolver(FormSchemaForTypeOfHouse),
    defaultValues: {
      typeOfHouse: "",
    },
  });
  const formForBed = useForm({
    resolver: zodResolver(FormSchemaForbed),
    defaultValues: {
      items: [],
    },
  });
  const formForProjects = useForm({
    resolver: zodResolver(FormSchemaForProjects),
    defaultValues: {
      items: "",
    },
  });
  const formForPrices = useForm({
    resolver: zodResolver(FormSchemaForPrices),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
    },
  });

  const transactionTypes = ["Mua bán", "Cho thuê"];
  const filterbypricetag = [
    { label: "Tin mới trước", value: "newest" },
    { label: "Giá thấp trước", value: "low-to-high" },
    { label: "Giá cao trước", value: "high-to-low" },
  ];
  const projects = [
    { value: "152-dien-bien-phu", label: "152 Điện Biên Phủ" },
    { value: "2t-corporation", label: "2T Corporation" },
    { value: "319-bo-de", label: "319 Bồ Đề" },
    {
      value: "4s-riverside-garden-binh-trieu",
      label: "4S Riverside Garden Bình Triệu",
    },
    { value: "4s-riverside-linh-dong", label: "4S Riverside Linh Đông" },
    {
      value: "84-tho-nhuom-hanoi-apartment-center",
      label: "84 Thợ Nhuộm - Hanoi Apartment Center",
    },
    { value: "8x-dam-sen", label: "8x Đầm Sen" },
    { value: "9-view-apartment", label: "9 View Apartment" },
    { value: "9x-ciao-quan-9", label: "9X CIAO Quận 9" },
    { value: "a10-a14-nam-trung-yen", label: "A10-A14 Nam Trung Yên" },
    {
      value: "ab-central-square-nha-trang",
      label: "AB Central Square Nha Trang",
    },
    { value: "ac-building", label: "AC Building" },
    { value: "acb-office-building", label: "ACB Office Building" },
    { value: "acbr-office-building", label: "ACBR Office Building" },
    {
      value: "aio-city-sonata-residences",
      label: "AIO City (Sonata Residences)",
    },
    { value: "aqh-riverside", label: "AQH Riverside" },
    { value: "at-home", label: "AT Home" },
    { value: "az-lam-vien-complex", label: "AZ Lâm Viên Complex" },
    { value: "abacus-tower", label: "Abacus Tower" },
    { value: "acenza-villas", label: "Acenza Villas" },
    { value: "adi-lucky-home", label: "Adi Lucky Home" },
    { value: "aeon-mall-long-bien", label: "Aeon Mall Long Biên" },
    { value: "agrex-tower-building", label: "Agrex Tower Building" },
    { value: "airlink-city", label: "Airlink City" },
    { value: "airlink-city-3", label: "Airlink City 3" },
    { value: "airlink-residence", label: "Airlink Residence" },
    { value: "airlink-town", label: "Airlink Town" },
    { value: "akari-city", label: "Akari City" },
    { value: "alibaba-long-phuoc", label: "Alibaba Long Phước" },
    { value: "alibaba-tan-thanh", label: "Alibaba Tân Thành" },
    { value: "aloha-beach-village", label: "Aloha Beach Village" },
    { value: "alpha-city-87-cong-quynh", label: "Alpha City 87 Cống quỳnh" },
    { value: "alpha-tower", label: "Alpha Tower" },
    { value: "alphanam-luxury-apartment", label: "Alphanam Luxury Apartment" },
    { value: "altara-residences", label: "Altara Residences" },
    { value: "alva-plaza-binh-duong", label: "Alva Plaza Bình Dương" },
    { value: "amber-court", label: "Amber Court" },
    { value: "amber-riverside", label: "Amber Riverside" },
    { value: "amelie-villa-phu-my-hung", label: "Amelie Villa Phú Mỹ Hưng" },
    {
      value: "an-binh-building-chung-cu-an-binh-1-dinh-cong",
      label: "An Bình Building (Chung cư An Bình 1 Định Công)",
    },
    { value: "an-binh-city", label: "An Bình City" },
    { value: "an-binh-green-home", label: "An Bình Green Home" },
    {
      value: "an-binh-plaza-sunshine-tower",
      label: "An Bình Plaza (Sunshine Tower)",
    },
    { value: "an-binh-plaza-ha-noi", label: "An Bình Plaza_Hà Nội" },
    { value: "an-binh-quan-tan-phu", label: "An Bình Quận Tân Phú" },
    { value: "an-binh-tower", label: "An Bình Tower" },
    { value: "an-binh-riverside-2", label: "An Bình Riverside 2" },
    { value: "an-cuu-city", label: "An Cựu City" },
    { value: "an-dan-residence", label: "An Dân Residence" },
    { value: "an-gia-garden", label: "An Gia Garden" },
  ];
  const priceRanges = [
    "Giá dưới 1 tỷ",
    "Giá 1-2 tỷ",
    "Giá 2-3 tỷ",
    "Giá trên 30 tỷ",
  ];
  const options = [
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
    {
      id: "3",
      label: "3",
    },
    {
      id: "4",
      label: "4",
    },
    {
      id: "5",
      label: "5",
    },
    {
      id: "6",
      label: "6",
    },
    {
      id: "more_than_6",
      label: "More than 6",
    },
  ];
  const prominentCities = ["Tp Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];
  const propertyCategories = [
    "Nhà ở",
    "Căn hộ/Chung cư",
    "Đất",
    "Văn phòng, Mặt bằng kinh doanh",
  ];

  const userTypes = ["Tất cả", "Cá nhân", "Môi giới"];
  const typeofhouse = [
    { value: "can-ho-chung-cu", label: "Căn hộ/Chung cư" },
    { value: "nha-o", label: "Nhà ở" },
    {
      value: "van-phong-mat-bang-kinh-doanh",
      label: "Văn phòng, Mặt bằng kinh doanh",
    },
    { value: "dat", label: "Đất" },
    { value: "phong-tro", label: "Phòng trọ" },
    { value: "can-ho-dich-vu-mini", label: "Căn hộ dịch vụ, mini" },
  ];
  const filterbyprice = [
    { label: "Giá dưới 1 tỷ", value: "<1" },
    { label: "Giá 1 - 2 tỷ", value: "1-2" },
    { label: "Giá 2 - 3 tỷ", value: "2-3" },
    { label: "Giá 3 - 5 tỷ", value: "3-5" },
    { label: "Giá 5 - 7 tỷ", value: "5-7" },
    { label: "Giá 7 - 10 tỷ", value: "7-10" },
    { label: "Giá 10 - 15 tỷ", value: "10-15" },
    { label: "Giá 15 - 20 tỷ", value: "15-20" },
    { label: "Giá 20 - 30 tỷ", value: "20-30" },
    { label: "Giá trên 30 tỷ", value: ">30" },
  ];
  const highlightoftypes = [
    { label: "Loại hình nổi bật", value: "highlight" },
    { label: "Nhà đất Tp Hồ Chí Minh", value: "nhadat-tphcm" },
    { label: "Chung cư Tp Hồ Chí Minh", value: "chungcu-tphcm" },
    { label: "Nhà đất Hà Nội", value: "nhadat-hanoi" },
    { label: "Đất Tp Hồ Chí Minh", value: "dat-tphcm" },
    { label: "Nhà đất Đà Nẵng", value: "nhadat-danang" },
    { label: "Chung cư Hà Nội", value: "chungcu-hanoi" },
    { label: "Đất Bình Dương", value: "dat-binhduong" },
    { label: "Đất Đồng Nai", value: "dat-dongnai" },
    { label: "Nhà đất Bình Dương", value: "nhadat-binhduong" },
    { label: "Đất Đà Nẵng", value: "dat-danang" },
  ];

  const onSubmitForLocation = (data) => {
    let hasError = false;
    const newErrors = { city: null, district: null, ward: null };

    if (!selectedCity) {
      newErrors.city = "Vui lòng chọn tỉnh thành.";
      hasError = true;
    }
    if (!selectedDistrict) {
      newErrors.district = "Vui lòng chọn quận.";
      hasError = true;
    }
    if (!selectedWard) {
      newErrors.ward = "Vui lòng chọn huyện.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // setFormData(data, imageNames, video, true);
      // toast.success("Form submitted successfully!");
      // navigate("/preview");
      console.log(data);
    }
  };
  const onChnagetransactionTypes = (data) => {
    console.log({ data });
    if (data === "Mua bán") {
      setForSale(true);
    } else {
      setForSale(false);
    }
  };
  const onChange = (data) => {
    console.log({ data });
  };
  const onSubmit = (data) => {
    const minPrice = parseCurrency(data.minPrice);
    const maxPrice = parseCurrency(data.maxPrice);

    if (parseInt(minPrice) > parseInt(maxPrice)) {
      setErrorMessage("Giá tối thiểu không được lớn hơn giá tối đa");
    } else {
      setErrorMessage("");
      // Proceed with form submission
      console.log(data);
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

  const onSubmitForBed = (data) => {
    console.log(data);
  };
  const onChangeForProjects = (currentValue) => {
    console.log("Selected project:", currentValue);
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, "");
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
                    <PopoverTrigger className="w-full ">
                      Toàn quốc
                    </PopoverTrigger>
                    <PopoverContent>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmitForLocation)}
                          className=""
                        >
                          <FormField
                            control={form.control}
                            name="space"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel>Khoảng cách bạn muốn tìm</FormLabel>
                                <div className="flex items-center gap-3">
                                  <Input
                                    placeholder="Nhập số km bạn muốn"
                                    {...field}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                  />
                                  <span>KM</span>
                                </div>
                                <FormControl>
                                  <Slider
                                    value={[sliderValue]}
                                    max={100}
                                    step={1}
                                    onChange={handleSliderChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

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
                                                (city) =>
                                                  city.Name === selectedCity
                                              )?.Name
                                            : "Chọn tỉnh thành"}
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
                                                      currentValue ===
                                                        selectedCity
                                                        ? null
                                                        : currentValue
                                                    );
                                                    setOpenCity(false);
                                                    field.onChange(
                                                      currentValue
                                                    ); // Update form field value
                                                  }}
                                                >
                                                  {city.Name}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      selectedCity === city.Id
                                                        ? "opacity-100"
                                                        : "opacity-0"
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
                            name="district"
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
                                                  district.Name ===
                                                  selectedDistrict
                                              )?.Name
                                            : "Chọn quận"}
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
                                                    field.onChange(
                                                      currentValue
                                                    ); // Update form field value
                                                  }}
                                                >
                                                  {district.Name}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      selectedDistrict ===
                                                        district.Id
                                                        ? "opacity-100"
                                                        : "opacity-0"
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
                            name="ward"
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
                                                  ward.Name === selectedWard
                                              )?.Name
                                            : "Chọn huyện"}
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
                                                      currentValue ===
                                                        selectedWard
                                                        ? null
                                                        : currentValue
                                                    );
                                                    setOpenWard(false);
                                                    field.onChange(
                                                      currentValue
                                                    ); // Update form field value
                                                  }}
                                                >
                                                  {ward.Name}
                                                  <CheckIcon
                                                    className={cn(
                                                      "ml-auto h-4 w-4",
                                                      selectedWard === ward.Id
                                                        ? "opacity-100"
                                                        : "opacity-0"
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
                          <div className="flex justify-end gap-3">
                            <Button
                              variant
                              onClick={() => window.location.reload()}
                            >
                              Xóa lọc
                            </Button>
                            <Button type="submit">Áp dụng</Button>
                          </div>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>

                  <FaChevronDown className="absolute right-3 top-3 " />
                </div>

                <div className="relative">
                  <Form {...formFortransactionTypes}>
                    <form>
                      <FormField
                        control={formFortransactionTypes.control}
                        name="transactionTypes"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              onChnagetransactionTypes(value);
                            }}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Chọn loại hình" />
                            </SelectTrigger>

                            <SelectContent>
                              {transactionTypes.map((type, index) => (
                                <SelectItem key={index} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </form>
                  </Form>
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
                        {forSale ? `Giá bán` : "Giá thuê"}
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
                          : "Chọn dự án"}
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
                          <CommandGroup>
                            <Form {...formForProjects}>
                              <form className="space-y-8 p-5">
                                <FormField
                                  control={formForProjects.control}
                                  name="items"
                                  render={({ field }) => (
                                    <>
                                      {projects.map((project) => (
                                        <CommandItem
                                          key={project.value}
                                          value={project.value}
                                          onSelect={(currentValue) => {
                                            field.onChange(currentValue);
                                            setValue(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setOpen(false);
                                            // Xử lý thay đổi trực tiếp thay vì submit
                                            onChangeForProjects(currentValue);
                                          }}
                                        >
                                          {project.label}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              value === project.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </>
                                  )}
                                />
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
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {valueforbed
                          ? options.find((option) => option === valueforbed)
                          : "Chọn số phòng ngủ"}
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
                            name="items"
                            render={({ field }) => (
                              <FormItem>
                                {options.map((item) => (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                ))}
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
                  <div>
                    <Form {...formFortransactionTypes}>
                      <form>
                        <FormField
                          control={formFortransactionTypes.control}
                          name="transactionTypes"
                          render={({ field }) => (
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                onChnagetransactionTypes(value);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sắp xếp theo giá" />
                              </SelectTrigger>
                              <SelectContent>
                                {filterbypricetag.map((type, index) => (
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
                    <FaChevronDown className="absolute right-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Featured listings */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Danh sách nổi bật
                </h2>
                {filterbyCategory.category === "Nhà ở" &&
                  filterbyCategory.userType === "Tất cả" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                      {dataFromServer.map((item) => (
                        <Link to={`/detaipage?nhadat=nhadat${item.id}`}>
                          <div
                            key={item.id}
                            className="dark:border-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow "
                          >
                            <img
                              src={`https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80`}
                              alt="Property"
                              className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="font-semibold text-lg mb-2">
                              {item.title}
                            </h3>
                            <p className="">Diện tích {item.land_area} m² </p>
                            <p className=" font-semibold mb-2">
                              Giá: {item.cost}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.content}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
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
