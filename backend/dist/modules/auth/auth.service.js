import { prisma } from "../../lib/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
import { AppError } from "../../utils/errors.js";
/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/
export async function register(data) {
    const { firstName, lastName, email, password } = data;
    const name = `${firstName} ${lastName}`;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }
    // Hash password
    const hashedPassword = await hashPassword(password);
    // Create user
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "USER",
        }
    });
    // Generate JWT
    const token = generateToken({
        userId: user.id,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
}
/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/
export async function login(data) {
    const { email, password } = data;
    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    // Generate token
    const token = generateToken({
        userId: user.id,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
}
//# sourceMappingURL=auth.service.js.map