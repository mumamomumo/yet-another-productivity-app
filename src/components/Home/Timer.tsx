import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Pencil } from "lucide-react";
import EditTimerButton from "../ui/EditTimerButton";
import { useTimerStore } from "@/store/TimerStore";

function formatTime(time: number) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - hours * 60);
  const seconds = time % 60;
  if (hours === 0)
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  else
    return `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

function formatTotalTime(time: number) {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - hours * 60);
  if (hours === 0) return `${minutes.toString().padStart(2, "0")}m`;
  else return `${hours.toString()}h ${minutes.toString().padStart(2, "0")}m`;
}

const breakTimeId = "breakTime";
const workTimeId = "workTime";
const pomodoroCountId = "pomodoroCount";

function Timer() {
  const {
    paused,
    setPaused,
    timer,
    setTimer,
    editingTime,
    setEditingTime,
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    pomodori,
    setPomodori,
    pomodoriLeft,
    setPomodoriLeft,
    onBreak,
    setOnBreak,
  } = useTimerStore();
  const [showWarning, setShowWarning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  // Update timer on time change
  useEffect(() => {
    if (paused) {
      if (onBreak) setTimer(breakTime * 60);
      else {
        if (workTime > 90) setShowWarning(true);
        setTimer(workTime * 60);
      }
    }
  }, [breakTime, workTime]);

  // Change the pomodoroLeft when pomodoroCount is changed
  useEffect(() => {
    if (paused) {
      setPomodoriLeft(pomodori);
    }
  }, [pomodori]);

  useEffect(() => {
    const timeWorking = workTime * 60;
    const timeBreak = breakTime * 60;
    const totalTime = timeWorking * pomodori + timeBreak * pomodori;
    setTotalTime(totalTime);
  }, [pomodori, workTime, breakTime]);

  // Reset button function
  const resetTime = () => {
    setPaused(true);
    setOnBreak(false);
    setTimer(workTime * 60);
    setPomodoriLeft(pomodori);
  };

  return (
    <div
      className={"timer-component w-full" + " " + (onBreak ? "on-break" : "")}
    >
      <div className="timer text-center py-2 w-full">
        <p className="timer-text-break">{onBreak ? "Break" : "Session"}</p>
        <p className="timer-text-time w-full">{formatTime(timer)}</p>
        <p>Pomodoro left: {pomodoriLeft}</p>
        {showWarning ? (
          <p
            className="timer-warning cursor-pointer"
            onClick={() => {
              setShowWarning(false);
            }}
          >
            Sessions greater than 90 minutes are not recommended
          </p>
        ) : null}
        {paused && <p>Total time: {formatTotalTime(totalTime)}</p>}
      </div>
      <div className="timer-controls w-full flex justify-around">
        <button
          onClick={() => {
            setPaused(!paused);
          }}
          className="timer-pause"
        >
          {paused ? <Play /> : <Pause />}
        </button>
        <button
          onClick={() => setEditingTime(!editingTime)}
          className="timer-edit"
        >
          <Pencil />
        </button>
        <button className="timer-restart" onClick={resetTime}>
          <RotateCcw />
        </button>
      </div>
      {editingTime ? (
        <div className="px-2 pt-5">
          <hr />
          <EditTimerButton
            text="Break"
            value={breakTime}
            setValue={setBreakTime}
            size={20}
            min={1}
            max={90}
            saveId={breakTimeId}
          />
          <hr />
          <EditTimerButton
            value={workTime}
            setValue={setWorkTime}
            size={20}
            text="Work"
            min={1}
            max={90}
            setShowWarning={setShowWarning}
            saveId={workTimeId}
          />
          <hr />
          <EditTimerButton
            value={pomodori}
            setValue={setPomodori}
            size={20}
            text="Pomodoro"
            min={1}
            saveId={pomodoroCountId}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Timer;
