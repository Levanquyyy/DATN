import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// select city ward district
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAppStore } from "@/store";

import { FaCheckCircle } from "react-icons/fa";
const FormSchema = z.object({
  nameofbuilding: z.string().min(2, {
    message: "Vui lòng nhập tên tòa nhà",
  }),
  funiture: z.string().min(2, {
    message: "Vui lòng nhập nội thất",
  }),
  namedistrict: z.string().min(2, {
    message: "Vui lòng nhâp tên đường",
  }),

  liescene: z.string().min(2, {
    message: "Vui lòng chọn giấy tờ pháp lý",
  }),
  acreage: z.string().min(2, {
    message: "Vui lòng nhập diện tích",
  }),
  price: z.string().min(2, {
    message: "Vui lòng nhập giá tiền",
  }),
  title: z.string().min(2, {
    message: "Vui lòng nhập tiêu đề tin đăng",
  }),
  describedetail: z.string().min(2, {
    message: "Vui lòng nhập mô tả chi tiết",
  }),
  city: z.string().min(1, {
    message: "Vui lòng chọn tỉnh thành",
  }),
  district: z.string().min(1, {
    message: "Vui lòng chọn quận",
  }),
  ward: z.string().min(1, {
    message: "Vui lòng chọn huyện",
  }),
  typeofhouse: z.string().min(1, {
    message: "Vui lòng chọn loại hình căn hộ",
  }),
  numberofbedroom: z.string().min(1, {
    message: "Vui lòng chọn số phòng ngủ",
  }),
  acreaged: z.string().min(2, {
    message: "Vui lòng nhập diện tích sử dụng",
  }),
  numberofstreet: z.string().optional(),
  positionBDS: z.string().optional(),
  block: z.string().optional(),
  numberoffloor: z.string().optional(),
  numberofbath: z.string().optional(),
  viewbalcony: z.string().optional(),
  viewmaindoor: z.string().optional(),

  sperate: z.string().optional(),
  propertyofhouse: z.string().optional(),
  horizontal: z.string().optional(),
  vertical: z.string().optional(),
});
const FormSchemaForRent = z.object({
  nameofbuilding: z.string().min(2, {
    message: "Vui lòng nhập tên tòa nhà",
  }),
  city: z.string().min(1, {
    message: "Vui lòng chọn tỉnh thành",
  }),
  district: z.string().min(1, {
    message: "Vui lòng chọn quận",
  }),
  ward: z.string().min(1, {
    message: "Vui lòng chọn huyện",
  }),
  namedistrictforrent: z.string().min(2, {
    message: "Vui lòng nhâp tên đường",
  }),

  liesceneforrent: z.string().min(2, {
    message: "Vui lòng chọn giấy tờ pháp lý",
  }),
  acreageforrent: z.string().min(2, {
    message: "Vui lòng nhập diện tích",
  }),
  priceforrent: z.string().min(2, {
    message: "Vui lòng nhập giá tiền",
  }),
  titleforrent: z.string().min(2, {
    message: "Vui lòng nhập tiêu đề tin đăng",
  }),
  describedetailforrent: z.string().min(2, {
    message: "Vui lòng nhập mô tả chi tiết",
  }),
  funitureforrent: z.string().min(2, {
    message: "Vui lòng nhập nội thất",
  }),
  typeofhouseforrent: z.string().min(1, {
    message: "Vui lòng chọn loại hình căn hộ",
  }),
  numberofbedroomforrent: z.string().min(1, {
    message: "Vui lòng chọn số phòng ngủ",
  }),
  acreagedforrent: z.string().min(2, {
    message: "Vui lòng nhập diện tích sử dụng",
  }),
  numberofstreetforrent: z.string().optional(),
  positionBDSforrent: z.string().optional(),
  blockforrent: z.string().optional(),
  numberoffloorforrent: z.string().optional(),
  numberofbathforrent: z.string().optional(),
  viewbalconyforrent: z.string().optional(),
  viewmaindoorforrent: z.string().optional(),
  deposit: z.string().optional(),
  sperateforrent: z.string().optional(),
  propertyofhouseforrent: z.string().optional(),
  horizontalforrent: z.string().optional(),
  verticalforrent: z.string().optional(),
});
const options = [
  "Hẻm xe hơi",
  "Nhà nở hậu",
  "Nhà tóp hậu",
  "Nhà dính quy hoạch / lộ giới",
  "Nhà chưa hoàn công",
  "Nhà nát",
  "Đất chưa chuyển thổ",
  "Hiện trạng khác",
];
const CategoryPage1020 = () => {
  const setFormData = useAppStore((state) => state.setFormData);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameofbuilding: "",
      citi: "",
      namedistrict: "",
      funiture: "",
      typeofhouse: "",
      numberofbedroom: "",
      liescene: "",
      acreage: "",
      price: "",
      title: "",
      describedetail: "",
      city: "",
      district: "",
      ward: "",
      numberofstreet: "",
      positionBDS: "",
      block: "",
      numberoffloor: "",
      numberofbath: "",
      viewbalcony: "",
      viewmaindoor: "",
      sperate: "",
      propertyofhouse: "",
      horizontal: "",
      vertical: "",
      acreaged: "",
    },
  });
  const formforrent = useForm({
    resolver: zodResolver(FormSchemaForRent),
    defaultValues: {
      nameofbuilding: "",
      city: "",
      district: "",
      ward: "",
      namedistrictforrent: "",
      liesceneforrent: "",
      acreageforrent: "",
      priceforrent: "",
      titleforrent: "",
      describedetailforrent: "",
      typeofhouseforrent: "",
      numberofbedroomforrent: "",
      numberofstreetforrent: "",
      positionBDSforrent: "",
      blockforrent: "",
      numberoffloorforrent: "",
      numberofbathforrent: "",
      viewbalconyforrent: "",
      viewmaindoorforrent: "",
      deposit: "",
      funitureforrent: "",
      sperateforrent: "",
      propertyofhouseforrent: "",
      horizontalforrent: "",
      verticalforrent: "",
      acreagedforrent: "",
    },
  });
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [opencity, setOpenCity] = useState(false);
  const [opendistrict, setOpenDistrict] = useState(false);
  const [openward, setOpenWard] = useState(false);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDescribeDetail, setIsFocusDescribeDetail] = useState(false);
  const [errors, setErrors] = useState({
    city: null,
    district: null,
    ward: null,
  });
  const handleOptionClick = (option, isSale = false) => {
    setError("");
    const formToUse = isSale ? form : formforrent;
    const fieldName = isSale ? "propertyofhouse" : "propertyofhouseforrent";

    const currentOptions = formToUse
      .getValues(fieldName)
      .split(",")
      .filter(Boolean);

    if (currentOptions.includes(option)) {
      const newOptions = currentOptions.filter((item) => item !== option);
      formToUse.setValue(fieldName, newOptions.join(","));
    } else {
      if (option === "Hiện trạng khác" && currentOptions.length > 0) {
        setError("Không thể chọn các tùy chọn khác với 'Hiện trạng khác'");
        return;
      }
      if (currentOptions.includes("Hiện trạng khác")) {
        setError("Không thể chọn các tùy chọn khác với 'Hiện trạng khác'");
        return;
      }
      const newOptions = [...currentOptions, option];
      formToUse.setValue(fieldName, newOptions.join(","));
    }
  };
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
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
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

  const onSubmit = (data, isForRent = false) => {
    console.log(data);

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
      if (isForRent) {
        setFormData(data, imageNames, video, false);
        navigate("/preview");
      } else {
        setFormData(data, imageNames, video, true);
        navigate("/preview");
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
                <input
                  type="file"
                  class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                />
                <p class="text-xs text-gray-400 mt-2">
                  PNG, JPG SVG, WEBP, and GIF are Allowed.
                </p>
              </div>

              <div class="font-[sans-serif] max-w-md ">
                <label class="text-base text-gray-500 font-semibold mb-2 block">
                  ĐĂNG TỐI ĐA 01 VIDEO
                </label>
                <input
                  type="file"
                  class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                  onChange={handleVideoChange}
                  accept="video/*"
                />
                <p class="text-xs text-gray-400 mt-2">
                  MP4, AVI, MOV, and other video formats are allowed.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <Tabs
                defaultValue="sale"
                className="w-[400px] sm:w-full flex flex-col  gap-3"
              >
                <TabsList>
                  <TabsTrigger value="sale">Cần bán</TabsTrigger>
                  <TabsTrigger value="rent">Cho thuê</TabsTrigger>
                </TabsList>
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
                                              district.Name === selectedDistrict
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
                                                field.onChange(currentValue); // Update form field value
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
                                            (ward) => ward.Name === selectedWard
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
                        name="sperate"
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
                                  {field.value || "Loại hình căn hộ"}
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
                        name="numberofbedroom"
                        render={({ field }) => (
                          <div className="mt-2 ">
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Số phòng ngủ"}
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
                                  <SelectItem value="Nhiều hơn 6">
                                    Nhiều hơn 6
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.numberofbedroom && (
                              <p className="text-red-600">
                                {form.formState.errors.numberofbedroom.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="numberofbath"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng vệ sinh</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Số phòng vệ sinh"}
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
                            {form.formState.errors.numberofbath && (
                              <p className="text-red-600">
                                {form.formState.errors.numberofbath.message}
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
                                  {field.value || "Hướng ban công:"}
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
                        name="viewmaindoor"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng cửa chính</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Hướng cửa chính:"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
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
                            {form.formState.errors.viewmaindoor && (
                              <p className="text-red-600">
                                {form.formState.errors.viewmaindoor.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="numberoffloor"
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
                        name="acreage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích & giá</FormLabel>

                            <FormControl>
                              <Input placeholder="Diện tích " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="acreaged"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích sử dụng</FormLabel>

                            <FormControl>
                              <Input placeholder="Diện tích " {...field} />
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
                        name="vertical"
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
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá bán</FormLabel>

                            <FormControl>
                              <Input placeholder="Giá bán " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="liescene"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Giấy tờ pháp lý"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  <SelectItem value="Đã có sổ">
                                    Đã có sổ
                                  </SelectItem>
                                  <SelectItem value="Đang chờ sổ">
                                    Đang chờ sổ
                                  </SelectItem>
                                  <SelectItem value="Không có sổ">
                                    Không có sổ
                                  </SelectItem>
                                  <SelectItem value="Sổ chung / công chứng vi bằng">
                                    Sổ chung / công chứng vi bằng
                                  </SelectItem>
                                  <SelectItem value="Giấy tờ viết tay">
                                    Giấy tờ viết tay
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.liescene && (
                              <p className="text-red-600">
                                {form.formState.errors.liescene.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="funiture"
                        render={({ field }) => (
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {field.value || "Nội thất"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Nội thất</SelectLabel>
                                <SelectItem value="Nội thất cao cấp">
                                  Nội thất cao cấp
                                </SelectItem>
                                <SelectItem value="Nội thất đầy đủ">
                                  Nội thất đầy đủ
                                </SelectItem>
                                <SelectItem value="Hoàn thiện cơ bản">
                                  Hoàn thiện cơ bản
                                </SelectItem>
                                <SelectItem value="Bàn giao thô">
                                  Bàn giao thô
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="propertyofhouse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Đặc điểm nhà/đất</FormLabel>

                            <FormControl>
                              <div className="container mx-auto">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800"></h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                  {options.map((option, index) => (
                                    <div
                                      key={index}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className={`relative p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
                                        field.value.split(",").includes(option)
                                          ? "bg-blue-500 text-white"
                                          : "bg-white text-gray-800 hover:bg-gray-100"
                                      }`}
                                      onClick={() =>
                                        handleOptionClick(option, true)
                                      }
                                      role="checkbox"
                                      aria-checked={field.value
                                        .split(",")
                                        .includes(option)}
                                      tabIndex={0}
                                    >
                                      <span className="text-sm font-medium">
                                        {option}
                                      </span>
                                      {field.value
                                        .split(",")
                                        .includes(option) && (
                                        <div
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="absolute top-2 right-2"
                                        >
                                          <FaCheckCircle className="text-white" />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                {error && (
                                  <div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                                  >
                                    {error}
                                  </div>
                                )}
                                <div className="mt-6">
                                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    Selected Options:
                                  </h3>
                                  <ul className="list-disc list-inside text-gray-600">
                                    {field.value
                                      .split(",")
                                      .map((option, index) => (
                                        <li
                                          key={index}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                        >
                                          {option}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                                  {" "}
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
                        name="describedetail"
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
                                  {" "}
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

                      <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bạn là:</FormLabel>

                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch id="broker" />
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
                <Form {...formforrent}>
                  <form
                    onSubmit={formforrent.handleSubmit(handleRentSubmit)}
                    className="space-y-8"
                  >
                    <TabsContent value="rent">
                      <FormField
                        control={formforrent.control}
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
                        control={formforrent.control}
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
                                {formforrent.formState.errors.city && (
                                  <p className="text-red-600">
                                    {formforrent.formState.errors.city.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
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
                                              district.Name === selectedDistrict
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
                                                field.onChange(currentValue); // Update form field value
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
                                {formforrent.formState.errors.district && (
                                  <p className="text-red-600">
                                    {
                                      formforrent.formState.errors.district
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
                        control={formforrent.control}
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
                                            (ward) => ward.Name === selectedWard
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
                                {formforrent.formState.errors.ward && (
                                  <p className="text-red-600">
                                    {formforrent.formState.errors.ward.message}
                                  </p>
                                )}
                              </>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="namedistrictforrent"
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
                        control={formforrent.control}
                        name="numberofstreetforrent"
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
                        control={formforrent.control}
                        name="positionBDSforrent"
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
                        control={formforrent.control}
                        name="blockforrent"
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
                      {/* add new  */}
                      <FormField
                        control={formforrent.control}
                        name="sperateforrent"
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
                        control={formforrent.control}
                        name="propertyofhouseforrent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Đặc điểm nhà/đất</FormLabel>

                            <FormControl>
                              <div className="container mx-auto">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800"></h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                  {options.map((option, index) => (
                                    <div
                                      key={index}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className={`relative p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
                                        field.value.split(",").includes(option)
                                          ? "bg-blue-500 text-white"
                                          : "bg-white text-gray-800 hover:bg-gray-100"
                                      }`}
                                      onClick={() =>
                                        handleOptionClick(option, false)
                                      }
                                      role="checkbox"
                                      aria-checked={field.value
                                        .split(",")
                                        .includes(option)}
                                      tabIndex={0}
                                    >
                                      <span className="text-sm font-medium">
                                        {option}
                                      </span>
                                      {field.value
                                        .split(",")
                                        .includes(option) && (
                                        <div
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="absolute top-2 right-2"
                                        >
                                          <FaCheckCircle className="text-white" />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                {error && (
                                  <div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                                  >
                                    {error}
                                  </div>
                                )}
                                <div className="mt-6">
                                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    Selected Options:
                                  </h3>
                                  <ul className="list-disc list-inside text-gray-600">
                                    {field.value
                                      .split(",")
                                      .map((option, index) => (
                                        <li
                                          key={index}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                        >
                                          {option}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="acreagedforrent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích sử dụng</FormLabel>

                            <FormControl>
                              <Input placeholder="Diện tích " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="horizontalforrent"
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
                        control={formforrent.control}
                        name="verticalforrent"
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
                        control={formforrent.control}
                        name="numberoffloorforrent"
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
                      <FormField
                        control={formforrent.control}
                        name="typeofhouseforrent"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Loại hình căn hộ"}
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
                        control={formforrent.control}
                        name="numberofbedroomforrent"
                        render={({ field }) => (
                          <div className="mt-2 ">
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Số phòng ngủ"}
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
                                  <SelectItem value="Nhiều hơn 6">
                                    Nhiều hơn 6
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formforrent.formState.errors
                              .numberofbedroomforrent && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors
                                    .numberofbedroomforrent.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="numberofbathforrent"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Số phòng vệ sinh</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Số phòng vệ sinh"}
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
                            {formforrent.formState.errors
                              .numberofbathforrent && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors
                                    .numberofbathforrent.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="viewbalconyforrent"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng ban công</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Hướng ban công:"}
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
                            {formforrent.formState.errors
                              .viewbalconyforrent && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors
                                    .viewbalconyforrent.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="viewmaindoorforrent"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Hướng cửa chính</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Hướng cửa chính:"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Hướng cửa chính</SelectLabel>
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
                            {formforrent.formState.errors
                              .viewmaindoorforrent && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors
                                    .viewmaindoorforrent.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="acreageforrent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Diện tích & giá</FormLabel>
                            <FormControl>
                              <Input placeholder="Diện tích " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="priceforrent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá thuê</FormLabel>
                            <FormControl>
                              <Input placeholder="Giá thuê " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="deposit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tiền cọc </FormLabel>
                            <FormControl>
                              <Input placeholder="Tiền cọc " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="liesceneforrent"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Thông tin khác</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Giấy tờ pháp lý"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Giấy tờ pháp lý:</SelectLabel>
                                  <SelectItem value="Đã có sổ">
                                    Đã có sổ
                                  </SelectItem>
                                  <SelectItem value="Đang chờ sổ">
                                    Đang chờ sổ
                                  </SelectItem>
                                  <SelectItem value="Không có sổ">
                                    Không có sổ
                                  </SelectItem>
                                  <SelectItem value="Sổ chung / công chứng vi bằng">
                                    Sổ chung / công chứng vi bằng
                                  </SelectItem>
                                  <SelectItem value="Giấy tờ viết tay">
                                    Giấy tờ viết tay
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.liescene && (
                              <p className="text-red-600">
                                {form.formState.errors.liescene.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="funitureforrent"
                        render={({ field }) => (
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {field.value || "Nội thất"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Nội thất</SelectLabel>
                                <SelectItem value="Nội thất cao cấp">
                                  Nội thất cao cấp
                                </SelectItem>
                                <SelectItem value="Nội thất đầy đủ">
                                  Nội thất đầy đủ
                                </SelectItem>
                                <SelectItem value="Hoàn thiện cơ bản">
                                  Hoàn thiện cơ bản
                                </SelectItem>
                                <SelectItem value="Bàn giao thô">
                                  Bàn giao thô
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormField
                        control={formforrent.control}
                        name="titleforrent"
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
                                  {" "}
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
                        control={formforrent.control}
                        name="describedetailforrent"
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
                                  {" "}
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

                      <FormField
                        control={formforrent.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bạn là:</FormLabel>

                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch id="broker" />
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
