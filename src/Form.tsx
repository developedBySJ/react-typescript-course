import React, { useState } from "react";

interface FormProps {
  onClose: () => void;
}

const initialFormField = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

export const Form: React.FC<FormProps> = ({ onClose }) => {
  const [formFields, setFormFields] = useState(initialFormField);
  const [newField, setNewField] = React.useState("");

  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewField(e.target.value);
  };

  const handleNewFieldAddClick = () => {
    setFormFields((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const handleInputFieldRemoveClick = (id: number) => () => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleClearFormClick = () => {
    setFormFields((prev) => prev.map((field) => ({ ...field, value: "" })));
  };
  return (
    <div>
      <div className="border-b border-gray-700 py-2 mb-4">
        {formFields.map(({ id, label, type, value }) => {
          const handleInputValueChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setFormFields((prev) =>
              prev.map((field) =>
                field.id === id ? { ...field, value: e.target.value } : field
              )
            );
          };
          return (
            <div key={id} className="flex flex-col my-2 mb-4">
              <label className="text-left mb-2">{label}</label>
              <div className="flex gap-4 items-stretch">
                <input
                  className="input"
                  type={type}
                  value={value}
                  onChange={handleInputValueChange}
                />
                <button
                  className="btn p-2 px-4 bg-gray-700"
                  onClick={handleInputFieldRemoveClick(id)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col">
        <label className="text-left mb-2">Add New Field</label>
        <div className="flex gap-4 items-stretch mb-8">
          <input
            className="input"
            type="text"
            value={newField}
            onChange={handleNewFieldChange}
          />
          <button className="btn" onClick={handleNewFieldAddClick}>
            Add
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="btn bg-gray-800 mb-8" onClick={onClose}>
          Close
        </button>
        <button className="btn bg-gray-800 mb-8" onClick={handleClearFormClick}>
          Clear
        </button>

        <button className="btn mb-8">Submit</button>
      </div>
    </div>
  );
};
