import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
  const user = await prisma.user.findUnique({
    where: { email: credentials?.email },
  });
  if (user && user.password === credentials?.password) {
    // Convert id to string for NextAuth compatibility
    return {
      ...user,
      id: user.id.toString(),
    };
  }
  return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);