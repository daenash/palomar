import { Response } from "express";
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
  CF[K]["controller"]
>[0];

type ResParam<CF extends ControllerFunctions, K extends keyof CF> = Parameters<
  CF[K]["controller"]
>[1];

type FormatController<Prefix extends string, CF extends ControllerFunctions> = {
  [s in keyof CF]: {
    path: `${Prefix}${CF[s]["path"]}`;
    method: CF[s]["method"];
    query: ReqParam<CF, s>["query"];
    params: ReqParam<CF, s>["params"];
    body: ReqParam<CF, s>["body"];
    response: ResParam<CF, s> extends Response<infer U> ? U : unknown;
  };
};
