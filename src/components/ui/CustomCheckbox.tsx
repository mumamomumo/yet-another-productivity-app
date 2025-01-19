import { Check } from "lucide-react";
import { useEffect, useState } from "react";

function CustomCheckbox(props: {
  checked: boolean;
  onCheckChanged?: (value: boolean) => any;
  className?: string;
  size?: number;
}) {
  const [isChecked, setIsChecked] = useState(props.checked);

  useEffect(() => {
    props.onCheckChanged?.(isChecked);
  }, [isChecked]);

  return (
    <div className={props.className}>
      <div
        onClick={() => setIsChecked(!isChecked)}
        className={
          "checkbox relative flex items-center justify-center border-2 rounded-md p-[1px] " +
          (props.size ? `w-${props.size} h-${props.size}` : "w-5 h-5") +
          " " +
          (isChecked ? "checked" : "")
        }
      >
        {isChecked && <Check />}
      </div>
    </div>
  );
}

export default CustomCheckbox;
