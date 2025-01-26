// Hooks
import { useEffect, useState, Fragment } from "react";
import { EventType, useEventStore } from "@/store/Eventstore";
import { useSettingsStore } from "@/store/GeneralSettings";

//  UI
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import CustomCheckbox from "../ui/CustomCheckbox";
import { DatePicker } from "../ui/DatePicker";

//  Utils
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { saveEvents } from "@/data/TasksAndEventsData";
import EventItem from "../Calendar/EventItem";

function Calendar() {
  const [showWeekends, setShowWeekends] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleDays, setVisibleDays] = useState(3);
  const { events, addEvent, deleteEvent, updateEvent } = useEventStore();
  const { clearEvents } = useSettingsStore().settings;
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Refresh every 12 hours
  useEffect(() => {
    const refreshDate = setInterval(() => {
      setTime(new Date());
    }, 4320000);
    return () => clearInterval(refreshDate);
  }, []);

  // Set visible days with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setVisibleDays(1);
      } else if (window.innerWidth < 900) {
        setVisibleDays(3);
      } else {
        setVisibleDays(showWeekends ? 7 : 5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showWeekends]);

  // Save events on change
  useEffect(() => {
    saveEvents();
  }, [events]);

  // Clear old events
  useEffect(() => {
    if (clearEvents) {
      clearCompletedEvents();
    }
  }, []);

  const formatHour = (hour: number) => {
    if (hour === 0) return "12:00am.";
    if (hour === 12) return "12:00pm.";
    return `${hour > 12 ? hour - 12 : hour}:00${hour >= 12 ? "pm" : "am."}`;
  };

  const handleChangeSelected = (date: Date) => {
    setSelectedDate(date);
    setTime(new Date(selectedDate.setDate(date.getDate())));
  };

  // Event store
  const handleAddEvent = (time: number, date: Date) => {
    addEvent({
      name: `Test at ${formatHour(time)} on ${format(
        new Date().setDate(date.getDate()),
        "EEE"
      )}`,
      id: uuidv4(),
      start: {
        date: date.getDate().toString() + date.getMonth() + date.getFullYear(),
        hour: time,
      },
    });
  };
  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
  };
  const handleUpdateEvent = (id: string, event: Partial<EventType>) => {
    updateEvent(id, event);
  };
  //// Clear old events
  const clearCompletedEvents = () => {
    events.filter((eventItem) => {
      if (
        eventItem.start.date <
        new Date().getDate().toString() +
          new Date().getMonth() +
          new Date().getFullYear()
      ) {
        deleteEvent(eventItem.id);
      }
    });
  };

  // Common code into functions
  //// Convert column time to full time
  const toDay = (time: Date, index: number) => {
    return new Date(
      new Date(
        new Date(new Date().setDate(time.getDate() + index)).setMonth(
          time.getMonth()
        )
      ).setFullYear(time.getFullYear())
    );
  };
  //// Compare dates
  const compareDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  //// Get events for day
  const getEventsForDay = (hour: number, date: string) => {
    return events.filter((event) => {
      return event.start.date === date && event.start.hour === hour;
    });
  };

  const gridColsClass = {
    1: "grid grid-cols-[50px_repeat(1_1fr)]",
    3: cn("grid grid-cols-[25px_repeat(3_1fr)]"),
    5: " grid grid-cols-[25px_repeat(5_1fr)]",
    7: " grid grid-cols-[25px_repeat(7_1fr)]",
  }[visibleDays];

  return (
    <div className="calendar page flex-col gap-2 w-full">
      <div className="calendar-controls flex justify-between items-center">
        <div className="calendar-nav flex items-center gap-1 flex-1">
          <button
            onClick={() =>
              setTime(new Date(time.setDate(time.getDate() - visibleDays)))
            }
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
          <DatePicker
            date={selectedDate}
            setDate={handleChangeSelected}
            width={200}
          />
          <button
            onClick={() => setTime(new Date(time.setDate(time.getDate() + 1)))}
            className="p-1 rounded-md"
          >
            <ChevronRight />
          </button>
          <button
            onClick={() =>
              setTime(new Date(time.setDate(time.getDate() + visibleDays)))
            }
            className="p-1 rounded-md"
          >
            <ChevronsRight />
          </button>
        </div>
        <h1 className="flex-1 text-center pt-2 underline ">
          {format(time, "MMMM")}
        </h1>
        <div className="flex-1 flex justify-end items-center">
          <CustomCheckbox
            checked={showWeekends}
            onCheckChanged={setShowWeekends}
          />
        </div>
      </div>

      <div className={cn("calendar-grid gap-x-2", gridColsClass, "")}>
        {/* Calendar column titles */}
        <div className="calendar-header contents *:border-2 *:rounded-t-md">
          <h1 className="col-start-1 row-start-1 px-2">Time</h1>
          {Array.from({ length: visibleDays }).map((_, index) => {
            const isToday = compareDay(toDay(time, index), new Date());
            return (
              <Fragment key={index}>
                <div
                  key={index}
                  className={cn(
                    "row-start-1 px-2 w-full",
                    "col-start-" + index + 1,
                    isToday && "date-today"
                  )}
                >
                  <p className="w-fit">
                    {format(new Date().setDate(time.getDate() + index), "d")}
                  </p>
                  <p className="w-fit">
                    {format(new Date().setDate(time.getDate() + index), "EEEE")}
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>
        {/* Calendar rows */}
        <div className="contents last:border-b-2 w-full">
          {hours.map((hour, hour_index, array) => {
            return (
              <div
                key={hour}
                className={cn(
                  "calendar-row w-full",
                  "contents *:border-x-2",
                  "row-start-" + hour_index + 1
                )}
              >
                {/* Time column */}
                <p
                  className={cn(
                    "h-full  min-h-[70px] pl-2 border-t-2 place-content-center col-start-1",
                    "hour-" + hour,
                    "row-start-" + hour_index + 1,
                    hour_index === array.length - 1 ? "border-b-2" : ""
                  )}
                >
                  {formatHour(hour)}
                </p>
                {/* Calendar column cells */}
                {/* Days column */}
                {Array.from({ length: visibleDays }).map((_, index) => {
                  const isSelected = compareDay(
                    selectedDate,
                    toDay(time, index)
                  );
                  const day = toDay(time, index);
                  const events = getEventsForDay(
                    hour,
                    day.getDate().toString() +
                      day.getMonth() +
                      day.getFullYear()
                  );
                  console.log(events);
                  return (
                    <div
                      key={index}
                      className={cn(
                        "calendar-button border-y w-full overflow-y-scroll flex flex-col overflow-x-hidden",
                        "col-start-" + index + 1,
                        hour_index === array.length - 1 && "border-b-2",
                        isSelected && "date-selected"
                      )}
                    >
                      {/* Event */}
                      {events.map((eventItem) => (
                        <EventItem
                          key={eventItem.id}
                          event={eventItem}
                          deleteEvent={handleDeleteEvent}
                          updateEvent={handleUpdateEvent}
                        />
                      ))}
                      <button
                        className="flex-1 place-items-center flex justify-center group"
                        onClick={() => {
                          handleAddEvent(hour, toDay(time, index));
                        }}
                      >
                        <Plus className="opacity-0 group-hover:opacity-100 duration-200" />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
