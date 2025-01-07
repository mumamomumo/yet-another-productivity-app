import { useTaskStore } from "@/store/TaskStore";


export function saveTasks() {
  const tasks = useTaskStore.getState().tasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) useTaskStore.setState({ tasks: JSON.parse(tasks) });
}