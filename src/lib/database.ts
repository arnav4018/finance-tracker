// Database configuration and utilities
import { PrismaClient } from '@/generated/prisma';

declare global {
  var __prisma: PrismaClient | undefined;
}

// Create a singleton Prisma client
export const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Database connection test
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Initialize database tables if needed
export async function initializeDatabase() {
  try {
    // Test if we can connect to the database
    const isConnected = await testDatabaseConnection();
    
    if (!isConnected) {
      console.log('Database not available, using file-based storage');
      return false;
    }

    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

// User operations with database
export async function createUserInDB(email: string, hashedPassword: string) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

export async function findUserByEmailInDB(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserByIdInDB(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}