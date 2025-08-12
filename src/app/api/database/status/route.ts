import { NextResponse } from 'next/server';
import { testDatabaseConnection, initializeDatabase } from '@/lib/database';
import { recheckDatabase } from '@/lib/users';

export async function GET() {
  try {
    const isConnected = await testDatabaseConnection();
    const isInitialized = await initializeDatabase();
    
    return NextResponse.json({
      database: {
        connected: isConnected,
        initialized: isInitialized,
        status: isConnected ? 'available' : 'unavailable',
        fallback: isConnected ? 'none' : 'file-storage'
      },
      storage: {
        primary: isConnected ? 'database' : 'file',
        fallback: 'file-storage'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      database: {
        connected: false,
        initialized: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        fallback: 'file-storage'
      },
      storage: {
        primary: 'file',
        fallback: 'file-storage'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Force recheck database connection
    const isAvailable = await recheckDatabase();
    
    return NextResponse.json({
      message: 'Database connection rechecked',
      database: {
        available: isAvailable,
        status: isAvailable ? 'available' : 'unavailable'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to recheck database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}