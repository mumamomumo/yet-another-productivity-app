import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  order?: number;
};

type TaskStore = {
  tasks: Task[];
  editingTask?: Task;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, status: Task["status"]) => void;
  freeUpdateTask: (id: string, task: Task) => void;
  setEditingTask: (task: Task | undefined) => void;
};

export const useTaskStore = create<TaskStore>((set) => {
  return {
    tasks: [],
    // Adding a task
    addTask: (task: Task) => {
      set((state) => {
        task.order = state.tasks.length;
        return {
          ...state,
          tasks: [...state.tasks, task],
        };
      });
    },
    // Deleting a task
    deleteTask: (id: string) => {
      set((state) => {
        const updatedTask = state.tasks.filter((task) => task.id !== id);
        return {
          ...state,
          tasks: updatedTask,
        };
      });
    },
    // Changing a task directly
    freeUpdateTask: (id: string, newTask: Task) => {
      set((state) => {
        newTask.id = id;
        newTask.order = state.tasks.find((task) => task.id === id)!.order;
        const updatedTask = state.tasks.map((task) =>
          task.id === newTask.id ? newTask : task
        );
        return {
          ...state,
          tasks: updatedTask,
        };
      });
    },
    // Changing the state of a task
    updateTask: (id: string, status: Task["status"]) => {
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, status } : task
        );
        return {
          ...state,
          tasks: updatedTasks,
        };
      });
    },
    setEditingTask: (task: Task | undefined) => {
      set((state) => {
        return {
          ...state,
          editingTask: task,
        };
      });
    },
  };
});
