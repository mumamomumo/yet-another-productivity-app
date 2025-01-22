import { create } from "zustand";

export type EventType = {
  name: string;
  id: any;
  start: Date;
  end: Date;
};

type EventStore = {
  events: EventType[];
  addEvent: (event: EventType) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<EventType>) => void;
  setEvents: (events: EventType[]) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({ ...state, events: [...state.events, event] })),
  deleteEvent: (id) =>
    set((state) => ({
      ...state,
      events: state.events.filter((event) => event.id !== id),
    })),
  updateEvent: (id, newEvent) =>
    set((state) => ({
      ...state,
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...newEvent } : event
      ),
    })),
  setEvents: (events) => set((state) => ({ ...state, events })),
}));
