import { FORM_DATA_KEY } from "../components/Form";
import { FormData, FormField } from "../types/forms.types";

export const initialFormField: FormField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

export const getForms = () => {
  const rawForms = localStorage.getItem(FORM_DATA_KEY);
  const forms = (rawForms ? JSON.parse(rawForms) : []) as FormData[];
  return forms;
};

export const saveToLocalStorage = (formField: FormData) => {
  const localForms = getForms();

  const filteredLocalForms = localForms.filter(
    (form) => form.id !== formField.id
  );

  localStorage.setItem(
    FORM_DATA_KEY,
    JSON.stringify([...filteredLocalForms, formField])
  );
};

export const getFromLocalStorage = (id: number): FormData | undefined => {
  const forms = getForms();

  const existingForm = forms.find((form) => form.id === id);

  return existingForm;
};
