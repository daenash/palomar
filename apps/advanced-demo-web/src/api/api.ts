import axios from "axios";

import { createApiClient } from "@palomar/client";
import type { Api } from "../../../advanced-demo-server/src/index";

const baseClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const client = createApiClient<Api>(baseClient);
