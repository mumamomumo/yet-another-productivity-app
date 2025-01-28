import { EventType, useEventStore } from "@/store/Eventstore";
import { useTaskStore } from "@/store/TaskStore";
import { Note, useNoteStore } from "@/store/NotesStore";
import { useEffect, useRef, useState } from "react";

import { ChevronRight, X } from "lucide-react";
import CustomCheckbox from "../ui/CustomCheckbox";

import { type } from "@tauri-apps/plugin-os";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { createNote } from "@/data/NotesData";

function EventEditor(props: {
  handleAddEvent: (
    time: number,
    date: Date,
    name: string,
    others?: Partial<EventType>,
    edit?: boolean
  ) => void;
  handleUpdateEvent: (id: string, event: Partial<EventType>) => void;
  setEditingEvent: (editing: any) => void;
  editingEvent: {
    time: number;
    date: Date;
  };
  currentlyEditing: EventType | undefined;
  setCurrentlyEditing: (event: EventType) => void;
}) {
  const { tasks, addTask } = useTaskStore();
  const { notes, addNote } = useNoteStore();
  const [addingTask, setAddingTask] = useState(true);
  const [addingNewTask, setAddingNewTask] = useState(false);
  const [addingNewNote, setAddingNewNote] = useState(false);
  const events = useEventStore().events.sort((a, b) => {
    if (a.start.date < b.start.date) return -1;
    if (a.start.date > b.start.date) return 1;
    if (a.start.hour < b.start.hour) return -1;
    if (a.start.hour > b.start.hour) return 1;
    return 0;
  });
  // Task ref
  const newTaskRef = useRef<HTMLInputElement>(null);
  const newNoteRef = useRef<HTMLInputElement>(null);
  //#region
  const eventTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (eventTitleRef.current && props.currentlyEditing) {
      eventTitleRef.current.value = props.currentlyEditing.name;
    }
  }, [props.currentlyEditing]);
  //#endregion

  const toggleNotes = (newnote: string, include: boolean) => {
    if (props.currentlyEditing) {
      let newNotes;
      if (include) {
        if (props.currentlyEditing.notes?.includes(newnote)) return;
        newNotes = [...(props.currentlyEditing.notes || []), newnote];
      } else {
        newNotes = props.currentlyEditing.notes?.filter(
          (note) => note != newnote
        );
      }
      props.setCurrentlyEditing({
        ...props.currentlyEditing,
        notes: newNotes,
      });
    }
  };
  const toggleTasks = (newtask: string, include: boolean) => {
    if (props.currentlyEditing) {
      let newTasks;
      if (include) {
        if (props.currentlyEditing.tasks?.includes(newtask)) return;
        newTasks = [...(props.currentlyEditing.tasks || []), newtask];
      } else {
        newTasks = props.currentlyEditing.tasks?.filter(
          (task) => task != newtask
        );
      }
      props.setCurrentlyEditing({
        ...props.currentlyEditing,
        tasks: newTasks,
      });
    }
  };

  const handleAddNote = (newNote: Note) => {
    const newTitle = newNote.title;
    const titleCount = notes.filter((note) =>
      note.title.match(`${newTitle} \d*`)
    ).length;
    console.log(newNote.title);
    newNote.title += titleCount > 0 ? titleCount.toString() : "";
    console.log(newNote.title);
    createNote(newNote.title);
    addNote(newNote);
  };

  return (
    <div className="absolute event-editor w-5/6 h-5/6 border-2 rounded-md flex flex-col">
      <div className="event-editor-header">
        <X
          className={cn(
            "absolute top-2 button rounded-full",
            type() === "macos" ? "left-2" : "-2"
          )}
          onClick={() => {
            props.handleUpdateEvent(props.currentlyEditing?.id!, {
              name: eventTitleRef.current?.value!,
              tasks: props.currentlyEditing?.tasks,
              notes: props.currentlyEditing?.notes,
            });
            props.setEditingEvent(false);
          }}
        />
        <h1 className="text-center underline text-2xl">{`Event on ${format(
          props.editingEvent.date,
          "d E"
        )} at ${props.editingEvent.time}:00`}</h1>
      </div>
      <div className="event-editor-body flex flex-1">
        <div className="event-editor-list h-full flex-1 border-r p-1 flex flex-col">
          <h1 className="text-xl text-center underline ">Events</h1>
          {/* Events list */}
          <div className="border h-full flex flex-col gap-2 p-2 rounded-t-md">
            {events.map((event) => {
              const isTodayEvent =
                event.start.date ===
                  format(props.editingEvent.date, "dd/MM/yyyy") &&
                event.start.hour === props.editingEvent.time;
              return (
                <div
                  className={cn(
                    "event-editor-list-item text-center h-[50px] place-content-center border",
                    isTodayEvent ? "event-editor-list-today" : ""
                  )}
                  key={event.id}
                  onClick={() => {
                    props.setCurrentlyEditing(event);
                  }}
                  onDoubleClick={() => {
                    props.handleAddEvent(
                      props.editingEvent.time,
                      props.editingEvent.date,
                      event.name
                    );
                    props.setEditingEvent(false);
                  }}
                >
                  {event.name}
                  <span className="text-[10px] opacity-50">
                    {event.start.date},{event.start.hour}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="w-full border rounded-b-md exclude h-[50px]"
              onClick={() => {
                props.setCurrentlyEditing({
                  name: "",
                  start: {
                    hour: props.editingEvent.time,
                    date: format(props.editingEvent.date, "dd/MM/yyyy"),
                  },
                  tasks: [],
                  notes: [],
                  id: uuidv4(),
                });
              }}
            >
              Create New Event
            </button>
          </div>
        </div>
        {props.currentlyEditing && (
          <div className="event-editor-form h-full flex-1 p-1 flex flex-col">
            <h1 className="text-xl text-center underline ">Event</h1>
            {/* Events form */}
            <div className="border flex flex-col gap-2 p-2 rounded-t-md">
              <input
                ref={eventTitleRef}
                onChange={() => {
                  if (props.currentlyEditing) {
                    props.currentlyEditing.name =
                      eventTitleRef.current?.value || "";
                  }
                }}
              />
            </div>
            <div className="event-editor-tab-buttons flex">
              <button
                onClick={() => setAddingTask(true)}
                className={cn(
                  "flex-1 exclude border-l",
                  addingTask && "underline"
                )}
              >
                Tasks
              </button>
              <button
                className={cn(
                  "flex-1 exclude border-x",
                  !addingTask && "underline"
                )}
                onClick={() => {
                  setAddingTask(false);
                }}
              >
                Notes
              </button>
            </div>
            <div className="event-editor-form-lists flex h-full">
              {addingTask ? (
                // Adding tasks to the event
                <div className="event-editor-form-tasks flex-1 border h-full flex flex-col">
                  <div className="overflow-y-scroll flex-1">
                    {tasks.map((task) => {
                      const included = props.currentlyEditing?.tasks?.includes(
                        task.id
                      );
                      return (
                        <div key={task.id} className="flex items-center gap-1">
                          <CustomCheckbox
                            checked={included}
                            onCheckChanged={(value) =>
                              toggleTasks(task.id, value)
                            }
                          />
                          <span>{task.title}</span>
                        </div>
                      );
                    })}
                  </div>
                  {addingNewTask ? (
                    <div className="w-full h-[40px] flex pb-1">
                      <button
                        className="place-items-center"
                        onClick={() => setAddingNewTask(false)}
                      >
                        <X className="p-1" />
                      </button>
                      <input className="flex-1" ref={newTaskRef} />
                      <button
                        className="w-full place-items-center"
                        onClick={() => {
                          addTask({
                            id: uuidv4(),
                            priority: "low",
                            status: "todo",
                            title:
                              newTaskRef.current?.value ||
                              `${format(props.editingEvent.date, "EEE")} ${
                                props.editingEvent.time
                              }`,
                          });
                        }}
                      >
                        <ChevronRight className="w-full" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full h-[40px]"
                      onClick={() => setAddingNewTask(true)}
                    >
                      Add Task
                    </button>
                  )}
                </div>
              ) : (
                // Adding notes to the event
                <div className="event-editor-form-notes flex-1 flex flex-col border h-full">
                  <div className="flex-1">
                    {notes
                      .sort((a, b) => {
                        if (a.pinned && !b.pinned) return -1;
                        if (!a.pinned && b.pinned) return 1;
                        return 0;
                      })
                      .map((note) => {
                        const included =
                          props.currentlyEditing?.notes?.includes(note.id);
                        return (
                          <div
                            key={note.id}
                            className="flex items-center gap-1"
                          >
                            <CustomCheckbox
                              checked={included}
                              onCheckChanged={(value) =>
                                toggleNotes(note.id, value)
                              }
                            />
                            <span>{note.title}</span>
                          </div>
                        );
                      })}
                  </div>
                  {addingNewNote ? (
                    <div className="w-full h-[40px] flex pb-1">
                      <button
                        className="place-items-center"
                        onClick={() => setAddingNewNote(false)}
                      >
                        <X className="p-1" />
                      </button>
                      <input className="flex-1" ref={newNoteRef} />
                      <button
                        className="w-full place-items-center"
                        onClick={() => {
                          const newNote = {
                            id: uuidv4(),
                            title: `${newNoteRef.current?.value}`,
                            content: "",
                          };
                          console.log(newNote);
                          handleAddNote(newNote);
                          setAddingNewNote(false);
                        }}
                      >
                        <ChevronRight className="w-full" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full h-[40px]"
                      onClick={() => setAddingNewNote(true)}
                    >
                      Add Note
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="event-editor-form-buttons flex">
              {/* Save event as a new event */}
              <button
                className="w-full border rounded-bl-md exclude h-[50px]"
                onClick={() => {
                  let newEditingNotes: string[] | undefined = undefined;
                  if (
                    events.filter((event) => {
                      event.notes === props.currentlyEditing?.notes;
                    })
                  ) {
                    newEditingNotes = [];
                    const currentlyEditingNotes = props.currentlyEditing?.notes;
                    // Update the newEditingNotes with notes of different IDs
                    currentlyEditingNotes?.map((eventNote) => {
                      // Find the id of the notes of the event we want to duplicate
                      const currentNote = notes.find(
                        (note) => note.id === eventNote
                      );
                      if (!currentNote) return;
                      const newId = uuidv4();
                      // Create a new note
                      let newNote = {
                        id: newId,
                        title: `${currentNote?.title} ${format(
                          props.editingEvent.date,
                          "EEE d"
                        )}`,
                        content: "",
                      };
                      // Add the new note to both the event
                      console.log(newNote);
                      newEditingNotes!.push(newId);
                      handleAddNote(newNote);
                    });
                  }
                  props.handleAddEvent(
                    props.editingEvent.time,
                    props.editingEvent.date,
                    eventTitleRef.current?.value!,
                    {
                      notes: newEditingNotes
                        ? newEditingNotes
                        : [...props.currentlyEditing?.notes!],
                      tasks: props.currentlyEditing?.tasks,
                    }
                  );
                  props.setEditingEvent(false);
                }}
              >
                Save as new
              </button>
              {/* Update the currently editing event */}
              <button
                className="w-full border rounded-br-md exclude h-[50px]"
                onClick={() => {
                  if (
                    events.filter(
                      (event) => event.id === props.currentlyEditing?.id
                    ).length > 0
                  ) {
                    // Update event if it exists
                    props.handleUpdateEvent(props.currentlyEditing?.id!, {
                      name: eventTitleRef.current?.value!,
                      tasks: props.currentlyEditing?.tasks,
                      notes: props.currentlyEditing?.notes,
                    });
                  } else {
                    // Add event if it doesn't
                    props.handleAddEvent(
                      props.editingEvent.time,
                      props.editingEvent.date,
                      eventTitleRef.current?.value!,
                      {
                        notes: props.currentlyEditing?.notes,
                        tasks: props.currentlyEditing?.tasks,
                      }
                    );
                  }
                  props.setEditingEvent(false);
                }}
              >
                Update event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventEditor;
