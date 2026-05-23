import { api } from '@/lib/api';
import { ApiResponse } from '@/lib/types/server/api_server.type';
import { VerifyOtpResponse } from '@/lib/types/server/auth_server.type';
import { LoginPayload, RegisterPayload, VerifyOtpPayload, ResendOtpPayload } from '@/lib/schemas/authentication.schema';

/** ***********************************************
 * Register User
 * *********************************************** */
export async function registerUser(payload: RegisterPayload): Promise<ApiResponse<null | undefined>> {
  const res = await api.post<ApiResponse<undefined>>('/api/auth/register', payload);
  return res.data;
}

/** ************************************************
 * Login User
 * *********************************************** */
export async function loginUser(payload: LoginPayload): Promise<ApiResponse<null | undefined>> {
  const res = await api.post<ApiResponse<undefined>>('/api/auth/login', payload);
  return res.data;
}

/** ************************************************
 * Verify OTP
 * *********************************************** */
export async function verifyOtp(payload: VerifyOtpPayload): Promise<ApiResponse<VerifyOtpResponse>> {
  const res = await api.post<ApiResponse<VerifyOtpResponse>>('/api/auth/verify-otp', payload);
  console.log('OTP verification response:', res.data);
  return res.data;
}

/** ************************************************
 * Resend OTP
 * *********************************************** */
export async function resendOtp(payload: ResendOtpPayload): Promise<ApiResponse<null | undefined>> {
  const res = await api.post<ApiResponse<undefined>>('/api/auth/resend-otp', { payload });
  console.log('OTP resend response:', res.data);
  return res.data;
}

/** ************************************************
 * Logout from Application
 * *********************************************** */
export async function logout(): Promise<ApiResponse<null | undefined>> {
  const res = await api.post('/api/auth/logout');
  return res.data;
}