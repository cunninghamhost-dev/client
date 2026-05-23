import { AxiosError } from 'axios';

interface BackendErrorResponse {
  code: number;
  status: string;
  message: string;
}

export const getApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as BackendErrorResponse;

    return response?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};
