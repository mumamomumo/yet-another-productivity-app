import { EventType } from "@/store/Eventstore";
import { useEffect, useRef } from "react";
import CustomCheckbox from "../ui/CustomCheckbox";
import { useTaskStore } from "@/store/TaskStore";
import { useNoteStore } from "@/store/NotesStore";
import { cn } from "@/lib/utils";
function EventPopover(props: {
  event: EventType;
  updateEvent: (id: string, event: Partial<EventType>) => void;
}) {
  const eventTitleRef = useRef<HTMLInputElement>(null);
  const { tasks, updateTask } = useTaskStore();
  const { notes } = useNoteStore();

  useEffect(() => {
    if (eventTitleRef.current) {
      eventTitleRef.current.value = props.event.name;
    }
  }, []);

  const handleUpdateEvent = () => {
    if (props.updateEvent) {
      props.updateEvent(props.event.id, {
        name: eventTitleRef.current!.value,
      });
    }
  };
  return (
    <>
      <input
        ref={eventTitleRef}
        onChange={handleUpdateEvent}
        className="exclude w-full px-[5px] py-[7px] rounded-t-md border-white cursor-text"
      />
      <div className="flex">
        {(props.event.tasks?.length! > 0 || props.event.notes?.length! > 0) && (
          <div className="event-popover-tasks min-h-[50px] flex-1 h-full border-x border-b">
            <div className="">
              <h1 className="text-center underline">Tasks</h1>
              <div className="overflow-y-scroll max-h-[75px]">
                {props.event.tasks?.map((eventTask) => {
                  const thisTask = tasks.find((task) => task.id === eventTask);
                  if (!thisTask) return;
                  return (
                    <div
                      className="flex items-center gap-1 px-1"
                      key={eventTask}
                    >
                      <CustomCheckbox
                        checked={thisTask?.status === "done"}
                        onCheckChanged={(value) => {
                          updateTask(thisTask?.id!, value ? "done" : "todo");
                        }}
                        size={4}
                      />
                      <p
                        className={cn(
                          "text-center text-sm",
                          thisTask?.status === "done" && "opacity-50"
                        )}
                      >
                        {thisTask?.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/* Notes */}
        {(props.event.notes?.length! > 0 || props.event.tasks?.length! > 0) && (
          <div className="event-popover-notes min-h-[50px] flex-1 border-x border-b">
            <div className="flex-1">
              <h1 className="text-center underline">Notes</h1>
              <div className="overflow-y-scroll max-h-[75px]">
                {props.event.notes?.map((eventNote) => {
                  const thisNote = notes.find((note) => note.id === eventNote);
                  return (
                    <div className="flex items-center gap-1" key={thisNote?.id}>
                      <p className="text-center text-sm w-full">
                        {thisNote?.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EventPopover;
