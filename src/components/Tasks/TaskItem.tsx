import { Task } from "@/store/TaskStore";
import { useEffect, useState } from "react";
import { Trash, CircleAlert, TriangleAlert, OctagonAlert } from "lucide-react";
import CustomCheckbox from "../ui/CustomCheckbox";

export function TaskItem(props: {
  task: Task;
  updateTask: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
  setEditingTask: (task: Task) => void;
}) {
  const [isCompleted, setIsCompleted] = useState(props.task.status === "done");
  const [showDescription, setShowDescription] = useState(false);
  useEffect(
    () => props.updateTask(props.task.id, isCompleted ? "done" : "todo"),
    [isCompleted]
  );

  return (
    <div
      className={
        "task-item panel max-w-full min-w-[50px] p-2 my-2" +
        " " +
        (isCompleted ? "complete" : "")
      }
    >
      <div className="flex rounded-md items-center justify-around gap-3">
        <CustomCheckbox
          checked={isCompleted}
          onCheckChanged={(value) => setIsCompleted(value)}
        />
        <div className="justify-items-start ">
          <p
            className={
              "task-item-title text-start hover:underline max-w-[15vw]" +
              " " +
              (isCompleted ? "line-through" : "") +
              " " +
              (showDescription ? "cursor-alias " : "cursor-help")
            }
            onClick={() => setShowDescription(!showDescription)}
            onDoubleClick={() => props.setEditingTask(props.task)}
          >
            {props.task.title}
          </p>
        </div>
        <div className="flex gap-2">
          {props.task.priority === "low" ? (
            <CircleAlert className="circle-alert" />
          ) : props.task.priority === "medium" ? (
            <TriangleAlert className="triangle-alert" />
          ) : props.task.priority === "high" ? (
            <OctagonAlert className="octagon-alert" />
          ) : null}
          <div className="task-item-actions">
            <button onClick={() => props.deleteTask(props.task.id)}>
              <Trash color={isCompleted ? "red" : undefined} />
            </button>
          </div>
        </div>
      </div>
      {showDescription ? (
        <p
          className={
            "task-item-description w-full pb-5 p-2 hover:cursor-pointer" +
            " " +
            (showDescription ? "show" : "hidden")
          }
          onClick={() => setShowDescription(!showDescription)}
        >
          {props.task.description}
        </p>
      ) : null}
    </div>
  );
}
