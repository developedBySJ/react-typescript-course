import { navigate } from "raviger";
import React, { useEffect, useRef, useState } from "react";
import {
  createFormField,
  deleteFormFields,
  getForm,
  getFormFields,
  updateForm,
  updateFormField,
} from "../api/form";
import { Pagination } from "../types/api.action";
import { FormProps } from "../types/forms.types";
import { FieldModel, FormModel, KindEnum } from "../types/model";
import { InputFieldPreview } from "./previewField/InputFieldPreview";
import { RadioPreview } from "./previewField/RadioPreview";
import { Selector } from "./previewField/Selector";
import { SelectorPreview } from "./previewField/SelectorPreview";
import { Spinner } from "./Spinner";

export const FORM_DATA_KEY = "formData";

const MapComp: React.FC<{
  field: FieldModel;
  onRemove: () => void;
  form_pk?: number;
}> = ({ field, onRemove, form_pk }) => {
  const [fieldLabel, setFieldLabel] = useState(field.label);
  const [options, setOptions] = useState<string[]>(field?.options || []);
  useEffect(() => {
    const tid = setTimeout(async () => {
      if (form_pk) {
        const fieldOptions = [KindEnum.RADIO, KindEnum.DROPDOWN].includes(
          field.kind
        )
          ? options || null
          : null;
        await updateFormField({
          form_pk,
          payload: { ...field, label: fieldLabel, options: fieldOptions },
        });
      }
    }, 500);
    return () => clearTimeout(tid);
  }, [field, fieldLabel, form_pk, options]);

  return (
    <>
      {field.kind === KindEnum.TEXT && (
        <InputFieldPreview
          handleRemove={onRemove}
          label={fieldLabel}
          setLabel={(e) => setFieldLabel(e.target.value)}
          type="text"
        />
      )}
      {field.kind === KindEnum.DROPDOWN && (
        <SelectorPreview
          setOptions={setOptions}
          options={options}
          handleRemove={onRemove}
          label={fieldLabel}
          setLabel={(e) => setFieldLabel(e.target.value)}
          type="text"
        />
      )}

      {field.kind === KindEnum.RADIO && (
        <RadioPreview
          setOptions={setOptions}
          options={options}
          handleRemove={onRemove}
          label={fieldLabel}
          setLabel={(e) => setFieldLabel(e.target.value)}
        />
      )}
    </>
  );
};

export const Form: React.FC<FormProps> = ({ id }) => {
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState(KindEnum.TEXT);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormModel | undefined>();
  const [formFields, setFormFields] = useState<
    Pagination<FieldModel> | undefined
  >();

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    const tid = setTimeout(async () => {
      const form = await getForm(id);
      const formFields = await getFormFields({ form_pk: id });
      form && setFormData(form);
      formFields && setFormFields(formFields);
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(tid);
    };
  }, []);

  useEffect(() => {
    const tid = setTimeout(async () => {
      if (formData) {
        await updateForm(formData);
      }
    }, 1000);

    return () => {
      clearTimeout(tid);
    };
  }, [formData]);

  if (loading) {
    return (
      <div className="my-4 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        className="input mb-4"
        value={formData?.title || ""}
        ref={titleRef}
        onChange={(e) =>
          setFormData((prev) =>
            prev ? { ...prev, title: e.target.value } : undefined
          )
        }
      />
      {formFields?.results
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        ?.map((field) => (
          <MapComp
            key={field.id}
            field={field}
            onRemove={() => {
              const form_pk = formData?.id;
              const id = field.id;
              if (form_pk && id) {
                deleteFormFields({ form_pk, id }).then(() => {
                  getFormFields({ form_pk }).then((data) => {
                    data && setFormFields(data);
                  });
                });
              }
            }}
            form_pk={formData?.id}
          />
        ))}
      <div className="flex mb-4 gap-2 items-stretch">
        <input
          type="text"
          className="input w-full"
          value={label}
          placeholder="New Field"
          onChange={(e) => setLabel(e.target.value)}
        />
        <Selector
          options={[...Object.values(KindEnum)]}
          setValue={(e) => setKind(e.target.value as KindEnum)}
          value={kind}
          className="input"
        />
        <button
          className="btn"
          onClick={() => {
            formData?.id &&
              createFormField({
                form_pk: formData.id,
                label,
                kind,
              })
                .then(() => getFormFields({ form_pk: formData.id }))
                .then((data) => data && setFormFields(data));
          }}
        >
          Add
        </button>
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
          // onClick={handleClearFormClick}
        >
          Clear
        </button>
        <button
          className="btn bg-green-500 mb-8 p-2 flex-1"
          // onClick={(_) => saveToLocalStorage(formData)}
        >
          Save
        </button>
        {/* {formData.formFields.length ? (
          <button
            className="btn bg-indigo-500 mb-8 p-2 flex-1"
            onClick={(_) => navigate(`/forms/${id}/preview`)}
          >
            Preview
          </button>
        ) : null} */}

        <button className="btn mb-8 p-2 flex-1">Submit</button>
      </div>
    </div>
  );
};
