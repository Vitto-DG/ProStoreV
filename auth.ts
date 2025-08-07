/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';



/*
Aqui se van a definir los endpoints y manejo de errores a las respectivas rutas de nuestro sitio web.
Cada uno como un objeto hijo de "config" */
export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
    credentials: {
    email: { type: 'email'},
    password: { type: 'password'}
  },
/*   async authorize(credentials, req) {
    if(!credentials) return null; */

    async authorize(
      credentials: Partial<Record<'email' | 'password', unknown>>,
      req: Request
    ): Promise<'user' | null> {
    // Find user in database
    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email as string
      },
    });
    // check if the user ecists and if the password matches
    if(user && user.password) {
      const isMatch = compareSync(
        credentials.password as string,
        user.password
      );

      //If password is correct, return user
      if(isMatch){
        return {
          id: user.id,
          name: user.name ?? 'NO_NAME',
          email: user.email,
          role: user.role ?? 'user'
        } as User;
      }
    }
    //If user does not exist or password does not match, return null
    return null;
  },
}
)
],

  /* authorize: async (
    Credentials: Partial<Record<"email" | "password", "unknown">>,
    req: Request
  ): Promise<User | null> => {
    if(!credentials) return null;

    const user = await prisma.user.findFirst({
      where: { email: Credentials.email as string }
    });
    if(!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    } */

callbacks: {
  async jwt({ token, user}) {
    if (user) {
      token.id = user.id;
      token.role = user.role;

      //Asegurar siempre que haya un nombre válido
      token.name =
        user.name && user.name !== 'NO_NAME'
          ? user.name
          : user.email?.split('@')[0] ?? 'User';

      //Guardar en DB si era 'NO_NAME'
      if (user.name === 'NO_NAME') {
        await prisma.user.update({
          where: { id: user.id },
          data: { name: token.name },
        });
        }
      }
      return token;
    },
    async session({ session, token, trigger, user }) {
      if(!session.user) session.user = {} as any;
      if(token?.sub) session.user.id = token.sub;
      if(token?.role) session.user.role = token.role;
      if(token?.name) session.user.name = token.name;
      if(token?.email) session.user.email = token.email;

console.log(token);

      if (trigger === 'update' && user?.name) {
        session.user.name = user.name;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } =NextAuth(config);
