import { useTaskStore } from "@/store/TaskStore";
import { useEventStore } from "@/store/Eventstore";

export function saveTasks() {
  const tasks = useTaskStore.getState().tasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) useTaskStore.setState({ tasks: JSON.parse(tasks) });
}

export function saveEvents() {
  const events = useEventStore.getState().events;
  localStorage.setItem("events", JSON.stringify(events));
}

export function loadEvents() {
  const events = localStorage.getItem("events");
  if (events) useEventStore.setState({ events: JSON.parse(events) });
}
