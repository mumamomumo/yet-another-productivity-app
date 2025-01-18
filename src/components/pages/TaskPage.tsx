import { useState } from "react";
import TaskList from "../Tasks/TaskList";
import AddTaskComponent from "../Tasks/AddTask";

import { setPage } from "@/store/PageStore";
import { useTaskStore } from "@/store/TaskStore";

function Tasks(props: { addTask: boolean }) {
  const editingTask = useTaskStore((state) => state.editingTask);
  const [rightPanelActive, setRightPanelActive] = useState(props.addTask);

  const handleAddTask = () => {
    setRightPanelActive(true);
    setPage("tasks", { addTask: false });
  };
  return (
    <div className="task page">
      <div className={"left-task panel p-5 w-full bg-white"}>
        <TaskList handleAddTask={handleAddTask} className="h-full" />
      </div>
      <div
        className={
          "right-task panel p-5 bg-white" +
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
