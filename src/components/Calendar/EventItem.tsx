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

function EventItem(props: {
  event: EventType;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<EventType>) => void;
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
    <div className="event-item mx-1 h-full min-w-[50px] justify-self-center items-center my-1 p-1 rounded-md flex flex-1 border justify-between gap-1">
      <HoverCard openDelay={400} closeDelay={100}>
        <HoverCardTrigger>
          <p className="event-text rounded-md line-clamp-2">
            {props.event.name}
          </p>
        </HoverCardTrigger>
        <Trash
          className={cn(
            deleting && "deleting",
            "duration-1000 transition-colors button event-delete p-[3px] h-full"
          )}
          onClick={() => goingToDelete()}
        />
        <HoverCardContent className="event-hover-card w-[300px]">
          <EventPopover event={props.event} updateEvent={props.updateEvent} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export default EventItem;
