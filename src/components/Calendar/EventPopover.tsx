import { EventType } from "@/store/Eventstore";

function EventPopover(props: { event: EventType }) {
  return (
    <>
      <p className="absolute text-[10px] opacity-30 top-0 left-2">
        {props.event.id}
      </p>
      <p>{props.event.name}</p>
    </>
  );
}

export default EventPopover;
