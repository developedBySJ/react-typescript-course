import { Field } from "./field.type";

export interface FormProps {
  id: number;
  // onClose: () => void;
}

export interface FormField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface FormData {
  id: number;
  title: string;
  formFields: Field[];
}
