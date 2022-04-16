import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  required?: boolean;
  setLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setType?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setRequired?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
}

export const InputFieldPreview: React.FC<InputFieldProps> = ({
  label,
  setLabel,
  setType,
  type,
  setRequired,
  required,
  handleRemove,
}) => {
  return (
    <div className="my-4 border-b border-gray-500 py-4">
      <h1 className="text-gray-500 mb-2">Input Field ({type})</h1>
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
          options={[...inputType]}
          setValue={(e) => setType && setType(e)}
        /> */}
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
