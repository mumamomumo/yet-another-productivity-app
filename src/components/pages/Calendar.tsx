import { useEffect, useState } from "react";
import DayColumn from "../Calendar/DayColumn";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import CustomCheckbox from "../ui/CustomCheckbox";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Calendar() {
  const [showWeekends, setShowWeekends] = useState(false);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const refreshDate = setInterval(() => {
      setTime(new Date());
    }, 43200000);
    return () => clearInterval(refreshDate);
  });

  return (
    <div className="calendar page flex-col gap-2 overflow-x-scroll w-full">
      <div className="calendar-controls flex justify-between items-center">
        <div className="calendar-nav flex">
          <button
            onClick={() => setTime(new Date(time.setDate(time.getDate() - 7)))}
            className="p-1 rounded-md"
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={() => setTime(new Date(time.setDate(time.getDate() - 1)))}
            className="p-1 rounded-md"
          >
            <ChevronLeft />
          </button>
          <input type="date" />
          <button
            onClick={() => setTime(new Date(time.setDate(time.getDate() + 1)))}
            className="p-1 rounded-md"
          >
            <ChevronRight />
          </button>
          <button
            onClick={() => setTime(new Date(time.setDate(time.getDate() + 7)))}
            className="p-1 rounded-md"
          >
            <ChevronsRight />
          </button>
        </div>
        <div>
          <CustomCheckbox
            checked={showWeekends}
            onCheckChanged={setShowWeekends}
          />
        </div>
      </div>
      <div className="calendar-days flex flex-1 panel w-full justify-between gap-2">
        <div className="calendar-time w-[50px]"></div>
        {Array.from({ length: 7 }).map((_, i) => {
          return (
            <div
              className={`
                *:flex-1
               ${i != 0 && "hidden"}
               ${i == 0 && "contents"}
               ${i != 0 && i < 3 && "min-[500px]:contents"}
               ${i >= 3 && (i < 5 || showWeekends) && "min-[900px]:contents"}
                `}
              key={i}
            >
              <DayColumn
                day={days[(i + time.getDay()) % 7]}
                date={time.getDate() + i + "/" + (time.getMonth() + 1)}
                isToday={
                  time.getDate() + i === new Date().getDate() &&
                  time.getMonth() === new Date().getMonth()
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
