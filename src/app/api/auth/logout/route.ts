import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Pass the token to the backend logout so the backend knows WHO is logging out
  await fetch('http://localhost:5000/api/auth/logout', { 
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const response = NextResponse.json({ success: true });

  // Clear the secure cookie
  response.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
  
  // Clear the UI-visible cookie (The one your Navbar needs!)
  response.cookies.set('isLoggedIn', '', { httpOnly: false, path: '/', maxAge: 0 });

  return response;
}
