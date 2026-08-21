import { ZodError } from 'zod';
import { AppError } from '../../application/errors/app-error.js';

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      code: 'VALIDATION_ERROR',
      message: err.errors[0]?.message ?? 'Please check the form and try again.',
      details: err.errors
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message
    });
  }

  console.error(err);
  return res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please try again.'
  });
}
