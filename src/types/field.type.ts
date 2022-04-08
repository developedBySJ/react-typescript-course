export interface BaseField {
  id: number;
  value: string;
  label: string;
  required?: boolean;
}

export const inputType = [
  "text",
  "email",
  "number",
  "tel",
  "url",
  "color",
  "date",
  "time",
  "month",
  "week",
] as const;

export type InputType = typeof inputType[number];

export interface InputField extends BaseField {
  kind: "text";
  type: InputType;
}

export const selectType = ["single", "multiple"] as const;

export type SelectType = typeof selectType[number];

export interface SelectField extends BaseField {
  kind: "dropdown";
  type: SelectType;
  options: string[];
}

export interface RadioField extends BaseField {
  kind: "radio";
  options: string[];
}

export interface LongTextField extends BaseField {
  kind: "longText";
}

export type Field = InputField | SelectField | RadioField | LongTextField;
export type FieldType = SelectType | InputType;
export const KIND = ["text", "dropdown", "radio", "longText"] as const;

export type KindType = typeof KIND[number];
