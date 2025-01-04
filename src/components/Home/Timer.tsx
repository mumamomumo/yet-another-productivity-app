import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Pencil } from "lucide-react";
import EditTimerButton from "../ui/EditTimerButton";
import { SquareArrowOutUpRight, SquareArrowOutDownLeft } from "lucide-react";
import { Checkbox } from "../ui/Checkbox";
import { useTimerStore } from "@/store/TimerStore";

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

const breakTimeId = "breakTime";
const workTimeId = "workTime";
const pomodoroCountId = "pomodoroCount";

function Timer(props: { setFocus: Function; focusTimer: boolean }) {
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
      console.log("paused");
      setPomodoriLeft(pomodori);
    }
    console.log("Pomoorod");
  }, [pomodori]);

  //Function to handle the pomodoro timer
  const handlePomodoroTimer = () => {
    useTimerStore.setState((state) => {
      const { timer, onBreak, pomodoriLeft } = state;
      if (timer <= 0) {
        if (onBreak) {
          return {
            timer: workTime * 60,
            onBreak: false,
          };
        } else {
          return {
            timer: breakTime * 60,
            onBreak: true,
            pomodoriLeft: pomodoriLeft - 1,
          };
        }
      }

      return { timer: timer - 1 };
    });
  };

  // Pausing and unpausing the timer
  var interval: NodeJS.Timeout;
  useEffect(() => {
    if (!paused) {
      setPomodoriLeft(pomodori);
      interval = setInterval(handlePomodoroTimer, 1000);
    } else {
      console.log("clear");
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [paused]);

  // Reset button function
  const resetTime = () => {
    setPaused(true);
    setOnBreak(false);
    setTimer(workTime * 60);
    setPomodoriLeft(pomodori);
  };

  return (
    <div className={"timer-component" + " " + (onBreak ? "on-break" : "")}>
      <div className="flex justify-between px-5">
        {/* Set focus */}
        {/* {props.focusTimer ? (
          <>
            <Checkbox />
            <SquareArrowOutDownLeft
              className="cursor-pointer"
              onClick={() => props.setFocus(false)}
            />
          </>
        ) : (
          <>
            <div />
            <SquareArrowOutUpRight
              className="cursor-pointer"
              onClick={() => props.setFocus(true)}
            />
          </>
        )} */}
        
      </div>
      <div className="timer text-center py-2">
        <p className="timer-text-break">{onBreak ? "Break" : "Session"}</p>
        <span className="timer-text-time text-7xl">{formatTime(timer)}</span>
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
