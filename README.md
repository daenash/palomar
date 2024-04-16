# Palomar 🏔️🔭🌌

> Let's see what's beyond

A utility library that extracts types from your `express` backend and lets you use it with `axios` as a typesafe API client.

> **_Why not using tRPC?_**
>
> This approach is really similar to tRPC, I might risk saying that it's a far far cousin of the latter.
>
> However it keeps the idea of separating routes by path and keeping the basic principles of a classic REST API. So this way we can write a really nice OpenAPI documentation for external usage if we'd like to allow other people to communicate with our server in some way. Moreover, it facilitates the type-safe utilization of the API within our monorepo, sparing us the complexity of generating API clients from OpenAPI documentations or code.

## Basic Usage

### Server side

On the backend side install the following dependencies

```sh
bun add express zod @palomar/server
```

Initialize a new express app

```ts
// import express from "express";
const app = express();
```

Create the _erpc_ object by setting up the routers and controllers in it

```ts
// import { createRouter, createController } from "@palomar/server";
// import { z } from "zod";

const erpc = {
  // Define routers with the `createRouter` helper
  demo: createRouter("/demo", {
    // Define controllers with the `createController` helper
    demoGetController: createController(
      // Set path and method
      { path: "/", method: "get" },

      // Set input and output schemas
      {
        schemas: {
          input: z.object({
            query: z.object({
              search: z.string().optional(),
            }),
          }),
          output: z.object({ success: z.boolean() }),
        },
      },

      // You get a typed RequestHandler here
      (req, res, _next) => {
        // ------------------------------------------
        // Query is inferred from zod input
        // (property) search?: string | undefined
        // ------------------------------------------
        // console.log(req.query.search);

        // ------------------------------------------
        // Body is inferred from zod output
        // send(body?: { success: boolean; } | undefined)
        // ------------------------------------------
        res.send({ success: true });
      }
    ),
  }),
};
```

Attach the erpc object to the app

```ts
// import { attachERPC } from "@palomar/server";
attachERPC(app, erpc);
```

Start listening on a port

```ts
app.listen(3000);
```

Export the types, so the frontend side can use it

```ts
// import { Apify } from "@palomar/server";
export type Api = Apify<typeof erpc>;
```

#### Demo file

You can check the entire basic demo file with additional `cors()` setup [here](./apps/basic-demo-server/src/index.ts)

### Client side

On the client side run the followin command to install the required dependencies

```sh
bun add axios @palomar/client
```

Create an _api_ utility file somewhere in your frontend folder structure (e.g. `src/api/api.ts`)

In this file, create an axios instance and create the typed API client by passing the `API` type exported from the server side to the generic `createApiClient` function.

```ts
import axios from "axios";

import { createApiClient } from "@palomar/client";
import type { Api } from "../../../basic-demo-server/src/index";

const baseClient = axios.create({ baseURL: "http://localhost:3000" });

export const client = createApiClient<Api>(baseClient);
```

Now the `client` variable should be fully typed and should be responsive with any server changes.

In this demo, the `.get` part of the client is available with the `/demo/` path and it can use a `query` parameter

```ts
const { data } = await client.get("/demo/", {
  // --------------------------------
  // search query parameter is inferred from API
  //
  // (property) query: {
  //    search?: string | undefined;
  //  }
  // --------------------------------
  query: { search: "test" },
});
```

#### Demo file (React)

You can check the basic demo page using React with Vite [here](./apps/basic-demo-web/src/pages/home/Home.page.tsx)
