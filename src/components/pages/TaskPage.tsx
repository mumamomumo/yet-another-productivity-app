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
    <div className="task page flex">
      <div
        className={
          "left-task panel flex-1 place-items-center justify-center p-5"
        }
      >
        <div className="w-full items-center h-full">
          <TaskList
            handleAddTask={handleAddTask}
            className="h-full w-full place-items-center"
          />
        </div>
      </div>
      <div
        className={
          "right-task panel ml-1 flex-1" +
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
