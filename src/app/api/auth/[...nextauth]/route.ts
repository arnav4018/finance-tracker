import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '@/lib/users';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          console.log('Attempting to authenticate user:', credentials.email);
          
          // Find user in hybrid storage (database or file)
          const user = await findUserByEmail(credentials.email);
          console.log('User found:', user ? 'Yes' : 'No');

          if (!user) {
            console.log('User not found in storage');
            return null;
          }

          console.log('Comparing passwords...');
          // Check password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          console.log('Password valid:', isValidPassword);

          if (isValidPassword) {
            console.log('Authentication successful for:', user.email);
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.email,
            };
          }

          console.log('Password comparison failed');
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };