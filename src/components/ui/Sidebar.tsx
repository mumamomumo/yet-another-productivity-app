import { Home, PenLine, Notebook } from "lucide-react";
import { usePageStore, PageName } from "@/store/PageStore";

const { setPage } = usePageStore.getState();
const ICON_SIZE = 35;
const menuItems: { name: PageName; icon: JSX.Element; tooltip: string }[] = [
  {
    name: "home",
    icon: <Home width={ICON_SIZE} height={ICON_SIZE} />,
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
function SidebarComponent(props: { className?: string }) {
  const page = usePageStore((state) => state.page);
  return (
    <>
      <nav
        className={
          props.className
            ? props.className
            : "sidebar w-[50px] fixed h-full pt-[25px] justify-items-center"
        }
      >
        {menuItems.map((items) => {
          return (
            <div
              key={items.name}
              className={
                "sidebar-icon p-1 m-2 " + (page === items.name ? " active" : "")
              }
              onClick={() => setPage(items.name)}
            >
              {items.icon}
            </div>
          );
        })}
      </nav>
    </>
  );
}

export default SidebarComponent;
