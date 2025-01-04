import { useEffect, useState } from "react";
import TaskList from "../Tasks/TaskList";
import AddTaskComponent from "../Tasks/AddTask";

import { setPage } from "@/store/PageStore";
import { Task, useTaskStore } from "@/store/TaskStore";

function Tasks(props: { addTask: boolean }) {
  console.log("Task Page render");
  // const tasks = useTaskStore((state) => state.tasks);
  const editingTask = useTaskStore((state) => state.editingTask);
  const [rightPanelActive, setRightPanelActive] = useState(props.addTask);

  const handleAddTask = () => {
    setRightPanelActive(true);
    setPage("tasks", { addTask: false });
  };
  return (
    <div className="task page">
      <div
        className={
          "left-task panel flex-1 place-items-center justify-center" +
          " " +
          (!rightPanelActive && !editingTask ? "p-5" : "")
        }
      >
        <div className="w-full items-center h-full">
          <TaskList handleAddTask={handleAddTask} className="h-full"/>
        </div>
      </div>
      <div
        className={
          "right-task panel ml-1" +
          " " +
          (rightPanelActive || editingTask ? "active" : "")
        }
      >
        <AddTaskComponent
          editTask={editingTask ? editingTask : undefined}
          setRightPanelActive={setRightPanelActive}
        />
      </div>
    </div>
  );
}

export default Tasks;
