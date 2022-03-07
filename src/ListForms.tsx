import React, { useEffect } from "react";
import { FORM_DATA_KEY, getForms } from "./Form";

interface ListFormsProps {
  openForm: (id: number) => void;
}

export const ListForms: React.FC<ListFormsProps> = ({ openForm }) => {
  const [forms, setForms] = React.useState(getForms);
  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(forms));
  }, [forms]);
  return (
    <div>
      {forms.map((form, key) => (
        <div
          key={key}
          className="p-4 mx-4 mb-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 flex items-stretch justify-between"
        >
          <div>
            <h1>{form.title}</h1>
            <p className="text-sm opacity-50">
              {form.formFields.length} Questions
            </p>
          </div>
          <div className="flex items-stretch justify-center h-full gap-4">
            <button
              className="text-green-500"
              onClick={() => openForm(form.id)}
            >
              Open
            </button>
            <button
              className="text-red-500"
              onClick={() =>
                setForms((prev) => prev.filter((i) => i.id !== form.id))
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
