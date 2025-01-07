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
        "task-item panel max-w-[500px] min-w-[50px] w-[100%] p-2 my-2" +
        " " +
        (isCompleted ? "complete" : "")
      }
    >
      <div className="flex rounded-md items-center justify-around text-l gap-3">
        <CustomCheckbox
          checked={isCompleted}
          onCheckChanged={(value) => setIsCompleted(value)}
        />
        <div className="w-2/3 justify-items-start task-item-title">
          <p
            className={
              "task-item-title text-start hover:underline hover:cursor-alias" +
              " " +
              (isCompleted ? "line-through" : "")
            }
            onClick={() => props.setEditingTask(props.task)}
          >
            {props.task.title}
          </p>
        </div>
        <p
          className={
            "task-item-description w-1/3 hover:underline hover:cursor-help " +
            " " +
            (showDescription ? "hidden" : "")
          }
          onClick={() => setShowDescription(!showDescription)}
        >
          {props.task.description}
        </p>
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
            "task-item-description w-full pb-5 p-2" +
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
// {props.task.priority === "low" ? (
//   <CircleAlert />
// ) : props.task.priority === "medium" ? (
//   <TriangleAlert />
// ) : props.task.priority === "high" ? (
//   <OctagonAlert />
// ) : null}
