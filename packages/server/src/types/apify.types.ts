import { createController } from "../utils/create-controller.util";
import { createRouter } from "../utils/create-router.util";

export type ControllerFunctions = Record<
  string,
  ReturnType<typeof createController>
>;
export type Routers = Record<string, ReturnType<typeof createRouter>>;

export type Apify<R extends Routers> = {
  [routeName in keyof R]: FormatController<
    R[routeName]["path"],
    R[routeName]["controller"]
  >[keyof R[routeName]["controller"]];
}[keyof R];

type ReqParam<CF extends ControllerFunctions, K extends keyof CF> = Parameters<
  CF[K]["_handler"]
>[0];

type FormatController<Prefix extends string, CF extends ControllerFunctions> = {
  [s in keyof CF]: {
    path: `${Prefix}${CF[s]["path"]}`;
    method: CF[s]["method"];
    query: ReqParam<CF, s>["query"];
    params: ReqParam<CF, s>["params"];
    body: ReqParam<CF, s>["body"];
    response: Awaited<ReturnType<CF[s]["_handler"]>>;
  };
};
