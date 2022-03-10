import React, { useState } from "react";
import { getFromLocalStorage } from "../utils/storageUtils";
import { Selector } from "./previewField/Selector";

interface PreviewFormProps {
  id: number;
}

interface AnsState {
  id: number;
  ans: string;
  question: string;
}

export const PreviewForm: React.FC<PreviewFormProps> = ({ id }) => {
  const form = getFromLocalStorage(id);
  const [ans, setAns] = useState<AnsState[]>(
    () =>
      form?.formFields.map(({ id, label }) => ({
        id,
        question: label,
        ans: "",
      })) || []
  );

  const [curQuestion, setCurQuestion] = useState(0);

  if (!form?.formFields.length) {
    return <div>No questions</div>;
  }

  const question = form.formFields[curQuestion];

  const handleValue = (value: string) => {
    setAns((prev) =>
      prev.map((a) => (a.id === question.id ? { ...a, ans: value } : a))
    );
  };

  const value = ans.find((a) => a.id === question.id)?.ans || "";
  // console.log(ans);
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">{form.title}</h1>
      <div className="mb-8">
        <label className="mb-2 block">
          {question.label}{" "}
          {question.required && <span className="text-red-500">*</span>}
        </label>
        {question.kind === "text" && (
          <input
            type={question.type || "text"}
            className="input"
            required={!!question.required}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        )}
        {question.kind === "longText" && (
          <textarea
            className="input"
            required={!!question.required}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        )}

        {question.kind === "dropdown" && (
          <Selector
            className="input"
            options={question.options}
            value={value}
            setValue={(e) => handleValue(e.target.value)}
            multiple={question.type === "multiple"}
          />
        )}

        {question.kind === "radio" && (
          <div>
            {question.options.map((q, i) => {
              return (
                <label className="flex items-center gap-4 my-2" key={i}>
                  <input
                    type="radio"
                    className="w-4 h-4"
                    name={String(question.id)}
                    value={q}
                    onChange={(e) => handleValue(e.target.value)}
                    checked={q === value}
                    key={i}
                  />
                  {q}
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="btn bg-gray-800 disabled:opacity-50"
          disabled={curQuestion === 0}
          onClick={() => setCurQuestion((prev) => Math.max(prev - 1, 0))}
        >
          prev
        </button>
        <button
          className="btn disabled:opacity-50"
          onClick={() =>
            setCurQuestion((prev) =>
              Math.min(prev + 1, form.formFields.length - 1)
            )
          }
          disabled={
            curQuestion === form.formFields.length - 1 ||
            (question.required && value.length === 0)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
