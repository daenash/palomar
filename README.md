# Palomar 🏔️🔭🌌

A utility library that extracts types from your `express` backend and lets you use it with `axios` as a typesafe API client.

> **_Why not tRPC?_**
>
> This approach is really similar to tRPC, I might risk saying that it's a bastard son of the latter. tRPC was pretty much the inspiration behind this project.
>
> However this approach keeps the idea of separating routes by path and keeping the basic principles of a classic REST API, so this way we can write a really nice OpenAPI documentation for external usage if we'd like to allow other people to communicate with our server in some way. Moreover, it facilitates the type-safe utilization of the API within our monorepo, sparing us the complexity of generating client side API code.

---

## Overview

Overview of the features that Palomer offers

#### Validating input parameters

When it comes to validating request information Palomar uses `zod` to check path parameters, query parameters and the request body. Validation is straightforward and if it succeeds, the context of the request will contain the parsed input parameters with their proper type.

#### Typed middlewares

Palomar let's the developer creating and attaching middlewares to requests, and the returned data from those middlewares are accessible in the request's context.

_For example it's pretty easy to authenticate the user using a middleware and accessing that identified user on the request's context without any `d.ts` overwrite for the express request_

#### Client side API types

Palomar generates an API type from the routes defined using it's utility functions. Using this type on client side with Palomar's client utility developers can have a fully typed interface for calling the server.

_Palomar utilize `axios` to create such client, so all other axios related setups can be used with it!_

---

## Basic usage example

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

Create the _routers_ object by setting up the routers and controllers in it

```ts
// import { createRouter, createController } from "@palomar/server";
// import { z } from "zod";

const routers = {
  // Define routers with the `createRouter` helper
  demo: createRouter("/demo", {
    // Define controllers with the `createController` helper
    demoGetController: createController(
      // Set path and method
      { path: "/", method: "get" },

      // Set input and output schemas
      {
        schemas: z.object({
          query: z.object({
            num: z.preprocess(Number, z.number()).optional(),
          }),
        }),
        middlewares: [
          // Add middleware handlers one by one.
          // It gives access to the request object with the first argument
          createMiddleware((req) => {
            // ----------------------------------------------------
            // The returned data will be accessible in the controller's context
            return { multiplier: req.path.length };
          }),
        ],
      },

      // You get a controller function here with typed inputs and middleware data
      ({ context: { input, middlewares } }) => {
        // ------------------------------------------
        // Query is inferred from context.input
        // (parameter) input: { query: { num?: number | undefined; } }
        // ------------------------------------------
        // Multiplier is inferred from the middlewares.multiplier
        // (parameter) middlewares: { multiplier: number; }
        // ------------------------------------------
        const result = (input.query.num ?? 1) * middlewares.multiplier;

        // ------------------------------------------
        // Return type is inferred from zod output
        // ------------------------------------------
        return { result };
      }
    ),
  }),
};
```

Attach the routers to the app

```ts
// import { createAPI } from "@palomar/server";
const api = createAPI(app, routers);
```

Start listening on a port

```ts
app.listen(3000);
```

Export the types, so the frontend side can use it

```ts
// import { Apify } from "@palomar/server";
export type Api = Apify<typeof api>;
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
  // Query parameter is inferred from API
  // (property) query: { num?: number | undefined }
  // --------------------------------
  query: { num: 5 },
});

// --------------------------------
// Response type is inferred from the API
// const data: { result: number; }
// --------------------------------
console.log(data);
```

#### Demo file (React)

You can check the basic demo page using React with Vite [here](./apps/basic-demo-web/src/pages/home/Home.page.tsx)
