import { EventType } from "@/store/Eventstore";
import { useEffect, useRef } from "react";
function EventPopover(props: {
  event: EventType;
  updateEvent?: (id: string, event: Partial<EventType>) => void;
}) {
  const eventTitleRef = useRef<HTMLInputElement>(null);

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
      <input ref={eventTitleRef} onChange={handleUpdateEvent} />
      <p>{props.event.name}</p>
    </>
  );
}

export default EventPopover;
