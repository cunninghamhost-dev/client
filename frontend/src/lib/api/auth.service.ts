// src/lib/api/auth.service.ts

import { apiClient } from './apiClient';

type LoginPayload = {
  email: string;
  password: string;
};

type AuthData = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function loginUser(data: any) {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  if (!res.ok) {
    throw new ApiError(response.message || 'Login failed');
  }

  return response.data;
}