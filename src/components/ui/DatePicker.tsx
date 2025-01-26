import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

export function DatePicker(props: {
  width?: number | string;
  height?: number | string;
  date?: Date | null;
  setDate?: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !props.date && "text-muted-foreground",
            props.width && `w-[${props.width}px]`,
            props.height && `h-[${props.height}px]`
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {props.date ? (
            <span>{format(props.date, "d MMM yy")}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none w-auto shadow-none">
        <Calendar
          mode="single"
          selected={props.date!}
          onSelect={(e) => props.setDate?.(e ? e : props.date!)}
          initialFocus
          className="date-picker-calendar bg-black rounded-md w-fit border z-50 mx-20 mb-20"
        />
      </PopoverContent>
    </Popover>
  );
}
