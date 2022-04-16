import React, { useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";
import { getForm, getFormFields } from "../api/form";
import { Pagination } from "../types/api.action";
import { FieldModel, FormModel, KindEnum } from "../types/model";
import { MapPreview } from "./previewField/MapPreview";
import { Selector } from "./previewField/Selector";
import { Spinner } from "./Spinner";

interface PreviewFormProps {
  id: number;
}

interface AnsState {
  id: number;
  ans: string;
  question: string;
}

const PreviewForm: React.FC<PreviewFormProps> = ({ id }) => {
  const [form, setForm] = useState<FormModel | undefined>();
  const [formFields, setFormFields] = useState<
    Pagination<FieldModel> | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [ans, setAns] = useState<AnsState[]>(
    () =>
      formFields?.results.map(({ id, label }) => ({
        id,
        question: label,
        ans: "",
      })) || []
  );

  useEffect(() => {
    const tid = setTimeout(async () => {
      const form = await getForm(id);
      const formFields = await getFormFields({ form_pk: id });
      form && setForm(form);
      formFields && setFormFields(formFields);
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(tid);
    };
  }, []);

  const [curQuestion, setCurQuestion] = useState(0);

  if (loading)
    return (
      <div className="flex justify-center my-8">
        <Spinner />
      </div>
    );

  if (!formFields?.results.length) {
    return <div>No questions</div>;
  }

  const question = formFields.results[curQuestion];

  const handleValue = (value: string) => {
    setAns((prev) =>
      prev.map((a) => (a.id === question.id ? { ...a, ans: value } : a))
    );
  };

  const value = ans.find((a) => a.id === question.id)?.ans || "";
  // console.log(ans);
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">{form?.title}</h1>
      <div className="mb-8">
        <label className="mb-2 block">
          {question.label}{" "}
          {question?.meta?.required && <span className="text-red-500">*</span>}
        </label>
        {question.kind === KindEnum.TEXT && (
          <input
            type={"text"}
            className="input"
            required={!!question?.meta?.required}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        )}
        {/* {question.kind === "longText" && (
          <textarea
            className="input"
            required={!!question.required}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        )} */}

        {question.kind === KindEnum.DROPDOWN && (
          <Selector
            className="input"
            options={question.options || []}
            value={value}
            setValue={(e) => handleValue(e.target.value)}
            multiple={false}
          />
        )}

        {question.kind === KindEnum.GENERIC && <MapPreview />}

        {question.kind === KindEnum.RADIO && (
          <div>
            {question?.options?.map((q, i) => {
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
              Math.min(prev + 1, formFields.results.length - 1)
            )
          }
          disabled={
            curQuestion === formFields.results.length - 1 ||
            (question?.meta?.required && value.length === 0)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PreviewForm;
