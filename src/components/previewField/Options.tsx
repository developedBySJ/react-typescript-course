import React, { useState } from "react";

interface OptionsProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

export const Options: React.FC<OptionsProps> = ({ options, setOptions }) => {
  const [newOption, setNewOption] = useState("");

  return (
    <div>
      {options.map((option, id) => {
        const handleChange = (idx: number, value: string) => {
          const newOptions = [...options];
          newOptions[idx] = value;
          setOptions(newOptions);
        };

        const handleRemove = (idx: number) => {
          const newOptions = [...options];
          newOptions.splice(idx, 1);
          setOptions(newOptions);
        };
        return (
          <div key={id} className="flex flex-col my-2 mb-4">
            <div className="flex gap-4 items-stretch">
              <input
                className="input"
                type="text"
                value={option}
                onChange={(e) => handleChange(id, e.target.value)}
              />
              <button
                className="btn p-2 px-4 bg-gray-700"
                onClick={() => handleRemove(id)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex gap-4 items-stretch">
        <input
          className="input"
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <button
          className="btn p-2 px-4 bg-gray-700"
          onClick={() => {
            setOptions([...options, newOption]);
            setNewOption("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
