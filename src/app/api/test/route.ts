import { NextResponse } from 'next/server';
import { seedTestUser } from '@/lib/seed-users';
import { getAllUsers } from '@/lib/users';

export async function GET() {
  try {
    // Seed test user if not exists
    await seedTestUser();
    
    const users = getAllUsers();
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      userCount: users.length,
      testCredentials: {
        email: 'test@example.com',
        password: 'password123'
      }
    });
  } catch (error) {
    console.error('API test error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}