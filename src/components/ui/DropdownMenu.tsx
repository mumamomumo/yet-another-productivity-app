import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function DropdownMenu(props: { values: Array<string>; setVar?: Function }) {
  const [value, setValue] = useState(props.values[0]);

  useEffect(() => {
    if (props.setVar) {
      props.setVar(value);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger className="dropdown-button w-1/3">
        {capitalizeFirstLetter(value)}
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0 border-none">
        <div className="dropdown-content grid-cols-1 flex flex-col w-full">
          {props.values.map((data, index, list) => {
            return (
              <>
                <button
                  className={
                    "dropdown-value py-2" +
                    " " +
                    (index === 0
                      ? "first"
                      : index === list.length - 1
                      ? "last"
                      : "center") +
                    " " +
                    (data === value ? "selected" : "")
                  }
                  key={index}
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
