import { navigate } from "raviger";
import React, { useEffect, useRef, useState } from "react";
import { FormProps } from "../types/forms.types";
import {
  getFromLocalStorage,
  initialFormField,
  saveToLocalStorage,
} from "../utils/storageUtils";

export const FORM_DATA_KEY = "formData";

export const Form: React.FC<FormProps> = ({ id }) => {
  const [formData, setFormData] = useState(
    () =>
      getFromLocalStorage(id) || {
        id,
        title: "Untitled Form",
        formFields: initialFormField,
      }
  );
  const [newField, setNewField] = React.useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewField(e.target.value);
  };

  const handleNewFieldAddClick = () => {
    setFormData((prev) => ({
      ...prev,
      formFields: [
        ...prev.formFields,
        {
          id: new Date().getTime(),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    }));
    setNewField("");
  };

  const handleInputFieldRemoveClick = (id: number) => () => {
    setFormData((prev) => ({
      ...prev,
      formFields: prev.formFields.filter((field) => field.id !== id),
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleClearFormClick = () => {
    setFormData((prev) => ({
      ...prev,
      formFields: prev.formFields.map((field) => ({ ...field, value: "" })),
    }));
  };

  useEffect(() => {
    const tId = setTimeout(() => {
      saveToLocalStorage(formData);
    }, 1000);

    return () => {
      saveToLocalStorage(formData);
      clearTimeout(tId);
    };
  }, [formData]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        className="input"
        value={formData.title}
        ref={titleRef}
        onChange={handleTitleChange}
      />
      <div className="border-b border-gray-700 py-2 mb-4">
        {formData.formFields.map(({ id, label, type, value }) => {
          const handleInputValueChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setFormData((prev) => ({
              ...prev,
              formFields: prev.formFields.map((field) =>
                field.id === id ? { ...field, label: e.target.value } : field
              ),
            }));
          };
          return (
            <div key={id} className="flex flex-col my-2 mb-4">
              <div className="flex gap-4 items-stretch">
                <input
                  className="input"
                  type="text"
                  value={label}
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

      <div className="flex gap-2 justify-between">
        <button
          className="btn flex-1 bg-gray-800 mb-8 p-2"
          onClick={() => navigate("/")}
        >
          Close
        </button>
        <button
          className="btn bg-gray-800 mb-8 p-2 flex-1"
          onClick={handleClearFormClick}
        >
          Clear
        </button>
        <button
          className="btn bg-green-500 mb-8 p-2 flex-1"
          onClick={(_) => saveToLocalStorage(formData)}
        >
          Save
        </button>
        {formData.formFields.length && (
          <button
            className="btn bg-indigo-500 mb-8 p-2 flex-1"
            onClick={(_) => navigate(`/forms/${id}/preview`)}
          >
            Preview
          </button>
        )}

        <button className="btn mb-8 p-2 flex-1">Submit</button>
      </div>
    </div>
  );
};
