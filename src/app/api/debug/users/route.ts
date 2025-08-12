import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/users';

export async function GET() {
  const users = getAllUsers();
  return NextResponse.json({
    userCount: users.length,
    users: users.map(user => ({
      id: user.id,
      email: user.email,
      passwordHash: user.password.substring(0, 10) + '...'
    }))
  });
}