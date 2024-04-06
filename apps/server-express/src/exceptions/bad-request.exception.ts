import { RequestException } from "./request.exception";

export class BadRequestException extends RequestException {
  constructor(message?: string) {
    super({ message: message || "Bad request", status: 400 });
  }
}
