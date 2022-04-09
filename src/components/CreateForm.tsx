import { navigate } from "raviger";
import React, { useEffect, useState, Validator } from "react";
import { request } from "../api/request";
import { Errors, Form } from "../types/api.action";

const initialState = {
  title: "",
  description: "",
  is_public: false,
};

const validator = (form: Form) => {
  const errors: Errors<Form> = {};

  if (form.title.length < 1) {
    errors.title = "Title is required";
  }

  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  if (form.description && form.description.length > 1000) {
    errors.description = "Description must be less than 100 characters";
  }

  return errors;
};

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

export const CreateForm: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<ReturnType<typeof validator>>({});

  const handleFieldChange = function <T>(name: string, value: T) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const tId = setTimeout(() => {
      setErrors(validator(form));
    }, 100);

    return () => {
      clearTimeout(tId);
    };
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).every((i) => !i)) {
      try {
        const data = await request("/forms/", "POST", form);
        onSuccess();
        onCancel();
      } catch (error) {}
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <label htmlFor="is_public" className="inline-block mb-1">
        Title *
      </label>
      <input
        type="text"
        className="input w-full mb-2"
        name="title"
        value={form.title}
        required
        onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
      />
      {errors.title && <p className="text-red-400">{errors.title}</p>}
      <label htmlFor="is_public" className="inline-block mb-1 mt-4">
        Description
      </label>
      <input
        type="text"
        className="input mb-2 w-full"
        name="description"
        value={form.description}
        onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
      />
      {errors.description && (
        <p className="text-red-400">{errors.description}</p>
      )}
      <input
        type="checkbox"
        name="is_public"
        id="is_public"
        checked={form.is_public}
        className="mt-4 mr-2"
        onChange={(e) => handleFieldChange(e.target.name, e.target.checked)}
      />
      <label htmlFor="is_public">Is Public</label>
      <div className="flex gap-2">
        <button
          className="btn bg-slate-700 block mt-4"
          onClick={() => onCancel()}
        >
          cancel
        </button>
        <button className="btn block mt-4">Submit</button>
      </div>
    </form>
  );
};
