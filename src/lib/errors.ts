export class HttpError extends Error {
  public status: number;
  public statusText: string;

  constructor(status: number, statusText: string) {
    super("HTTP Error");
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
  }
}

export const httpErrorFromResponse = (response: Response): HttpError =>
  new HttpError(response.status, response.statusText);

export const isHttpError = (candidate: unknown): candidate is HttpError =>
  candidate instanceof HttpError;
