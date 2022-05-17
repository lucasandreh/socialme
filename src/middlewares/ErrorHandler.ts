import type {
  NextFunction,
  Request, Response,
} from 'express';

export default function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) {
  if (error instanceof Error) {
    response.status(400).json({
      message: error.message,
    });
  } else {
    response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
