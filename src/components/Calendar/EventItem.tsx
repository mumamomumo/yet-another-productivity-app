import { cn } from "@/lib/utils";
import { EventType } from "@/store/Eventstore";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import EventPopover from "./EventPopover";
import { EditingEventType } from "../pages/Calendar";

function EventItem(props: {
  event: EventType;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<EventType>) => void;
  setCurrentlyEditing: (event: EventType) => void;
  setEditingEvent: (event: EditingEventType) => void;
  hour: number;
  date: Date;
}) {
  const [deleting, setDeleting] = useState(false);
  const goingToDelete = () => {
    if (deleting) {
      props.deleteEvent(props.event.id);
      setDeleting(false);
    } else {
      setDeleting(true);
      setTimeout(() => {
        setDeleting(false);
      }, 1500);
    }
  };
  return (
    <div className="event-item m-1 rounded-md border place-content-center">
      <HoverCard openDelay={400} closeDelay={100}>
        <HoverCardTrigger>
          <div
            className="flex h-full w-full min-h-[50px] items-center justify-between"
            onDoubleClick={() => {
              props.setEditingEvent({
                date: props.date,
                time: props.hour,
              });
              props.setCurrentlyEditing(props.event);
            }}
          >
            <p className="event-text flex-1 text-center max-w-[200px]">
              <span>{props.event.name}</span>
            </p>
            <Trash
              className={cn(
                deleting && "deleting",
                "duration-200 transition-colors rounded-r-md event-delete p-[3px] h-full cursor-pointer bg-black/20"
              )}
              onClick={() => goingToDelete()}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="event-hover-card w-[300px]">
          <EventPopover event={props.event} updateEvent={props.updateEvent} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default EventItem;
