import axios from "axios";

import { createApiClient } from "@erpc/client";
import type { Api } from "../../../server-express/src/index";

const baseClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const api = createApiClient<Api>(baseClient);
