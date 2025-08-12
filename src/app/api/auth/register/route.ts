import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '@/lib/users';
import { authRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);

  // Rate limiting
  if (!authRateLimit.isAllowed(clientId)) {
    logger.warn('Registration rate limit exceeded', { clientId });
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email.toLowerCase());

    if (existingUser) {
      logger.info('Registration attempt for existing user', { email });
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user using hybrid storage
    const user = await createUser(email.toLowerCase(), hashedPassword);

    logger.info('User registered successfully', { userId: user.id, email: user.email });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Registration error', { error: error instanceof Error ? error.message : 'Unknown error', clientId });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}