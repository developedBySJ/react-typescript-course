import React from "react";
import { FormAction } from "../../types/action.type";
import { KindType } from "../../types/field.type";
import { FormData } from "../../types/forms.types";

interface InitialFormState {
  kind: KindType;
  newField: string;
  formData: FormData;
}

export const formReducer: React.Reducer<InitialFormState, FormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "set_kind": {
      return {
        ...state,
        kind: action.payload,
      };
    }

    case "set_new_field": {
      return {
        ...state,
        newField: action.payload,
      };
    }

    case "remove_input_field": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.filter(
            (field) => field.id !== action.payload
          ),
        },
      };
    }

    case "add_input_field": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: [...state.formData.formFields, action.payload],
        },
      };
    }

    case "set_form_title": {
      return {
        ...state,
        formData: {
          ...state.formData,
          title: action.payload,
        },
      };
    }

    case "clear_form": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) => ({
            ...field,
            value: "",
          })),
        },
      };
    }

    case "set_input_field": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) =>
            field.id === action.payload.id
              ? { ...field, label: action.payload.value }
              : field
          ),
        },
      };
    }

    case "set_input_field_required": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) =>
            field.id === action.payload.id
              ? { ...field, required: action.payload.required }
              : field
          ),
        },
      };
    }

    case "set_input_field_type": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) =>
            field.id === action.payload.id
              ? { ...field, type: action.payload.type as any }
              : field
          ),
        },
      };
    }
    case "set_input_field_options": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) =>
            field.id === action.payload.id
              ? { ...field, options: action.payload.options }
              : field
          ),
        },
      };
    }
    default:
      return state;
  }
};
