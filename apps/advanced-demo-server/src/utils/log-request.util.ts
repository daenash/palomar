import { Request } from "express";

export const logRequest = (r: Request) => {
  const rr = { params: r.params, body: r.body, query: r.query };
  const clearedR = Object.entries(rr).reduce<Record<string, unknown>>(
    (pv, [k, v]) => {
      if (v) {
        pv[k] = v;
      }
      return pv;
    },
    {}
  );
  console.log(clearedR);
};
