import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface PostItemProps {
  id: string;
  onHiddenToggle: (
    id: string,
    isHidden: boolean
  ) => Promise<{ status: string; message: string }>;
}

export function PostItem({ id, onHiddenToggle }: PostItemProps) {
  // Lấy trạng thái từ localStorage nếu có
  const [isHidden, setIsHidden] = useState<boolean>(() => {
    const savedState = localStorage.getItem(id);
    return savedState === 'true'; // Nếu có dữ liệu trong localStorage, sử dụng giá trị đó
  });

  // Cập nhật trạng thái vào localStorage khi isHidden thay đổi
  useEffect(() => {
    localStorage.setItem(id, isHidden.toString());
  }, [id, isHidden]);

  const handleHiddenToggle = async () => {
    try {
      const response = await onHiddenToggle(id, isHidden);
      if (response.status === 'success') {
        setIsHidden(!isHidden); // Chuyển trạng thái ẩn/hiển thị
        toast.success(response.message);
      } else {
        toast.error('Thao tác không thành công');
      }
    } catch (error) {
      console.error('Error toggling post visibility:', error);
      toast.error('Có lỗi xảy ra khi thực hiện thao tác');
    }
  };

  return (
    <button
      className={`text-white px-6 py-2 rounded-lg transition-colors ${
        isHidden
          ? 'bg-yellow-600 hover:bg-yellow-700'
          : 'bg-green-600 hover:bg-green-700'
      }`}
      onClick={handleHiddenToggle}
    >
      {isHidden ? 'Gỡ bỏ ẩn tin' : 'Ẩn tin'}
    </button>
  );
}
