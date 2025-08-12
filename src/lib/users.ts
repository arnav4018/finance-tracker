import fs from 'fs';
import path from 'path';
import { createUserInDB, findUserByEmailInDB, findUserByIdInDB, initializeDatabase } from './database';

// Hybrid storage system - uses database if available, falls back to file storage
export interface User {
  id: number;
  email: string;
  password: string;
}

const USERS_FILE = path.join(process.cwd(), 'temp-users.json');
let isDatabaseAvailable: boolean | null = null;

// Check if database is available
async function checkDatabaseAvailability(): Promise<boolean> {
  if (isDatabaseAvailable !== null) {
    return isDatabaseAvailable;
  }
  
  isDatabaseAvailable = await initializeDatabase();
  return isDatabaseAvailable;
}

// File-based storage functions (fallback)
function loadUsersFromFile(): User[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users from file:', error);
  }
  return [];
}

function saveUsersToFile(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users to file:', error);
  }
}

function getNextFileId(): number {
  const users = loadUsersFromFile();
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

// Hybrid functions that use database or file storage
export async function createUser(email: string, hashedPassword: string): Promise<User> {
  const useDatabase = await checkDatabaseAvailability();
  
  if (useDatabase) {
    try {
      const dbUser = await createUserInDB(email, hashedPassword);
      console.log('User created in database:', { id: dbUser.id, email: dbUser.email });
      return dbUser;
    } catch (error) {
      console.error('Database user creation failed, falling back to file:', error);
      isDatabaseAvailable = false;
    }
  }
  
  // Fallback to file storage
  const users = loadUsersFromFile();
  const user: User = {
    id: getNextFileId(),
    email,
    password: hashedPassword,
  };
  users.push(user);
  saveUsersToFile(users);
  console.log('User created in file:', { id: user.id, email: user.email, passwordHash: hashedPassword.substring(0, 10) + '...' });
  console.log('Total users in file storage:', users.length);
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const useDatabase = await checkDatabaseAvailability();
  
  if (useDatabase) {
    try {
      const dbUser = await findUserByEmailInDB(email);
      console.log('Database lookup for:', email, 'Found:', dbUser ? 'Yes' : 'No');
      return dbUser || undefined;
    } catch (error) {
      console.error('Database user lookup failed, falling back to file:', error);
      isDatabaseAvailable = false;
    }
  }
  
  // Fallback to file storage
  const users = loadUsersFromFile();
  console.log('File lookup for user with email:', email);
  console.log('Available users in file:', users.map(u => u.email));
  const user = users.find(user => user.email === email);
  console.log('Found user in file:', user ? 'Yes' : 'No');
  return user;
}

export async function findUserById(id: number): Promise<User | undefined> {
  const useDatabase = await checkDatabaseAvailability();
  
  if (useDatabase) {
    try {
      const dbUser = await findUserByIdInDB(id);
      return dbUser || undefined;
    } catch (error) {
      console.error('Database user lookup by ID failed, falling back to file:', error);
      isDatabaseAvailable = false;
    }
  }
  
  // Fallback to file storage
  const users = loadUsersFromFile();
  return users.find(user => user.id === id);
}

export function getAllUsers(): User[] {
  // For file storage only (used for debugging)
  return loadUsersFromFile();
}

// Force database check (useful for testing)
export async function recheckDatabase(): Promise<boolean> {
  isDatabaseAvailable = null;
  return await checkDatabaseAvailability();
}