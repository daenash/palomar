import axios from "axios";

import { createApiClient } from "@express-rpc/client";
import type { Api } from "../../../basic-demo-server/src/index";

const baseClient = axios.create({ baseURL: "http://localhost:3000" });

export const client = createApiClient<Api>(baseClient);
