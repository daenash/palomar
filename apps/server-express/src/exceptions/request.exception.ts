export class RequestException extends Error {
  status: number;

  constructor(options?: { message: string; status: number }) {
    super(options?.message);
    this.status = options?.status ?? 500;
  }
}
