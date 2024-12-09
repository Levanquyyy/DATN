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
  status: z.string().min(2, {
    message: "Vui lòng chọn trạng thái",
  }),

  warranty_policy: z.string().min(2, {
    message: "Vui lòng chọn chính sách bảo hành",
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

  sizescreen: z.string().optional(),
  typeperson: z.string().optional(),
  microprocessor: z.string().optional(),
  ram: z.string().optional(),
  hard_drive: z.string().optional(),
  type_of_hard_drive: z.string().optional(),
  graphic_card: z.string().optional(),
});

const sizescreens = [
  { label: "15 - 16.9 inch", value: "15-16.9" },
  { label: "17 - 18.9 inch", value: "17-18.9" },
  { label: "19 - 20.9 inch", value: "19-20.9" },
  { label: ">= 21 inch", value: ">=21" },
];
const use3gs = [
  { label: "Không có 3G/4G", value: "Không có 3G/4G" },
  { label: "Sử dụng simcard 3G/4G", value: "Sử dụng simcard 3G/4G" },
];
const warranty_policy = [
  "Hết bảo hành",
  "1 tháng",
  "2 tháng",
  "3 tháng",
  "4-6 tháng",
  "7-12 tháng",
  ">12 tháng",
  "Còn bảo hành",
];
const microprocessors = [
  { label: "AMD", value: "AMD" },
  { label: "Athlon", value: "Athlon" },
  { label: "Intel Atom", value: "Intel Atom" },
  { label: "Intel Celeron", value: "Intel Celeron" },
  { label: "Intel Core 2 Duo", value: "Intel Core 2 Duo" },
  { label: "Intel Core 2 Quad", value: "Intel Core 2 Quad" },
  { label: "Intel Core i3", value: "Intel Core i3" },
  { label: "Intel Core i5", value: "Intel Core i5" },
  { label: "Intel Core i7", value: "Intel Core i7" },
  { label: "Intel Core i9", value: "Intel Core i9" },
  { label: "Intel Pentium", value: "Intel Pentium" },
  { label: "Intel Quark", value: "Intel Quark" },
  { label: "Intel Xeon", value: "Intel Xeon" },
  { label: "Ryzen 3", value: "Ryzen 3" },
  { label: "Ryzen 5", value: "Ryzen 5" },
  { label: "Ryzen 7", value: "Ryzen 7" },
];
const graphic_cards = [
  { label: "Onboard", value: "Onboard" },
  { label: "AMD", value: "AMD" },
  { label: "NVIDIA", value: "NVIDIA" },
  { label: "Khác", value: "Khác" },
];
const rams = [
  { label: "< 1 GB", value: "<1" },
  { label: "1 GB", value: "1" },
  { label: "2 GB", value: "2" },
  { label: "4 GB", value: "4" },
  { label: "6 GB", value: "6" },
  { label: "8 GB", value: "8" },
  { label: "16 GB", value: "16" },
  { label: "32 GB", value: "32" },
  { label: "> 32 GB", value: ">32" },
];
const type_of_hard_drives = [
  { label: "HDD", value: "HDD" },
  { label: "SSD", value: "SSD" },
];

const hard_drives = [
  { label: "< 128 GB", value: "<128" },
  { label: "128 GB", value: "128" },
  { label: "250 GB", value: "250" },
  { label: "256 GB", value: "256" },
  { label: "320 GB", value: "320" },
  { label: "480 GB", value: "480" },
  { label: "500 GB", value: "500" },
  { label: "512 GB", value: "512" },
  { label: "640 GB", value: "640" },
  { label: "700 GB", value: "700" },
  { label: "750 GB", value: "750" },
  { label: "1TB", value: "1TB" },
  { label: ">1TB", value: ">1TB" },
];
const CategoryPage1090 = () => {
  const setFormData = useAppStore((state) => state.setFormData);
  const setpage1090 = useAppStore((state) => state.setpage1090);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      price: "",
      title: "",
      describedetail: "",
      city: "",
      district: "",
      ward: "",
      status: "",
      warranty_policy: "",
      sizescreen: "",

      typeperson: "",
      microprocessor: "",
      ram: "",
      hard_drive: "",

      type_of_hard_drive: "",
      graphic_card: "",
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
  const [brandPhone, setBrandPhone] = useState([]);
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

  // useEffect(() => {
  //   const fetchDataForPhone = async () => {
  //     const options = {
  //       method: "GET",
  //       url: "https://mobile-phones2.p.rapidapi.com/brands",
  //       headers: {
  //         "x-rapidapi-key": `${import.meta.env.VITE_CLIENT_API_PHONE}`,
  //         "x-rapidapi-host": `${import.meta.env.VITE_CLIENT_API_CREDENTIAL}`,
  //       },
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);

  //       setBrandPhone(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchDataForPhone();
  // }, []);
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
      setFormData(data, imageNames, video, null);
      setpage1090(true);
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
                </TabsList>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <TabsContent value="sale">
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
                        name="status"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Tình trạng</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Tình trạng"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Tình trạng máy</SelectLabel>
                                  <SelectItem value="Mới">Mới</SelectItem>
                                  <SelectItem value="Đã sử dụng (chưa sửa chữa)">
                                    Đã sử dụng (chưa sửa chữa)
                                  </SelectItem>
                                  <SelectItem value="Đã sử dụng (qua sửa chữa)">
                                    Đã sử dụng (qua sửa chữa)
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.status && (
                              <p className="text-red-600">
                                {form.formState.errors.status.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="microprocessor"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Bộ xử lý</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Bộ xử lý"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Bộ xử lý máy</SelectLabel>
                                  {microprocessors.map(
                                    (microprocessor, index) => (
                                      <SelectItem
                                        value={microprocessor.value}
                                        key={index}
                                      >
                                        {microprocessor.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ram"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Ram</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Ram"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Ram máy</SelectLabel>
                                  {rams.map((ram, index) => (
                                    <SelectItem value={ram.value} key={index}>
                                      {ram.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hard_drive"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Ổ cứng</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Ổ cứng"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Ổ cứng máy</SelectLabel>
                                  {hard_drives.map((hard_drive, index) => (
                                    <SelectItem
                                      value={hard_drive.label}
                                      key={index}
                                    >
                                      {hard_drive.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type_of_hard_drive"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Loại ổ cứng</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Loại ổ cứng"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Loại ổ cứng máy</SelectLabel>
                                  {type_of_hard_drives.map(
                                    (type_of_hard_drive, index) => (
                                      <SelectItem
                                        value={type_of_hard_drive.value}
                                        key={index}
                                      >
                                        {type_of_hard_drive.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="graphic_card"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Card đồ họa</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Card đồ họa"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Card đồ họa máy</SelectLabel>
                                  {graphic_cards.map((graphic_card, index) => (
                                    <SelectItem
                                      value={graphic_card.value}
                                      key={index}
                                    >
                                      {graphic_card.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sizescreen"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Kích thước màn hình</FormLabel>

                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Kích thước màn hình"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Kích thước màn hình</SelectLabel>

                                  {sizescreens.map((size, index) => (
                                    <SelectItem value={size.value} key={index}>
                                      {size.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.status && (
                              <p className="text-red-600">
                                {form.formState.errors.status.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="warranty_policy"
                        render={({ field }) => (
                          <div className="mt-2 flex flex-col gap-3">
                            <FormLabel>Chính sách bảo hành</FormLabel>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue>
                                  {field.value || "Chính sách bảo hành:"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Chính sách bảo hành:
                                  </SelectLabel>
                                  {warranty_policy.map(
                                    (warranty_policy, index) => (
                                      <SelectItem
                                        value={warranty_policy}
                                        key={index}
                                      >
                                        {warranty_policy}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.warranty_policy && (
                              <p className="text-red-600">
                                {form.formState.errors.warranty_policy.message}
                              </p>
                            )}
                          </div>
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
                      <div className="flex gap-3">
                        <FormField
                          control={form.control}
                          name="typeperson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bạn là:</FormLabel>

                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Switch id="typeperson" {...field} />
                                  <Label
                                    htmlFor="typeperson"
                                    className="uppercase"
                                  >
                                    Bán chuyên
                                  </Label>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-3 mt-3">
                        <Button variant="outline" type="submit">
                          Xem trước
                        </Button>
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

export default CategoryPage1090;
