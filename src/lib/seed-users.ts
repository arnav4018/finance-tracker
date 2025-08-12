import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from './users';

export async function seedTestUser() {
  const testEmail = 'test@example.com';
  
  // Check if test user already exists
  if (findUserByEmail(testEmail)) {
    console.log('Test user already exists');
    return;
  }

  // Create test user with password 'password123'
  const hashedPassword = await bcrypt.hash('password123', 12);
  const user = createUser(testEmail, hashedPassword);
  
  console.log('Test user created:', { id: user.id, email: user.email });
}