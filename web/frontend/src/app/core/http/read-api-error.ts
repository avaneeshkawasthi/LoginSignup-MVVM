import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/app.models';

export function readApiError(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as ApiError | undefined;
    return body?.message || error.statusText || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
