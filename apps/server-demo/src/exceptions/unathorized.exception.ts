import { RequestException } from "./request.exception";

export class UnathorizedException extends RequestException {
  constructor(message?: string) {
    super({ message: message || "Unathorized", status: 401 });
  }
}
