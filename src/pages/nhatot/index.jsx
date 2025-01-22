import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import PropertyListings from '@/components/ui/property-listing';
import { PropertyFilterSkeleton } from '@/components/ui/PropertyFilterSkeleton';
import { toast } from 'sonner';
import {
  filterAll,
  getFilterData,
  getType_Product,
} from '@/routes/apiforRentHouse';
import { fetchLocation } from '@/routes/apiforLocation';
import { searchSchema } from '@/schemas/schema.ts';
import { useNavigate } from 'react-router-dom';
const NhatotPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelling, setIsSelling] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      province_code: null,
      district_code: null,
      ward_code: null,
      minPrice: null,
      maxPrice: null,
      bedroom_id: null,
    },
  });

  const watchProvince = form.watch('province_code');
  const watchDistrict = form.watch('district_code');

  useEffect(() => {
    const fetchCities = async () => {
      const data = await fetchLocation('provinces', 1);
      setCities(data);
    };
    fetchCities();
  }, []);

  const [cachedDistricts, setCachedDistricts] = useState({});

  useEffect(() => {
    if (watchProvince && !cachedDistricts[watchProvince]) {
      const fetchDistricts = async () => {
        const data = await fetchLocation('districts', watchProvince);
        setDistricts(data);
        setCachedDistricts((prev) => ({
          ...prev,
          [watchProvince]: data,
        }));
        form.setValue('district_code', null);
        form.setValue('ward_code', null);
      };
      fetchDistricts();
    } else if (cachedDistricts[watchProvince]) {
      setDistricts(cachedDistricts[watchProvince]);
    }
  }, [watchProvince, cachedDistricts, form]);

  useEffect(() => {
    if (watchDistrict) {
      const fetchWards = async () => {
        const data = await fetchLocation('wards', watchDistrict);
        setWards(data);
        form.setValue('ward_code', null);
      };
      fetchWards();
    }
  }, [watchDistrict, form]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFilterData();
        if (!res) {
          navigate('/auth');
        }
        setDataFromServer(res);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/auth');
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const queryParams = new URLSearchParams();
    queryParams.append('type', '1');

    if (data.province_code) {
      queryParams.append('location', data.province_code);
    }

    if (data.bedroom_id) {
      queryParams.append('bedroom_id', data.bedroom_id);
    }

    if (data.minPrice) {
      queryParams.append('min_price', parseCurrency(data.minPrice));
    }

    if (data.maxPrice) {
      queryParams.append('max_price', parseCurrency(data.maxPrice));
    }

    try {
      const result = await filterAll(`&${queryParams.toString()}`);
      if (!result) {
        throw new Error('Failed to fetch data');
      }
      setDataFromServer(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
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
    try {
      const data = await getType_Product(checked ? 1 : 2);
      setDataFromServer(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (isLoading) {
    return <PropertyFilterSkeleton />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="p-6 shadow-md">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold mb-6">Tìm kiếm Bất động sản</h1>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="province_code"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {field.value
                                ? cities.find(
                                    (city) => city.code === field.value
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
                                <CommandEmpty>No city found.</CommandEmpty>
                                <CommandGroup>
                                  {cities.map((city) => (
                                    <CommandItem
                                      key={city.code}
                                      value={city.code}
                                      onSelect={(value) =>
                                        field.onChange(value)
                                      }
                                    >
                                      {city.full_name}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === city.code
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district_code"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                              disabled={!watchProvince}
                            >
                              {field.value
                                ? districts.find(
                                    (district) => district.code === field.value
                                  )?.full_name
                                : 'Chọn quận/huyện'}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search district..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No district found.</CommandEmpty>
                                <CommandGroup>
                                  {districts.map((district) => (
                                    <CommandItem
                                      key={district.code}
                                      value={district.code}
                                      onSelect={(value) =>
                                        field.onChange(value)
                                      }
                                    >
                                      {district.full_name}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === district.code
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ward_code"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                              disabled={!watchDistrict}
                            >
                              {field.value
                                ? wards.find(
                                    (ward) => ward.code === field.value
                                  )?.full_name
                                : 'Chọn phường/xã'}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search ward..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No ward found.</CommandEmpty>
                                <CommandGroup>
                                  {wards.map((ward) => (
                                    <CommandItem
                                      key={ward.code}
                                      value={ward.code}
                                      onSelect={(value) =>
                                        field.onChange(value)
                                      }
                                    >
                                      {ward.full_name}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          field.value === ward.code
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Giá tối thiểu"
                            {...field}
                            value={formatCurrency(field.value)}
                            onChange={(e) =>
                              field.onChange(parseCurrency(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Giá tối đa"
                            {...field}
                            value={formatCurrency(field.value)}
                            onChange={(e) =>
                              field.onChange(parseCurrency(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bedroom_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <div
                                key={num}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={num.toString()}
                                  id={`r${num}`}
                                />
                                <Label htmlFor={`r${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={!form.formState.isDirty}>
                    Tìm kiếm
                  </Button>
                </form>
              </Form>

              <div>
                <div className="flex items-center space-x-2 justify-between mt-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Danh sách nổi bật
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sale"
                      checked={isSelling}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="sale">{isSelling ? 'Bán' : 'Mua'}</Label>
                  </div>
                </div>
                {dataFromServer?.length === 0 ? (
                  <div className="text-center">No data found</div>
                ) : (
                  <PropertyListings initialDataFromServer={dataFromServer} />
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
