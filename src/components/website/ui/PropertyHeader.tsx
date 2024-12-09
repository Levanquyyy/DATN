import { Badge } from '@/components/ui/badge';

interface PropertyHeaderProps {
  data: {
    status: number;
  };
}

export function PropertyHeader({ data }: PropertyHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6  ">
      <h1 className="text-3xl font-bold">Property Information</h1>
      {data.status === 0 ? (
        <Badge variant="destructive">Đã bán</Badge>
      ) : (
        <Badge variant="default">Còn trống</Badge>
      )}
    </div>
  );
}
