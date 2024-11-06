import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlot {
  id: string;
  name: string;
}

interface MultiSelectProps {
  data: TimeSlot[];
  onChange?: (selectedValues: string[]) => void;
}

export function MultiSelect({ data, onChange }: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueChange = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  return (
    <Select value={selectedValues} onValueChange={handleValueChange} multiple>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select times">
          {selectedValues.length > 0
            ? `${selectedValues.length} khung giờ đã chọn`
            : "Chọn khung giờ"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className={selectedValues.includes(item.id) ? "bg-primary/10" : ""}
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
