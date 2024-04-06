import { AxiosInstance } from "axios";

import type { Api } from "../../../server-express/src/index";

type CheckArgsArray<T> = T extends undefined[] ? [] : T;
type CheckEmpty<T extends Record<string, unknown>> = keyof T extends never
  ? undefined
  : T;

type FilterPath<T> = Omit<T, "path" | "method" | "response">;
type FilterUnknown<T> = {
  [K in keyof T as T[K] extends string | number | object ? K : never]: T[K];
};

export const createApiClient = (axiosInstance: AxiosInstance) => {
  const api = async <
    P extends Api["path"],
    A extends Extract<Api, { path: P }>,
  >(
    path: P,
    method: A["method"],
    ...args: CheckArgsArray<[CheckEmpty<FilterPath<FilterUnknown<A>>>]>
  ) => {
    const o = (args[0] ?? {}) as A;

    // Replace params in path
    if (o.params) {
      Object.entries(o.params).forEach(([key, value]) => {
        path.replace(key, value);
      });
    }

    return axiosInstance<A["response"]>({
      method,
      data: o.body,
      params: o.query,
      url: path,
    });
  };

  return api;
};
