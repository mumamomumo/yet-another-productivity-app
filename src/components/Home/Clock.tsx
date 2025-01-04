import { useState, useEffect } from "react";

export function formatDate(date: Date): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

function Clock(props: { className?: string; hideDate?: boolean }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className={props.className} data-tauri-drag-region>
      <div className="clock text-center max-h-min w-full" data-tauri-drag-region>
        <div className="flex top-clock gap-4" data-tauri-drag-region>
          <h1 className="time pt-1">
            {hours}:{minutes}:{seconds}
          </h1>
          {!props.hideDate && <h1 className="date pt-1">{formatDate(time)}</h1>}
        </div>
      </div>
    </div>
  );
}

export default Clock;
