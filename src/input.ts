export type Primitive = Object | Primitive[] | number | string | boolean;

export interface Input {
  params: { [key: string]: string };
  query: { [key: string]: string | string[]; }
  cookies: { [key: string]: string };
  body?: Primitive;
  headers: { [key: string]: string };
};