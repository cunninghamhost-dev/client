import { NextRequest, NextResponse } from 'next/server';

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}

type AppRouteHandler<TContext = unknown> = (request: NextRequest, context: TContext) => Promise<Response>;

/**
 * Global App Router Error Handler Wrapper
 */
export function withErrorHandling<TContext = unknown>(handler: AppRouteHandler<TContext>): AppRouteHandler<TContext> {
  return async (request: NextRequest, context: TContext): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error: unknown) {
      console.error('API Error:', {
        path: request.nextUrl.pathname,
        method: request.method,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
      });

      let statusCode = 500;
      let message = 'Internal Server Error';
      let code = 'ERR_INTERNAL_SERVER';

      /**
       * Handle known errors
       */
      if (error instanceof Error) {
        message = error.message;

        if (typeof error === 'object' && error !== null && 'response' in error) {
          const apiError = error as {
            response?: {
              statusCode?: number;
              result?: {
                errors?: Array<{
                  detail?: string;
                  title?: string;
                }>;
              };
            };
          };
          if (apiError.response) {
            statusCode = apiError.response.statusCode ?? 500;

            const firstError = apiError.response.result?.errors?.[0];

            message = firstError?.detail ?? firstError?.title ?? 'External API Error';
          }
        }

        if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
          statusCode = 503;
          message = 'Service Unavailable';
          code = 'ERR_SERVICE_UNAVAILABLE';
        }

        // Unauthorized
        if (error.message.toLowerCase().includes('unauthorized')) {
          statusCode = 401;
          code = 'ERR_UNAUTHORIZED';
        }

        // Forbidden
        if (error.message.toLowerCase().includes('forbidden')) {
          statusCode = 403;
          code = 'ERR_FORBIDDEN';
        }

        // Validation
        if (error.message.toLowerCase().includes('validation')) {
          statusCode = 400;
          code = 'ERR_VALIDATION';
        }

        // Not Found
        if (error.message.toLowerCase().includes('not found')) {
          statusCode = 404;
          code = 'ERR_NOT_FOUND';
        }
      }

      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: message,
          code,
          ...(process.env.NODE_ENV === 'development' && {
            details: error,
          }),
        },
        {
          status: statusCode,
        },
      );
    }
  };
}
