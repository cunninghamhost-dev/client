import type { Request, Response } from "express";
import * as authService from "./auth.service.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const register = async (req: Request, res: Response) => {
  const data: RegisterInput = req.body;

  const result = await authService.register(data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const login = async (req: Request, res: Response) => {
  const data: LoginInput = req.body;

  const result = await authService.login(data);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
