import { PenLine, Notebook, Settings, Info } from "lucide-react";
import { usePageStore, PageName } from "@/store/PageStore";
import HomeIcon from "./HomeIcon";

const { setPage } = usePageStore.getState();
const ICON_SIZE = 35;
const menuItems: { name: PageName; icon: JSX.Element; tooltip: string }[] = [
  {
    name: "home",
    icon: <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />,
    tooltip: "home",
  },
  {
    name: "tasks",
    icon: <PenLine width={ICON_SIZE} height={ICON_SIZE} />,
    tooltip: "tasks",
  },
  {
    name: "notes",
    icon: <Notebook width={ICON_SIZE} height={ICON_SIZE} />,
    tooltip: "notes",
  },
];
function SidebarComponent(props: {
  className?: string;
  setOpenSettings: Function;
  openSettings: boolean;
}) {
  const page = usePageStore((state) => state.page);
  return (
    <>
      <nav
        className={
          props.className
            ? props.className
            : "sidebar w-[50px] fixed h-full pt-[25px] justify-items-center "
        }
      >
        {menuItems.map((items) => {
          return (
            <div
              key={items.name}
              className={
                "sidebar-icon p-1 m-2" + (page === items.name ? " active" : "")
              }
              onClick={() => setPage(items.name)}
            >
              {items.icon}
            </div>
          );
        })}
        <div>
          <Info
            className="sidebar-icon p-1 mx-2"
            width={ICON_SIZE}
            height={ICON_SIZE}
            onClick={() => setPage("info")}
          />
          <Settings
            className="sidebar-icon p-1 m-2"
            onClick={() => props.setOpenSettings(!props.openSettings)}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        </div>
      </nav>
    </>
  );
}

export default SidebarComponent;
