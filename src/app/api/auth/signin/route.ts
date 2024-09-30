import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Mock authentication logic
  if (email === 'admin@example.com' && password === 'password') {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}