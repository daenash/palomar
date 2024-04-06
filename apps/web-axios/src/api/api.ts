import axios from "axios";
import { createApiClient } from "../utils/api-creator.util";

const baseClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const api = createApiClient(baseClient);
