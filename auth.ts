import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import * as yup from 'yup';
import type { User } from '@/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const schema = yup.object({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        });

        try {
          const parsedCredentials = await schema.validate(credentials, { abortEarly: false });

          const { email, password } = parsedCredentials;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;

          return null;
        } catch (err) {
          console.log('err', err);
          return null;
        }
      },
    }),
  ],
});
