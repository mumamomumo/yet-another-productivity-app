import { Task, useTaskStore } from "@/store/TaskStore";
import { TaskItem } from "./TaskItem";
import { setPage } from "@/store/PageStore";
import { saveTasks } from "@/data/TaskData";
import { useEffect } from "react";
function TaskList(props?: {
  className?: string;
  handleAddTask?: Function;
  setEditingTask?: Function;
}) {
  const { tasks, updateTask, deleteTask, setEditingTask } = useTaskStore();

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const handleAddtask = () => {
    setEditingTask(undefined);
    setPage("tasks", { addTask: true });
  };
  const handleOpenTask = (task: Task) => {
    setEditingTask(task);
    setPage("tasks", { addTask: false });
  };

  return (
    <div className={props?.className ?? ""}>
      <div className="h-full text-center px-2 py-4 col-start-1">
        <h1 className="task-list-title text-3xl pb-4">Tasks</h1>
        <div className="task-list-items h-[80%] overflow-scroll gap-2">
          {tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task!}
                updateTask={updateTask}
                deleteTask={deleteTask}
                setEditingTask={handleOpenTask}
              />
            );
          })}
        </div>
        <div>
          <button
            onClick={() =>
              props?.handleAddTask ? props.handleAddTask() : handleAddtask()
            }
            className="task-list-add-button max-w-max"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
