import { Trash } from "lucide-react";
import { useState } from "react";

function Info(props: { setPage: Function }) {
  const [showVariables, setShowVariables] = useState(false);

  return (
    <div className="px-2 mb-[10%]">
      <h1 className="text-3xl text-center pb-6 pt-2">Info and stuff</h1>
      <p>
        This app is made to make managing tasks a bit easier. I found it very
        difficult to focus so I decided to make this app to help me with that.
        Everything I need is in the home page so I don't need to keep searching
        for anything, and I hope the same applies to you. <br />
        <br />
        This was also an opportunity for me to explore the world of app
        development, using React and Typescript, along with Vite and Tauri to
        create a cross-platform app.
        <span className="text-[8px] text-nowrap line-clamp-1">
          (I don't actually know if this will work on MacOS. I made this on a
          Windows computer)
        </span>
        <br />
        This app was created by
        <span className="font-bold"> Nivne :D</span>
      </p>
      <hr className="my-5" />
      <div className=" info-items px-2">
        <p className="pb-2">
          The{" "}
          <span
            className="cursor-pointer underline text-blue-300"
            onClick={() => props.setPage("home")}
          >
            home page
          </span>{" "}
          is where you can see everything that the app has to offer: Notes and
          Tasks. There is also a focus timer that you can use.
        </p>
        <p className="py-2">
          The{" "}
          <span
            className="cursor-pointer underline text-blue-300"
            onClick={() => props.setPage("tasks")}
          >
            tasks page
          </span>{" "}
          is where you can add and manage your tasks.
        </p>
        <p className="py-2">
          The{" "}
          <span
            className="cursor-pointer underline text-blue-300"
            onClick={() => props.setPage("notes")}
          >
            notes page
          </span>{" "}
          is where you can add and manage your notes.
        </p>
        <p className="py-2">
          The settings page is where you can change your theme and more.
          <br />
          <span className="text-red-500 text-sm font-semibold">
            Note: The settings page sucks and probably doesn't work
          </span>
        </p>
        <p>
          You can add a new theme by clicking on the folder icon in the settings
          page. There's already a few themes for you.
          <br />
          There is a list of variables you can use to style the app. Otherwise,
          if you're feeling <em>creative</em>, you can use the classes and
          create your own stylesheet.
        </p>
      </div>
      <hr />
      <div className="variable-names">
        <h1
          className="text-3xl pt-6"
          onClick={() => setShowVariables(!showVariables)}
        >
          {showVariables ? "Hide variables" : "Show variables"}
        </h1>
        <span className="text-sm text-amber-400">
          Warning, there's quite a lot.
        </span>
        <br />
        <span className="text-xs py-0 line-clamp-1">
          But you don't have to style all of them
        </span>
        {showVariables && (
          <p className="text-md">
            <span className="font-bold">Variables:</span>
            <br />
            <ul className="list-disc pl-4 *:py-[0.375rem]">
              <li>
                <span className="font-bold">--caret-color</span>: Color of the
                caret in text inputs
              </li>
              <li>
                <span className="font-bold">--color</span>: Default text color
              </li>
              <li>
                <span className="font-bold">--background</span>: Default
                background color
              </li>
              <li>
                <span className="font-bold">--button-bg</span>: Default button
                background color
              </li>
              <li>
                <span className="font-bold">--button-color</span>: Default
                button text color
              </li>
              <li>
                <span className="font-bold">--button-hover</span>: Default
                button hover background color
              </li>
              <li>
                <span className="font-bold">--input-bg</span>: Default input
                background color
              </li>
              <li>
                <span className="font-bold">--input-text</span>: Default input
                text color
              </li>
              <li>
                <span className="font-bold">--input-border</span>: Default input
                border color
              </li>
              <li>
                <span className="font-bold">--input-active-border</span>:
                Default input focus color
              </li>
              <li>
                <span className="font-bold">--dropdown-button-color</span>:
                Dropdown button text color
              </li>
              <li>
                <span className="font-bold">--dropdown-content-bg</span>:
                Dropdown content background color
              </li>
              <li>
                <span className="font-bold">--dropdown-content-color</span>:
                Dropdown content text color
              </li>
              <li>
                <span className="font-bold">--dropdown-content-border</span>:
                dropdown content border color
              </li>
              <li>
                <span className="font-bold">--dropdown-selected-bg</span>:
                Selected dropdown value background
              </li>
              <li>
                <span className="font-bold">--dropdown-value-hover-bg</span>:
                Dropdown value background on hover
              </li>
              <li>
                <span className="font-bold">--titlebar-bg-color</span>: Titlebar
                background color
              </li>
              <li>
                <span className="font-bold">--titlebar-text-color</span>:
                Titlebar text color
              </li>
              <li>
                <span className="font-bold">--titlebar-shadow-color</span>:
                Titlebar shadow color
              </li>
              <li>
                <span className="font-bold">--titlebar-button-hover</span>:
                Titlebar buttons when hovered
              </li>
              <li>
                <span className="font-bold">--sidebar-bg-color</span>: Sidebar
                background color
              </li>

              <li>
                <span className="font-bold">--sidebar-shadow-color</span>:
                Sidebar shadow color
              </li>
              <li>
                <span className="font-bold">--sidebar-icon-hover</span>: Sidebar
                icons when hovered
              </li>
              <li>
                <span className="font-bold">--sidebar-active-border</span>:
                Active tab icon border color
              </li>
              <li>
                <span className="font-bold">--sidebar-active-color</span>:
                Active tab sidebar color
              </li>
              <li>
                <span className="font-bold">--panel-bg</span>: Default panel
                background color
              </li>
              <li>
                <span className="font-bold">--accent</span>: Accent color
              </li>
              <li>
                <span className="font-bold">--task-list-add-button-bg</span>:
                Add task button background
              </li>
              <li>
                <span className="font-bold">--task-list-add-button-color</span>:
                Add task button color
              </li>
              <li>
                <span className="font-bold">--task-list-add-button-hover</span>:
                Add task button background on hover
              </li>
              <li>
                <span className="font-bold">--right-task-close-bg</span>:
                Background of the close button on the right panel in Tasks page
              </li>
              <li>
                <span className="font-bold">--right-task-close-color</span>:
                Color of the close button on the right panel in Tasks page
              </li>
              <li>
                <span className="font-bold">--right-task-close-hover</span>:
                Background of the close button on the right panel in Tasks page
                on hover
              </li>
              <li>
                <span className="font-bold">--note-side-border</span>: Border
                color of notes in the list of notes
              </li>
              <li>
                <span className="font-bold">--note-side-pinned-border</span>:
                Border color of pinned notes in the list of notes
              </li>
              <li>
                <span className="font-bold">--note-side-pinned-bg</span>:
                Background of pinned notes in the list of notes
              </li>
              <li>
                <span className="font-bold">--settings-bg</span>: Background of
                the settings page
              </li>
              <li className="flex items-center">
                <span className="font-bold">--task-action-bg</span>: Background
                of the task actions (The <Trash className="w-4 h-4 mx-1" />{" "}
                icon)
              </li>
              <li className="flex items-center">
                <span className="font-bold">--task-action-bg</span>: Color of
                the task actions (The <Trash className="w-4 h-4 mx-1" /> icon)
              </li>
              <li>
                <span className="font-bold">--task-item-complete-opacity</span>:
                Opacity of completed tasks
              </li>
              <li>
                <span className="font-bold">--top-clock-bg</span>: Background of
                the clock in the top bar
              </li>
              <li>
                <span className="font-bold">--top-clock-color</span>: Color of
                the clock in the top bar
              </li>
              <li>
                <span className="font-bold">--top-clock-shadow</span>: Shadow
                color of the clock in the top bar
              </li>
              <li>
                <span className="font-bold">--show-chat-button-bg</span>:
                Background of the show chat button
              </li>
              <li>
                <span className="font-bold">--show-chat-button-color</span>:
                Color of the show chat button
              </li>
              <li>
                <span className="font-bold">--show-chat-button-border</span>:
                Border color of the show chat button
              </li>
              <li>
                <span className="font-bold">--show-chat-button-hover</span>:
                Background of the show chat button on hover
              </li>
              <li>
                <span className="font-bold">--ai-chat-bg</span>: Background of
                AI chat messages
              </li>
              <li>
                <span className="font-bold">--ai-chat-color</span>: Color of AI
                chat messages
              </li>
              <li>
                <span className="font-bold">--ai-chat-border</span>: Border
                color of AI chat messages
              </li>
              <li>
                <span className="font-bold">--chat-message-bg</span>: Background
                of chat messages
              </li>
              <li>
                <span className="font-bold">--chat-message-color</span>: Color
                of chat messages
              </li>
              <li>
                <span className="font-bold">--chat-message-border</span>: Border
                color of chat messages
              </li>
              <li>
                <span className="font-bold">--chat-user-bg</span>: Background of
                your chat messages
              </li>
              <li>
                <span className="font-bold">--chat-user-color</span>: Color of
                your chat messages
              </li>
              <li>
                <span className="font-bold">--chat-user-border</span>: Border
                color of your chat messages
              </li>
              <li>
                <span className="font-bold">--chat-bot-bg</span>: Background of
                the bot's chat messages
              </li>
              <li>
                <span className="font-bold">--chat-bot-color</span>: Color of
                the bot's chat messages
              </li>
              <li>
                <span className="font-bold">--chat-bot-border</span>: Border
                color of the bot's chat messages
              </li>
              <li>
                <span className="font-bold">--chat-title-bg</span>: Background
                of the title of the AI chat
              </li>
              <li>
                <span className="font-bold">--chat-bot-color</span>: Color of
                the title of the AI chat
              </li>
              <li>
                <span className="font-bold">--chat-bot-border</span>: Border
                color of the title of the AI chat
              </li>
            </ul>
          </p>
        )}
      </div>
    </div>
  );
}

export default Info;
