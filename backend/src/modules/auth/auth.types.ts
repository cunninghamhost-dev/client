/*
|--------------------------------------------------------------------------
| Authentication Types
|--------------------------------------------------------------------------
*/

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

/*
|--------------------------------------------------------------------------
| JWT Payload
|--------------------------------------------------------------------------
*/

export interface JwtPayload {
  userId: string;
  role: "USER" | "ADMIN";
}


