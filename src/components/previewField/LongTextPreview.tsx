import React from "react";

interface LongTextProps {
  label: string;
  required?: boolean;
  setLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRequired: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
}

export const LongTextPreview: React.FC<LongTextProps> = ({
  label,
  setLabel,
  setRequired,
  required,
  handleRemove,
}) => {
  return (
    <div className="my-4 border-b border-gray-500 py-4">
      <h1 className="text-gray-500 mb-2">Long Text</h1>
      <input
        type="text"
        className="input w-full "
        value={label}
        onChange={setLabel}
      />
      <div className="flex items-center gap-4">
        <button
          className="btn text-red-500 bg-transparent p-2"
          onClick={handleRemove}
        >
          remove
        </button>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!required} onChange={setRequired} />
          Required
        </label>
      </div>
    </div>
  );
};
