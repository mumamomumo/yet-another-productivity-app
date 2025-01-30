import { useState, useEffect } from "react";

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
      <div
        className="flex top-clock gap-4 items-center justify-center back"
        data-tauri-drag-region
      >
        <h1 className="time pt-1" data-tauri-drag-region>
          {hours}:{minutes}:{seconds}
        </h1>
        {!props.hideDate && (
          <h1 className="date pt-1" data-tauri-drag-region>
            {time.toDateString()}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Clock;
