import { AxiosInstance } from 'axios';

export type TApi = {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete' | 'update';
  query: unknown | object;
  params: unknown | object;
  body: unknown | object;
  response: unknown | object;
};

type CheckArgsArray<T> = T extends undefined[] ? [] : T;
type CheckEmpty<T extends Record<string, unknown>> = keyof T extends never
  ? undefined
  : T;

type FilterPath<T> = Omit<T, 'path' | 'method' | 'response'>;
type FilterUnknown<T> = {
  [K in keyof T as T[K] extends string | number | object ? K : never]: T[K];
};

const methods = ['get', 'post', 'patch', 'delete', 'update'] as const;

export const createApiClient = <Api extends TApi>(
  axiosInstance: AxiosInstance,
) => {
  const apiCreator = <M extends (typeof methods)[number]>(m: M) => {
    const api = async <
      P extends Extract<Api, { method: typeof m }>['path'],
      A extends Extract<Api, { path: P }>,
    >(
      path: P,
      ...args: CheckArgsArray<[CheckEmpty<FilterPath<FilterUnknown<A>>>]>
    ) => {
      let replacedPath: string = path;
      const o = (args[0] ?? {}) as A;

      // Replace params in path
      if (o.params) {
        Object.entries(o.params).forEach(([key, value]) => {
          replacedPath = path.replace(`:${key}`, value);
        });
      }

      return axiosInstance<A['response']>({
        method: m,
        data: o.body,
        params: o.query,
        url: replacedPath,
      });
    };

    return api;
  };

  type FilteredResponse = Pick<
    {
      [s in (typeof methods)[number]]: Extract<Api, { method: s }> extends never
        ? never
        : ReturnType<typeof apiCreator<s>>;
    },
    Api['method']
  >;

  return {
    get: apiCreator('get'),
    post: apiCreator('post'),
    patch: apiCreator('patch'),
    update: apiCreator('update'),
    delete: apiCreator('delete'),
  } as unknown as FilteredResponse;
};
