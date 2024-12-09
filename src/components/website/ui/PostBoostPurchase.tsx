import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { toast } from 'sonner';

interface PostBoostPurchaseProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

export function PostBoostPurchase({
  isOpen,
  onClose,
  onPurchase,
}: PostBoostPurchaseProps) {
  const [amount, setAmount] = useState(1);

  const handlePurchase = () => {
    if (amount > 0 && amount <= 5) {
      onPurchase(amount);
      onClose();
    } else {
      toast.error('Số lượt mua phải từ 1 đến 5');
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Mua thêm lượt đẩy tin</DrawerTitle>
          <DrawerDescription>
            Bạn có muốn mua thêm lượt đẩy tin không?
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Label htmlFor="amount">Số lượt mua (tối đa 5 lượt)</Label>
          <Input
            id="amount"
            type="number"
            min={1}
            max={5}
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            className="mt-2"
          />
        </div>
        <DrawerFooter>
          <Button onClick={handlePurchase}>Mua ngay</Button>
          <DrawerClose asChild>
            <Button variant="outline">Hủy</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
