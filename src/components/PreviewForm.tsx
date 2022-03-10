import React, { useState } from "react";
import { getFromLocalStorage } from "../utils/storageUtils";

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

  return (
    <div>
      <h1 className="text-xl font-bold mb-8">{form.title}</h1>
      <div className="mb-8">
        <label className="mb-2 block">{question.label}</label>
        <input
          type={question.type}
          className="input"
          required
          value={value}
          onChange={(e) => handleValue(e.target.value)}
        />
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
          disabled={curQuestion === form.formFields.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
