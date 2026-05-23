import { apiClient } from '@/lib/api/apiClient';
import { RegisterPayload } from '@/lib/schemas/authentication.schema';

export async function registerService(payload: RegisterPayload): Promise<void> {
  return apiClient('/auth/register', {
    method: 'POST',
    body: payload,
  });
}
