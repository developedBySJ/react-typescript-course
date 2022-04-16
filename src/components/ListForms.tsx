import React, { useEffect, useState } from "react";
import { FORM_DATA_KEY } from "./Form";

import { Link, navigate, useQueryParams } from "raviger";
import { Modal } from "./Modal";
import { CreateForm } from "./CreateForm";
import { FieldModel, FormModel } from "../types/model";
import { getForms } from "../api/form";
import { Spinner } from "./Spinner";

const ListForms: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [forms, setForms] = React.useState<FormModel[]>([]);
  const [{ search }, setQuery] = useQueryParams<{ search: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const fetchForm = () => {
    setIsLoading(true);
    getForms({ limit: 30, offset: 0 }).then((data) => {
      data?.results && setForms(data?.results);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div className="mx-4">
      <Modal isOpen={isOpen} title="Create Form">
        <CreateForm
          onCancel={() => setIsOpen(false)}
          onSuccess={() => fetchForm()}
        />
      </Modal>
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
        <button onClick={() => setIsOpen(true)} className="btn inline-block">
          New
        </button>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center my-8">
          {" "}
          <Spinner />{" "}
        </div>
      )}
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
                {/* {form.formFields.length} Questions */}
              </p>
            </div>
            <div className="flex items-stretch justify-center h-full gap-4">
              <Link href={`/forms/${form.id}`} className="text-green-500">
                Open
              </Link>
              {/* <button
                className="text-red-500"
                onClick={() =>
                  setForms((prev) => prev.filter((i) => i.id !== form.id))
                }
              >
                Delete
              </button> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListForms;
