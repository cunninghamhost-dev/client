export interface ITiqwaErrorResponse {
  code: string;
  message: string;
  errors?: Array<{
    field: string;
    reason: string;
  }>;
}
