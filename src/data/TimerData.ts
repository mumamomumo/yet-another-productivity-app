import { useTimerStore } from "@/store/TimerStore";

const workTimeId = "workTime";
const breakTimeId = "breakTime";
const pomodoroCountId = "pomodoroCount";
export function saveTimerData() {}

export function loadTimerData() {
  const savedWorkTime = localStorage.getItem(workTimeId);
  const savedBreakTime = localStorage.getItem(breakTimeId);
  const savedPomodoroCount = localStorage.getItem(pomodoroCountId);

  if (savedWorkTime)
    useTimerStore.setState({ workTime: parseInt(savedWorkTime) });
  if (savedBreakTime)
    useTimerStore.setState({ breakTime: parseInt(savedBreakTime) });
  if (savedPomodoroCount)
    useTimerStore.setState({ pomodori: parseInt(savedPomodoroCount) });
}
