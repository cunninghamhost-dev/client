import { NextResponse } from 'next/server';

export interface ApiSuccessResponse<T> {
  ok: boolean;
  message: string;
  profile: T;
}

export function success<T>(profile: T, message = 'Success', status = 200) {
  return NextResponse.json({ ok: true, message, profile }, { status });
}

export function failure(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export interface BackendErrorResponse {
  ok: false;
  message: string;
}

export async function fetchJSON<T, TError = BackendErrorResponse>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  const json = await res.json();

  // if (!res.ok) {
  //   throw new Error(json?.message ?? res.statusText);
  // }

  if (!res.ok) {
    console.error('Response Utility: ', json?.message ?? res.statusText, res.status, json as TError);
    throw new ApiError<TError>(json?.message ?? res.statusText, res.status, json as TError);
  }

  if (!('profile' in json)) {
    throw new ApiError('Malformed API response: missing profile', 500, json);
  }

  // ✅ Always return the `profile` field (your backend wraps actual data inside it)
  return json.profile as T;
}

export class ApiError<TPayload = unknown> extends Error {
  public readonly status: number;
  public readonly payload: TPayload;

  constructor(message: string, status: number, payload: TPayload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}
