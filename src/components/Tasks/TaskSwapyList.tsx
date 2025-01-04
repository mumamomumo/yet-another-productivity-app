import { Task, useTaskStore } from "@/store/TaskStore";
import { TaskItem } from "./TaskItem";
import { setPage } from "@/store/PageStore";
import { saveTasks } from "@/data/TaskData";

import { createSwapy, Swapy, utils } from "swapy";

import { useEffect, useRef, useState, useMemo } from "react";
function TaskList(props?: {
  className?: string;
  handleAddTask?: Function;
  setEditingTask?: Function;
}) {
  const { tasks, updateTask, deleteTask, setEditingTask } = useTaskStore();
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(tasks, "order")
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(tasks, "order", slotItemMap),
    [tasks, slotItemMap]
  );
  useEffect(() => {
    swapy.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      dragAxis: "y",
    });

    swapy.current.onSwap((e) => {
      setSlotItemMap(e.newSlotItemMap.asArray);
    });

    return () => swapy.current?.destroy();
  }, []);

  useEffect(
    () =>
      utils.dynamicSwapy(
        swapy.current!,
        tasks,
        "order",
        slotItemMap,
        setSlotItemMap
      ),
    [tasks]
  );

  const swapy = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="h-full w-full text-center px-2 py-4 max-w-[600px] flex flex-col">
        <h1 className="task-list-title text-3xl pb-4">Tasks</h1>
        <div
          className="task-list-items h-[80%] w-full overflow-scroll gap-2"
          ref={containerRef}
        >
          {slottedItems.map(({ slotId, itemId, item: task }) => {
            return (
              <div data-swapy-slot={slotId} key={slotId}>
                <div data-swapy-item={itemId} key={itemId}>
                  <TaskItem
                    task={task!}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    setEditingTask={handleOpenTask}
                  />
                </div>
              </div>
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
