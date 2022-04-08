import {
  AddNewInputFieldAction,
  ClearFormAction,
  RemoveInputFieldAction,
  SetFormTitleAction,
  SetInputField,
  SetInputFieldOptions,
  SetInputFieldRequired,
  SetInputFieldType,
  SetKindAction,
  SetNewFieldAction,
} from "../../types/action.type";

type DispatchFunc<A extends { payload?: P }, P = any> = (
  payload: A["payload"]
) => A;

export const setKind: DispatchFunc<SetKindAction> = (payload) => {
  return {
    type: "set_kind",
    payload,
  };
};

export const setNewField: DispatchFunc<SetNewFieldAction> = (payload) => {
  return {
    type: "set_new_field",
    payload,
  };
};

export const clearForm = (): ClearFormAction => {
  return { type: "clear_form" };
};

export const setFormTitle: DispatchFunc<SetFormTitleAction> = (payload) => {
  return {
    type: "set_form_title",
    payload,
  };
};

export const addInputField: DispatchFunc<AddNewInputFieldAction> = (
  payload
) => {
  return {
    type: "add_input_field",
    payload,
  };
};

export const removeInputField: DispatchFunc<RemoveInputFieldAction> = (
  payload
) => {
  return {
    type: "remove_input_field",
    payload,
  };
};

export const setInputField: DispatchFunc<SetInputField> = (payload) => {
  return {
    type: "set_input_field",
    payload,
  };
};

export const setInputFieldRequired: DispatchFunc<SetInputFieldRequired> = (
  payload
) => {
  return {
    type: "set_input_field_required",
    payload,
  };
};

export const setInputFieldType: DispatchFunc<SetInputFieldType> = (payload) => {
  return {
    type: "set_input_field_type",
    payload,
  };
};
export const setInputFieldOptions: DispatchFunc<SetInputFieldOptions> = (
  payload
) => {
  return {
    type: "set_input_field_options",
    payload,
  };
};
