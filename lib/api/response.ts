import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { AppError } from './errors';
import { ZodError } from 'zod';

export function successResponse<T>(data: T, status: number = 200, meta?: any): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status }
  );
}

export function errorResponse(error: unknown): NextResponse<ApiResponse> {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input parameters',
          details: error.flatten().fieldErrors,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 400 }
    );
  }

  console.error('Unhandled API Error:', error);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: 500 }
  );
}
