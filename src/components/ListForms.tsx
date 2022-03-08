import React, { useEffect } from "react";
import { FORM_DATA_KEY } from "./Form";
import { getForms } from "../utils/storageUtils";
import { Link, navigate, useQueryParams } from "raviger";

export const ListForms: React.FC = () => {
  const [forms, setForms] = React.useState(getForms);
  const [{ search }, setQuery] = useQueryParams<{ search: string }>();

  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(forms));
  }, [forms]);
  return (
    <div className="mx-4">
      <div className="flex items-stretch mb-4 gap-4">
        <input
          type="search"
          name="search"
          id="search"
          className="input"
          placeholder="Search..."
          value={search}
          autoComplete={"off"}
          onChange={(e) => setQuery({ search: e.target.value })}
        />
        <button
          onClick={() => navigate(`/forms/${new Date().getTime()}`)}
          className="btn inline-block"
        >
          New
        </button>
      </div>
      {forms
        .filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .map((form, key) => (
          <div
            key={key}
            className="p-4 mb-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 flex items-stretch justify-between"
          >
            <div>
              <h1>{form.title}</h1>
              <p className="text-sm opacity-50">
                {form.formFields.length} Questions
              </p>
            </div>
            <div className="flex items-stretch justify-center h-full gap-4">
              <Link href={`/forms/${form.id}`} className="text-green-500">
                Open
              </Link>
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
