import { Link } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  Building,
  CircleUser,
  LaptopMinimal,
  Menu,
  MessageCircle,
  Package2,
  PackagePlus,
  Search,
  ShoppingCart,
  SquareArrowOutUpRight,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
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
import { useState } from "react";

import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const Header = () => {
  const [openBurger, setOpenBurger] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [position, setPosition] = useState("bottom");
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
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
                      <Link to="/nhatot" className="w-full">
                        <MenubarItem>Mua bán</MenubarItem>
                      </Link>
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
                      <MenubarItem>Phụ kiện (Màn hình, Chuột,...)</MenubarItem>
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <PackagePlus className="h-4 w-4" />
            <BreadcrumbLink href="/myads">Quản lý tin đăng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              Thông báo 1
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Đã mua</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Đã bán</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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

      {/* header */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            {" "}
            <SquareArrowOutUpRight className="mr-2" /> Đăng tin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đăng tin</DialogTitle>
            <DialogDescription>TIẾP TỤC VỚI TIN NHÁP</DialogDescription>
          </DialogHeader>
          <DialogHeader>
            <DialogTitle>CHỌN DANH MỤC</DialogTitle>
          </DialogHeader>
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
                    <MenubarItem>
                      <Link to="/dang-tin?category=1010" className="w-full">
                        Căn hộ/Chung cư
                      </Link>
                    </MenubarItem>

                    <MenubarItem>
                      <Link to="/dang-tin?category=1020" className="w-full">
                        Nhà ở
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/dang-tin?category=1030" className="w-full">
                        Đất
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/dang-tin?category=1040" className="w-full">
                        Văn phòng, Mặt bằng kinh doanh
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to="/dang-tin?category=1050" className="w-full">
                        Phòng trọ
                      </Link>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <LaptopMinimal className="mr-2" /> Đồ điện tử
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <Link to="/dang-tin?category=1060" className="w-full">
                      <MenubarItem>Điện thoại</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1070" className="w-full">
                      <MenubarItem>Máy tính bảng</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1080" className="w-full">
                      <MenubarItem>Laptop</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1090" className="w-full">
                      <MenubarItem>Máy tính để bàn</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1100" className="w-full">
                      <MenubarItem>Máy ảnh, Máy quay</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1110" className="w-full">
                      <MenubarItem>Tivi, Âm thanh</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1120" className="w-full">
                      <MenubarItem>Thiết bị đeo thông minh</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1130" className="w-full">
                      <MenubarItem>Phụ kiện (Màn hình, Chuột,...)</MenubarItem>
                    </Link>
                    <Link to="/dang-tin?category=1140" className="w-full">
                      <MenubarItem>Linh kiện (RAM, Card,...)</MenubarItem>
                    </Link>
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};
export default Header;
