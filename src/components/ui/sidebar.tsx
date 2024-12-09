import { Link } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Building,
  LaptopMinimal,
  Package2,
} from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
const frameworks = [
  {
    value: 'Hope',
    label: 'Hope',
  },
  {
    value: 'nhatot',
    label: 'Nhà Hope',
  },
  {
    value: 'Xe Hope',
    label: 'Xe Hope',
  },
  {
    value: 'Việc Hope',
    label: 'Việc Hope',
  },
];
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
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
} from '@/components/ui/menubar';
import { useState } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
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
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Chọn Sàn Hope'}
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
                        <Link to={`/${framework.value}`}>
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? '' : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                value === framework.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        </Link>
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
                      <MenubarItem>
                        <Link to="/dang-tin?category=1020" className="w-full">
                          Nhà ở
                        </Link>
                      </MenubarItem>
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
                    {/* side bar */}
                    <Link to="/dang-tin" className="w-full">
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
  );
};

export default Sidebar;
