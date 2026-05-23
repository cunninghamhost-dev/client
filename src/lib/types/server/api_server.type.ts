export interface ApiResponse<T> {
  code: number;
  status: 'SUCCESS' | 'FAILED' | 'ERROR';
  message: string;
  data?: T;
}
