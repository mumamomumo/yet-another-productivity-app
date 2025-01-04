import { Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

function EditTimerButton(props: {
  text: string;
  value: number;
  size?: number;
  setValue: Function;
  max?: number;
  min?: number;
  className?: string;
  setShowWarning?: Function;
  saveId?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = props.value.toString();
  }, [props.value]);

  const handleSubtractTime = () => {
    if (props.value === props.min) return;
    else {
      props.setValue(props.value - 1);
      props.saveId &&
        localStorage.setItem(props.saveId, (props.value - 1).toString());
    }
  };
  const handleAddTime = () => {
    if (props.value === props.max) return;
    else {
      props.setValue(props.value + 1);
      props.saveId &&
        localStorage.setItem(props.saveId, (props.value + 1).toString());
    }
  };

  const handleUpdateTime = () => {
    var enteredTime = parseInt(inputRef.current!.value);
    if (enteredTime || enteredTime === 0) {
      if (enteredTime > props.max!) {
        enteredTime = props.max!;
        props.setShowWarning ? props.setShowWarning(true) : "";
      } else if (enteredTime < props.min!) enteredTime = props.min!;
    }
    props.setValue(enteredTime);
    props.saveId && localStorage.setItem(props.saveId, enteredTime.toString());
    inputRef.current!.value = enteredTime.toString();
  };

  return (
    <div
      className={
        props.className || "place-items-center py-2 flex justify-between"
      }
    >
      <p>{props.text}</p>
      <div className="edit-timer flex items-center justify-center">
        <Minus
          width={props.size || 30}
          height={props.size || 30}
          className={
            "edit-timer-minus cursor-pointer" +
            " " +
            (props.value === props.min ? "opacity-50" : "")
          }
          onClick={handleSubtractTime}
        />
        <input
          type="number"
          ref={inputRef}
          className="edit-timer-input exclude max-w-10 bg-transparent border-none focus:border-none text-center"
          maxLength={2}
          onChange={(e) => {
            if (!Number.isNaN(parseInt(e.target.value))) handleUpdateTime();
          }}
        />
        <Plus
          width={props.size || 30}
          height={props.size || 30}
          className={
            "edit-timer-plus cursor-pointer" +
            " " +
            (props.value === props.max ? "opacity-50" : "")
          }
          onClick={handleAddTime}
        />
      </div>
    </div>
  );
}

export default EditTimerButton;
