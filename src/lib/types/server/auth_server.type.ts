export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  avatar: string | null;
  createdAt: string;
}

export interface VerifyOtpResponse {
  token: string;
  user: User;
}
