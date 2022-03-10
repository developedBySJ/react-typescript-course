import { navigate } from "raviger";
import React, { useEffect, useRef, useState } from "react";
import { Field, InputType, KIND, KindType } from "../types/field.type";
import { FormProps } from "../types/forms.types";
import {
  getFromLocalStorage,
  initialFormField,
  saveToLocalStorage,
} from "../utils/storageUtils";
import { InputFieldPreview } from "./previewField/InputFieldPreview";
import { LongTextPreview } from "./previewField/LongTextPreview";
import { RadioPreview } from "./previewField/RadioPreview";
import { Selector } from "./previewField/Selector";
import { SelectorPreview } from "./previewField/SelectorPreview";

export const FORM_DATA_KEY = "formData";

export const Form: React.FC<FormProps> = ({ id }) => {
  const [kind, setKind] = useState<typeof KIND[number]>("text");
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
          ...(kind === "text" && {
            type: "text",
          }),
          ...(kind === "dropdown" && {
            type: "single",
          }),
          kind,
          value: "",
        } as Field,
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
        {formData.formFields.map(({ id, label, value, ...other }) => {
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

          const handleInputRequiredChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setFormData((prev) => ({
              ...prev,
              formFields: prev.formFields.map((field) =>
                field.id === id
                  ? { ...field, required: !!e.target.checked }
                  : field
              ),
            }));
          };

          const handleInputTypeChange = (
            e: React.ChangeEvent<HTMLSelectElement>
          ) => {
            setFormData((prev) => ({
              ...prev,
              formFields: prev.formFields.map((field) =>
                field.id === id
                  ? { ...field, type: e.target.value as any }
                  : field
              ),
            }));
          };
          const handleInputOptionsChange = (options: string[]) => {
            // console.log(options);
            setFormData((prev) => ({
              ...prev,
              formFields: prev.formFields.map((field) =>
                field.id === id ? { ...field, options } : field
              ),
            }));
          };
          return (
            <div key={id}>
              {other.kind === "text" && (
                <InputFieldPreview
                  handleRemove={handleInputFieldRemoveClick(id)}
                  setRequired={handleInputRequiredChange}
                  setType={handleInputTypeChange}
                  label={label}
                  type={other.type as InputType}
                  required={other.required}
                  setLabel={handleInputValueChange}
                />
              )}
              {other.kind === "dropdown" && (
                <SelectorPreview
                  handleRemove={handleInputFieldRemoveClick(id)}
                  setOptions={handleInputOptionsChange}
                  options={other.options || []}
                  required={other.required}
                  setRequired={handleInputRequiredChange}
                  setType={handleInputTypeChange}
                  label={label}
                  type={other.type as InputType}
                  setLabel={handleInputValueChange}
                />
              )}
              {other.kind === "radio" && (
                <RadioPreview
                  handleRemove={handleInputFieldRemoveClick(id)}
                  setOptions={handleInputOptionsChange}
                  options={other.options || []}
                  required={other.required}
                  setRequired={handleInputRequiredChange}
                  setType={handleInputTypeChange}
                  label={label}
                  setLabel={handleInputValueChange}
                />
              )}
              {other.kind === "longText" && (
                <LongTextPreview
                  handleRemove={handleInputFieldRemoveClick(id)}
                  required={other.required}
                  setRequired={handleInputRequiredChange}
                  label={label}
                  setLabel={handleInputValueChange}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col">
        <label className="text-left mb-2 flex-1">Add New Field</label>
        <div className="flex gap-4 items-stretch mb-8">
          <input
            className="input"
            type="text"
            value={newField}
            onChange={handleNewFieldChange}
          />
          <Selector
            options={[...KIND]}
            value={kind}
            setValue={(e) => setKind(e.target.value as KindType)}
            className="input"
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
