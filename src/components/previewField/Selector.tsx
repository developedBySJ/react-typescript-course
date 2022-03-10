import React from "react";

interface SingleSelectorProps {
  className?: string;
  value: string;
  options: string[];
  multiple?: boolean;
  setValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Selector: React.FC<SingleSelectorProps> = ({
  value,
  setValue,
  className,
  options,
  multiple,
}) => {
  return (
    <select
      className={className}
      onChange={setValue}
      value={value}
      multiple={multiple}
    >
      {options.map((k, i) => (
        <option key={i} value={k}>
          {k}
        </option>
      ))}
    </select>
  );
};
