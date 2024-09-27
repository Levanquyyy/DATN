import {
  Bell,
  BriefcaseBusiness,
  Building,
  CircleUser,
  Clock,
  Heart,
  LaptopMinimal,
  Menu,
  MessageCircle,
  Package2,
  PackagePlus,
  Search,
  Share2,
  ShoppingCart,
  SquareArrowOutUpRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

const frameworks = [
  {
    value: "Hope",
    label: "Hope",
  },
  {
    value: "Nhà Hope",
    label: "Nhà Hope",
  },
  {
    value: "Xe Hope",
    label: "Xe Hope",
  },
  {
    value: "Việc Hope",
    label: "Việc Hope",
  },
];
const items = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Bất động sản",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Xe cộ",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Đồ điện tử",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Đồ gia dụng, nội thất, cây cảnh",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Giải trí, Thể thao, Sở thích",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Mẹ và bé",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    text: "Dịch vụ, Du lịch",
  },
];

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const HomePage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const [openBurger, setOpenBurger] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [position, setPosition] = useState("bottom");
  const recipes = [
    {
      image:
        "https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg",
      name: "Spicy Chicken Stir-Fry",
      price: "34 triệu/tháng",
      time: "1 giờ trước",
      location: "Hà Nội",
    },
    {
      image:
        "https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg",
      name: "Spicy Chicken Stir-Fry",
      price: "34 triệu/tháng",
      time: "1 giờ trước",
      location: "Hà Nội",
    },
    {
      image:
        "https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg",
      name: "Spicy Chicken Stir-Fry",
      price: "34 triệu/tháng",
      time: "1 giờ trước",
      location: "Hà Nội",
    },
    {
      image:
        "https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg",
      name: "Spicy Chicken Stir-Fry",
      price: "34 triệu/tháng",
      time: "1 giờ trước",
      location: "Hà Nội",
    },
    {
      image:
        "https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg",
      name: "Spicy Chicken Stir-Fry",
      price: "34 triệu/tháng",
      time: "1 giờ trước",
      location: "Hà Nội",
    },
  ];
  const RecipeCard = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
          <p className="text-gray-600 mb-2">{recipe.price}</p>
          <div className="flex items-center mb-2">
            <Clock className="text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{recipe.time}</span>
          </div>
          <div className="flex items-center mb-2"></div>
          <div className="mb-2">
            <h3 className="text-sm font-semibold mb-1">{recipe.location}</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`cursor-pointer ${
                    index < recipe.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={toggleFavorite}
              className={`${
                isFavorite ? "text-red-500" : "text-gray-400"
              } transition-colors duration-300`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <div className="flex">
                {" "}
                <Heart className="text-xl" />
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  aria-label="Share recipe"
                >
                  <Share2 className="text-xl" />
                </button>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>

          {/* screen-lap */}
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
              <p className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                Vui Lòng chọn Hope
              </p>
              <Popover
                open={open}
                onOpenChange={setOpen}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Chọn Sàn Hope"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Lựa chọn Sàn Hope"
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Không có sàn nào được chọn</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === framework.value
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

              {/* menu bar */}
              <Menubar className="flex-col w-full">
                <MenubarMenu>
                  <MenubarTrigger className="w-full text-center">
                    Danh Mục
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <Building className="mr-2" /> Bất động sản
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Mua bán</MenubarItem>
                        <MenubarItem>Cho thuê</MenubarItem>
                        <MenubarItem>Dự án</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <LaptopMinimal className="mr-2" /> Đồ điện tử
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Điện thoại</MenubarItem>
                        <MenubarItem>Máy tính bảng</MenubarItem>
                        <MenubarItem>Laptop</MenubarItem>
                        <MenubarItem>Máy tính để bàn</MenubarItem>
                        <MenubarItem>Máy ảnh, Máy quay</MenubarItem>
                        <MenubarItem>Tivi, Âm thanh</MenubarItem>
                        <MenubarItem>Thiết bị đeo thông minh</MenubarItem>
                        <MenubarItem>
                          Phụ kiện (Màn hình, Chuột,...)
                        </MenubarItem>
                        <MenubarItem>Linh kiện (RAM, Card,...)</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <BriefcaseBusiness className="mr-2" /> Việc làm
                      </MenubarSubTrigger>

                      <MenubarSubContent>
                        <MenubarItem>Bán hàng</MenubarItem>
                        <MenubarItem>Nhân viên phục vụ</MenubarItem>
                        <MenubarItem>Tài xế giao hàng xe máy</MenubarItem>
                        <MenubarItem>Tạp vụ</MenubarItem>
                        <MenubarItem>Pha chế</MenubarItem>
                        <MenubarItem>Phụ bếp</MenubarItem>
                        <MenubarItem>Nhân viên kinh doanh</MenubarItem>
                        <MenubarItem>Công nhân</MenubarItem>
                        <MenubarItem>Nhân viên kho vận</MenubarItem>
                        <MenubarItem>Bảo vệ</MenubarItem>
                        <MenubarItem>Chăm sóc khách hàng</MenubarItem>
                        <MenubarItem>Công việc khác</MenubarItem>
                        <MenubarItem>Xem thêm</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              {/* menu bar */}
              <Menubar className="flex-col w-full">
                <MenubarMenu>
                  <MenubarTrigger className="w-full text-center">
                    Dành cho người bán
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link to="/Post" className="w-full">
                        Đăng tin
                      </Link>
                    </MenubarItem>
                    <MenubarSub>
                      <MenubarItem>
                        <Link to="/packpro" className="w-full">
                          Gói Pro
                        </Link>
                      </MenubarItem>
                    </MenubarSub>
                    <MenubarSub></MenubarSub>
                    <MenubarItem>
                      <Link to="/partner" className="w-full">
                        Dành cho Đối tác
                      </Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <Menubar className="flex-col w-full">
                <MenubarMenu>
                  <MenubarTrigger className="w-full text-center">
                    Thêm
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link
                        to="/contributor"
                        className="py-1 px-1 text-md w-full"
                      >
                        Đóng góp ý kiến
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/download" className="py-1 px-1 text-md w-full">
                        Tải ứng dụng
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/help" className="py-1 px-1 text-md w-full">
                        Trợ giúp
                      </Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </nav>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <p className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  Vui Lòng chọn Hope
                </p>
                <Popover
                  open={openBurger}
                  onOpenChange={setOpenBurger}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openBurger}
                      className="w-full justify-between"
                    >
                      {value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Chọn Sàn Hope"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Lựa chọn Sàn Hope"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Không có sàn nào được chọn</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {framework.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  value === framework.value
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

                {/* menu bar */}
                <Menubar className="flex-col w-full">
                  <MenubarMenu>
                    <MenubarTrigger className="w-full text-center">
                      Danh Mục
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <Building className="mr-2" /> Bất động sản
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>Mua bán</MenubarItem>
                          <MenubarItem>Cho thuê</MenubarItem>
                          <MenubarItem>Dự án</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <LaptopMinimal className="mr-2" /> Đồ điện tử
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>Điện thoại</MenubarItem>
                          <MenubarItem>Máy tính bảng</MenubarItem>
                          <MenubarItem>Laptop</MenubarItem>
                          <MenubarItem>Máy tính để bàn</MenubarItem>
                          <MenubarItem>Máy ảnh, Máy quay</MenubarItem>
                          <MenubarItem>Tivi, Âm thanh</MenubarItem>
                          <MenubarItem>Thiết bị đeo thông minh</MenubarItem>
                          <MenubarItem>
                            Phụ kiện (Màn hình, Chuột,...)
                          </MenubarItem>
                          <MenubarItem>Linh kiện (RAM, Card,...)</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSub>
                        <MenubarSubTrigger>
                          <BriefcaseBusiness className="mr-2" /> Việc làm
                        </MenubarSubTrigger>

                        <MenubarSubContent>
                          <MenubarItem>Bán hàng</MenubarItem>
                          <MenubarItem>Nhân viên phục vụ</MenubarItem>
                          <MenubarItem>Tài xế giao hàng xe máy</MenubarItem>
                          <MenubarItem>Tạp vụ</MenubarItem>
                          <MenubarItem>Pha chế</MenubarItem>
                          <MenubarItem>Phụ bếp</MenubarItem>
                          <MenubarItem>Nhân viên kinh doanh</MenubarItem>
                          <MenubarItem>Công nhân</MenubarItem>
                          <MenubarItem>Nhân viên kho vận</MenubarItem>
                          <MenubarItem>Bảo vệ</MenubarItem>
                          <MenubarItem>Chăm sóc khách hàng</MenubarItem>
                          <MenubarItem>Công việc khác</MenubarItem>
                          <MenubarItem>Xem thêm</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSeparator />
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                {/* menu bar */}
                <Menubar className="flex-col w-full">
                  <MenubarMenu>
                    <MenubarTrigger className="w-full text-center">
                      Dành cho người bán
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Link to="/Post" className="w-full">
                          Đăng tin
                        </Link>
                      </MenubarItem>
                      <MenubarSub>
                        <MenubarItem>
                          <Link to="/packpro" className="w-full">
                            Gói Pro
                          </Link>
                        </MenubarItem>
                      </MenubarSub>
                      <MenubarSub></MenubarSub>
                      <MenubarItem>
                        <Link to="/partner" className="w-full">
                          Dành cho Đối tác
                        </Link>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <Menubar className="flex-col w-full">
                  <MenubarMenu>
                    <MenubarTrigger className="w-full text-center">
                      Thêm
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Link
                          to="/contributor"
                          className="py-1 px-1 text-md w-full"
                        >
                          Đóng góp ý kiến
                        </Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link
                          to="/download"
                          className="py-1 px-1 text-md w-full"
                        >
                          Tải ứng dụng
                        </Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link to="/help" className="py-1 px-1 text-md w-full">
                          Trợ giúp
                        </Link>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                {/* burger */}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8  ">
            <Link to="/message">
              <MessageCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8  ">
            <Link to="/myads">
              <PackagePlus className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto 8 rounded-full"
          >
            <Bell className="h-4 w-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Bell />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    Thông báo 1
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto 8 rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ShoppingCart />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    Đã mua
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="top">
                    Đã bán
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full ">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quản Lý đơn hàng</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Đơn Mua </DropdownMenuItem>
              <DropdownMenuItem>Đơn Bán</DropdownMenuItem>
              <DropdownMenuItem>Ví Bán Hàng</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Tiện ích</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Tin đăng đã lưu </DropdownMenuItem>
              <DropdownMenuItem>Tìm kiếm đã lưu</DropdownMenuItem>
              <DropdownMenuItem>Đánh giá từ tôi</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Dịch vụ trả phí</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Lịch sử giao dịch</DropdownMenuItem>
              <DropdownMenuItem>Kênh đối tác</DropdownMenuItem>
              <DropdownMenuItem>Cửa hàng / chuyên trang</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuLabel>Ưu đãi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hope ưu đãi</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/Post">
            <Button>
              {" "}
              <SquareArrowOutUpRight className="mr-2" /> Đăng tin
            </Button>
          </Link>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Khám phá danh mục
            </h1>
          </div>
          <div
            className="flex  rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center w-full">
              <div className="container mx-auto px-4 py-8 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center  rounded-lg  overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                      tabIndex={0}
                    >
                      <div className="w-[84px] h-[84px] relative rounded-lg">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={`Item ${item.id}`}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                              e.target.className =
                                "w-full h-full flex items-center justify-center bg-gray-200";
                              e.target.parentNode.innerHTML = "";
                              const placeholder = document.createElement("div");
                              placeholder.className =
                                "w-full h-full flex items-center justify-center bg-gray-200";
                              const icon = document.createElement("div");
                              icon.className = "text-gray-400 text-4xl";
                              icon.innerHTML = `<FaImage />`;
                              placeholder.appendChild(icon);
                              e.target.parentNode.appendChild(placeholder);
                            }}
                          />
                        </Link>
                      </div>
                      <p className="text-center p-4 text-gray-700 font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="container mx-auto px-4 py-8 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center  rounded-lg  overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                      tabIndex={0}
                    >
                      <div className="w-[84px] h-[84px] relative rounded-lg">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={`Item ${item.id}`}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                              e.target.className =
                                "w-full h-full flex items-center justify-center bg-gray-200";
                              e.target.parentNode.innerHTML = "";
                              const placeholder = document.createElement("div");
                              placeholder.className =
                                "w-full h-full flex items-center justify-center bg-gray-200";
                              const icon = document.createElement("div");
                              icon.className = "text-gray-400 text-4xl";
                              icon.innerHTML = `<FaImage />`;
                              placeholder.appendChild(icon);
                              e.target.parentNode.appendChild(placeholder);
                            }}
                          />
                        </Link>
                      </div>
                      <p className="text-center p-4 text-gray-700 font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Tin đăng mới</h1>
          </div>
          <div
            className="flex  rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default HomePage;
