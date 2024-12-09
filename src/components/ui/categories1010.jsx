import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header.tsx";

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
  numberofstreet: z.string().optional(),
  positionBDS: z.string().optional(),
  block: z.string().optional(),
  numberoffloor: z.string().optional(),
  numberofbath: z.string().optional(),
  viewbalcony: z.string().optional(),
  viewmaindoor: z.string().optional(),
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
  numberofstreetforrent: z.string().optional(),
  positionBDSforrent: z.string().optional(),
  blockforrent: z.string().optional(),
  numberoffloorforrent: z.string().optional(),
  numberofbathforrent: z.string().optional(),
  viewbalconyforrent: z.string().optional(),
  viewmaindoorforrent: z.string().optional(),
  deposit: z.string().optional(),
});
const CategoryPage1010 = () => {
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
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusDescribeDetail, setIsFocusDescribeDetail] = useState(false);
  const [errors, setErrors] = useState({
    city: null,
    district: null,
    ward: null,
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

  const onSubmit = (data) => {
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
      setFormData(data, imageNames, video, true);
      navigate("/preview");
    }
  };
  const onSubmitForRent = (data) => {
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
      setFormData(data, imageNames, video, false);
      navigate("/preview");
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
                    onSubmit={form.handleSubmit(onSubmit)}
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
                      <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thông tin chi tiết</FormLabel>

                            <FormDescription>
                              Tình trạng bất động sản
                            </FormDescription>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch id="handed" />
                                <Label htmlFor="handed" className="uppercase">
                                  đã bàn giao
                                </Label>
                              </div>
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
                                  <SelectLabel>Loại hình căn hộ:</SelectLabel>
                                  <SelectItem value="Căn hộ dịch vụ, mini">
                                    Căn hộ dịch vụ, mini
                                  </SelectItem>
                                  <SelectItem value="Chung cư">
                                    Chung cư
                                  </SelectItem>
                                  <SelectItem value="Duplex">Duplex</SelectItem>
                                  <SelectItem value="Penthouse">
                                    Penthouse
                                  </SelectItem>
                                  <SelectItem value="Tập thể, cư xá">
                                    Tập thể, cư xá
                                  </SelectItem>
                                  <SelectItem value="Officetel">
                                    Officetel
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
                                  <SelectItem value="Hợp đồng đặt cọc">
                                    Hợp đồng đặt cọc
                                  </SelectItem>
                                  <SelectItem value="Hợp đồng mua bán">
                                    Hợp đồng mua bán
                                  </SelectItem>
                                  <SelectItem value="Sổ hồng riêng">
                                    Sổ hồng riêng
                                  </SelectItem>
                                  <SelectItem value="Đang chờ sổ">
                                    Đang chờ sổ
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
                    onSubmit={formforrent.handleSubmit(onSubmitForRent)}
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
                                  <SelectLabel>Loại hình căn hộ:</SelectLabel>
                                  <SelectItem value="Căn hộ dịch vụ, mini">
                                    Căn hộ dịch vụ, mini
                                  </SelectItem>
                                  <SelectItem value="Chung cư">
                                    Chung cư
                                  </SelectItem>
                                  <SelectItem value="Duplex">Duplex</SelectItem>
                                  <SelectItem value="Penthouse">
                                    Penthouse
                                  </SelectItem>
                                  <SelectItem value="Tập thể, cư xá">
                                    Tập thể, cư xá
                                  </SelectItem>
                                  <SelectItem value="Officetel">
                                    Officetel
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formforrent.formState.errors.typeofhouse && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors.typeofhouse
                                    .message
                                }
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
                                  <SelectItem value="Hợp đồng đặt cọc">
                                    Hợp đồng đặt cọc
                                  </SelectItem>
                                  <SelectItem value="Hợp đồng mua bán">
                                    Hợp đồng mua bán
                                  </SelectItem>
                                  <SelectItem value="Sổ hồng riêng">
                                    Sổ hồng riêng
                                  </SelectItem>
                                  <SelectItem value="Đang chờ sổ">
                                    Đang chờ sổ
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {formforrent.formState.errors.liesceneforrent && (
                              <p className="text-red-600">
                                {
                                  formforrent.formState.errors.liesceneforrent
                                    .message
                                }
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

export default CategoryPage1010;
