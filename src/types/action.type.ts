import { Field, FieldType, KindType } from "./field.type";

export type SetKindAction = {
  type: "set_kind";
  payload: KindType;
};

export type SetNewFieldAction = {
  type: "set_new_field";
  payload: string;
};

export type AddNewInputFieldAction = {
  type: "add_input_field";
  payload: Field;
};

export type RemoveInputFieldAction = {
  type: "remove_input_field";
  payload: number;
};

export type SetFormTitleAction = {
  type: "set_form_title";
  payload: string;
};

export type ClearFormAction = {
  type: "clear_form";
};

export type SetInputField = {
  type: "set_input_field";
  payload: {
    id: number;
    value: string;
  };
};

export type SetInputFieldRequired = {
  type: "set_input_field_required";
  payload: {
    id: number;
    required: boolean;
  };
};

export type SetInputFieldType = {
  type: "set_input_field_type";
  payload: {
    id: number;
    type: FieldType;
  };
};

export type SetInputFieldOptions = {
  type: "set_input_field_options";
  payload: {
    id: number;
    options: string[];
  };
};

export type FormAction =
  | SetKindAction
  | SetNewFieldAction
  | AddNewInputFieldAction
  | RemoveInputFieldAction
  | SetFormTitleAction
  | ClearFormAction
  | SetInputField
  | SetInputFieldRequired
  | SetInputFieldType
  | SetInputFieldOptions;
