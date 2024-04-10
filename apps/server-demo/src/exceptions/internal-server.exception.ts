import { RequestException } from "./request.exception";

export class InternalServerException extends RequestException {
  constructor(message?: string) {
    super({ message: message || "Unexpected error", status: 500 });
  }
}
