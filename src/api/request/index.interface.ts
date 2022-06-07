export interface ErrorResponse {
  code: string;
  errors: {
    code: string;
    message: string;
    status: number;
  };
  message: string;
}