import * as authService from "./auth.service.js";
/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/
export const register = async (req, res) => {
    const data = req.body;
    const result = await authService.register(data);
    res.status(201).json({
        success: true,
        message: "Registration successful! You can now log in.",
        data: result,
    });
};
/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/
export const login = async (req, res) => {
    try {
        const data = req.body;
        const result = await authService.login(data);
        // 1. Set JWT as HTTP-only cookie (Secure, hidden from JS)
        res.cookie("token", result.token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
        // 2. NEW: Set a UI-flag cookie (Visible to JS)
        // We set httpOnly: false so document.cookie can see it
        res.cookie("isLoggedIn", "true", {
            httpOnly: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user,
            },
        });
    }
    catch (error) {
        // ... your existing catch block
    }
};
/*
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/
export const logout = (req, res) => {
    // Clear the cookie with the exact same options as login
    res.clearCookie('token', {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};
//# sourceMappingURL=auth.controller.js.map