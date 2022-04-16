export interface FormModel {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedDate: Date;
}

export enum KindEnum {
  TEXT = "TEXT",
  DROPDOWN = "DROPDOWN",
  RADIO = "RADIO",
  GENERIC = "GENERIC",
}

export interface FieldModel {
  id: number;
  label: string;
  kind: KindEnum;
  options: string[] | null;
  value: string;
  meta: any;
}
