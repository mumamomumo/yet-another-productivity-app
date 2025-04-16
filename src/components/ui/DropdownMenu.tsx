import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function DropdownMenu(props: {
  values: Array<string>;
  setVar?: Function;
  default?: string;
  className?: string;
  textSize?: string;
}) {
  const [value, setValue] = useState(
    props.default ? props.default : props.values[0]
  );
  useEffect(() => {
    if (props.setVar) {
      props.setVar(value);
    }
  }, [value, props.default]);
  return (
    <Popover key={props.values.toString()}>
      <PopoverTrigger
        className={
          "dropdown-button w-full flex items-center justify-center whitespace-nowrap" +
          " " +
          props.className
        }
      >
        <span className="text-[16px]">{capitalizeFirstLetter(value)}</span>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0 border-none">
        <div
          className="dropdown-content grid-cols-1 flex flex-col w-full"
          key={props.values.toString()}
        >
          {props.values.map((data, index, list) => {
            return (
              <>
                <button
                  className={
                    "dropdown-value py-2 text-[16px]" +
                    " " +
                    (index === 0
                      ? "first"
                      : index === list.length - 1
                      ? "last"
                      : "center") +
                    " " +
                    (data === value ? "selected" : "")
                  }
                  key={data}
                  onClick={() => setValue(props.values[index])}
                >
                  {capitalizeFirstLetter(data)}
                </button>
                {index !== list.length - 1 ? <hr /> : null}
              </>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DropdownMenu;
