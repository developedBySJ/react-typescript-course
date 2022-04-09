export interface Form {
  title: string;
  description?: string;
  is_public?: boolean;
}

export interface Login {
  username: string;
  password: string;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

export type Pagination<T = any> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
