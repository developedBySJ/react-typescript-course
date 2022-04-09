import React from "react";

import { selectType, InputType } from "../../types/field.type";
import { Options } from "./Options";
import { Selector } from "./Selector";

interface InputFieldProps {
  label: string;
  type?: InputType;
  required?: boolean;
  options: string[];

  setLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setType?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setRequired?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOptions: (options: string[]) => void;
  handleRemove: () => void;
}

export const SelectorPreview: React.FC<InputFieldProps> = ({
  label,
  setLabel,
  setType,
  type,
  options,
  setRequired,
  required,
  setOptions,
  handleRemove,
}) => {
  return (
    <div className="my-4 border-b border-gray-500 py-4">
      <h1 className="text-gray-500 mb-2">Dropdown</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input w-full "
          value={label}
          onChange={setLabel}
        />
        {/* <Selector
          value={type}
          className="input flex-shrink w-40"
          options={[...selectType]}
          setValue={setType}
        /> */}
      </div>
      <div className="my-4">
        <h1>Options</h1>
        <Options options={options} setOptions={setOptions} />
      </div>
      <div className="flex items-center gap-4">
        <button
          className="btn text-red-500 bg-transparent p-2"
          onClick={handleRemove}
        >
          remove
        </button>
        {/* <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!required} onChange={setRequired} />
          Required
        </label> */}
      </div>
    </div>
  );
};
