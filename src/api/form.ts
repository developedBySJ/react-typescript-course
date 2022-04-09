import { Pagination } from "../types/api.action";
import { FieldModel, FormModel } from "../types/model";
import { request } from "./request";

interface GetFormsParams {
  limit?: number;
  offset?: number;
}

export const getForms = async (payload: GetFormsParams) => {
  const data = await request<Pagination<FormModel>>("/forms/", "GET", payload);
  return data;
};

export const getForm = async (id: number) => {
  const data = await request<FormModel>(`/forms/${id}/`, "GET", {});
  return data;
};

export const updateForm = async (payload: FormModel) => {
  const data = await request<FormModel>(
    `/forms/${payload.id}/`,
    "PUT",
    payload
  );
  return data;
};

interface GetFormFields {
  form_pk: number;
}

export const getFormFields = async ({ form_pk }: GetFormFields) => {
  const data = await request<Pagination<FieldModel>>(
    `/forms/${form_pk}/fields/`,
    "GET",
    {}
  );
  return data;
};

interface CreateFormField extends Pick<FieldModel, "kind" | "label"> {
  form_pk: number;
  options?: string[];
}
export const createFormField = async ({
  form_pk,
  ...payload
}: CreateFormField) => {
  const data = await request<FieldModel>(
    `/forms/${form_pk}/fields/`,
    "POST",
    payload
  );
  return data;
};

interface BaseFormFields {
  form_pk: number;
  payload: FieldModel;
}

export const updateFormField = async ({ form_pk, payload }: BaseFormFields) => {
  const data = await request<FieldModel>(
    `/forms/${form_pk}/fields/${payload.id}/`,
    "PUT",

    payload
  );
  return data;
};

export const deleteFormFields = async ({
  form_pk,
  id,
}: {
  id: number;
  form_pk: number;
}) => {
  const data = await request<null>(
    `/forms/${form_pk}/fields/${id}/`,
    "DELETE",
    {}
  );
  return data;
};
