export class TiqwaApiErrorUtil<TDetails = unknown> extends Error {
  readonly status: number;
  readonly details?: TDetails;
  constructor(status: number, message: string, details?: TDetails) {
    super(message);
    this.name = 'TiqwaApiError';
    this.status = status;
    this.details = details;
  }
}
