import { Task, useTaskStore } from "@/store/TaskStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import DropdownMenu from "../ui/DropdownMenu";

function AddTaskComponent(props: {
  editTask?: Task;
  setRightPanelActive?: (value: boolean) => void;
}) {
  const { addTask, setEditingTask, freeUpdateTask } = useTaskStore();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [status, setStatus] = useState<Task["status"]>("todo");

  useEffect(() => {
    if (props.editTask) {
      titleRef.current!.value = props.editTask.title;
      descriptionRef.current!.value = props.editTask.description || "";
      setPriority(props.editTask.priority);
      setStatus(props.editTask.status);
    } else {
      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
      setPriority("low");
      setStatus("todo");
    }
  }, [props.editTask]);

  const handleSubmitTask = (e: FormEvent) => {
    e.preventDefault();
    if (props.editTask) {
      freeUpdateTask(props.editTask.id, {
        title: titleRef.current!.value,
        description: descriptionRef.current!.value,
        priority: priority,
        status: status,
      } as Task);

      setEditingTask(undefined);
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: titleRef.current!.value,
        description: descriptionRef.current!.value,
        priority: priority,
        status: status,
      };

      addTask(newTask);
    }

    titleRef.current!.value = "";
    descriptionRef.current!.value = "";
    setPriority("low");
    setStatus("todo");
  };

  const closeMenu = () => {
    props.setRightPanelActive && props.setRightPanelActive(false);
    setEditingTask(undefined);
  };

  return (
    <div className="add-task px-4 py-2 h-full w-full rounded-md">
      <div className="flex w-full items-center justify-between">
        <div />
        <h1 className="text-3xl text-center">
          {props.editTask ? "Edit Task" : "Add Task"}
        </h1>
        <div>
          <ChevronRight
            onClick={closeMenu}
            className="cursor-pointer right-task-close"
          />
        </div>
      </div>
      <form className="flex flex-col py-5 gap-5" onSubmit={handleSubmitTask}>
        <input
          ref={titleRef}
          defaultValue={props.editTask?.title}
          placeholder="Task Name"
          required
        />
        <textarea
          ref={descriptionRef}
          defaultValue={props.editTask?.description}
          placeholder="Description"
          className=" h-40"
        />
        <div className="w-full">
          <div className="flex justify-between w-full px-3">
            <DropdownMenu
              values={["low", "medium", "high"]}
              setVar={setPriority}
              default={priority}
              className="w-1/3"
            />
            <DropdownMenu
              values={["todo", "done"]}
              setVar={setStatus}
              default={status}
              className="w-1/3"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="task-list-add-button max-w-[200px]">
            {props.editTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskComponent;
