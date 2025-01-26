import { Home, PenLine, Clock, Notebook } from "lucide-react";
import { useHomeLayoutStore } from "@/store/HomeLayoutStore";
function HomeIcon(props: {
  width?: number | string;
  height?: number | string;
}) {
  const { open, setOpen } = useHomeLayoutStore();
  const taskOpen = open.includes("tasks");
  const clockOpen = open.includes("timer");
  const noteOpen = open.includes("notes");
  const handleToggleLayout = (panel: string) => {
    if (open.includes(panel)) setOpen(open.filter((item) => item !== panel));
    else setOpen([...open, panel]);
  };
  return (
    <div className="home-icons flex items-center">
      <Home width={props.width} height={props.height} className="home-icon" />
      <div className="layout-icons absolute flex gap-2 p-1">
        <button
          className={"p-2 rounded-md" + " " + (taskOpen ? "active" : "")}
          onClick={() => handleToggleLayout("tasks")}
        >
          <PenLine />
        </button>
        <button
          className={"p-2 rounded-md" + " " + (clockOpen ? "active" : "")}
          onClick={() => handleToggleLayout("timer")}
        >
          <Clock />
        </button>
        <button
          className={"p-2 rounded-md" + " " + (noteOpen ? "active" : "")}
          onClick={() => handleToggleLayout("notes")}
        >
          <Notebook />
        </button>
      </div>
    </div>
  );
}

export default HomeIcon;
