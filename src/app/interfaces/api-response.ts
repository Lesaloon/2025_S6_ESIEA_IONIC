export interface ApiResponse<T> {
  success: boolean;
  payload: T | T[]; // This can be a specific type if needed
  message?: string; // Optional message for additional context
  errorCode?: string; // Optional error code for error handling
}
