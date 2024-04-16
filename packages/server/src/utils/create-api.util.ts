import { default as express } from "express";
import { Routers } from "../types/apify.types";

export const createAPI = <R extends Routers>(
  app: ReturnType<typeof express>,
  routers: R
) => {
  Object.values(routers).forEach((router) => {
    app.use(router.path, router.router);
  });
  return routers;
};
