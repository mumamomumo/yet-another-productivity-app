import { create } from "zustand";

interface TimerState {
  paused: boolean;
  timer: number;
  editingTime: boolean;
  workTime: number;
  breakTime: number;
  pomodori: number;
  pomodoriLeft: number;
  onBreak: boolean;
  setPaused: (paused: boolean) => void;
  setTimer: (timer: number) => void;
  setEditingTime: (editingTime: boolean) => void;
  setWorkTime: (workTime: number) => void;
  setBreakTime: (breakTime: number) => void;
  setPomodori: (pomodori: number) => void;
  setPomodoriLeft: (pomodoriLeft: number) => void;
  setOnBreak: (onBreak: boolean) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  paused: true,
  timer: 0,
  editingTime: false,
  workTime: 25,
  breakTime: 5,
  pomodori: 1,
  pomodoriLeft: 1,
  onBreak: false,
  setPaused: (paused) => set({ paused }),
  setTimer: (timer) => set({ timer }),
  setEditingTime: (editingTime) => set({ editingTime }),
  setWorkTime: (workTime) => set({ workTime }),
  setBreakTime: (breakTime) => set({ breakTime }),
  setPomodori: (pomodori) => set({ pomodori, pomodoriLeft: pomodori }),
  setPomodoriLeft: (pomodoriLeft) => set({ pomodoriLeft }),
  setOnBreak: (onBreak) => set({ onBreak }),
}));
