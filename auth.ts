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
    error: '/sign-out',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [CredentialsProvider({
    credentials: {
    email: { type: 'emai'},
    password: { type: 'password'}
  },
  async authorize(credentials) {
    if(credentials == null) return null;
    // Find user in database
    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email as string
      }
    });
    // check if the user ecists and if the password matches
    if(user && user.password) {
      const isMatch = compareSync(credentials.password as string, user.password)

      //If password is correct, return user
      if(isMatch){
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    }
    //If user does not exist or password does not match, return null
    return null;
  },
}),
],
callbacks: {
  async session({ session, user, trigger, token }: any){
    // Set the user ID from the token
    session.user.id = token.sub;
    session.user.role = token.role;
    session.user.name = token.name;
/* console.log(token); */

    //If there is an update, set the user name
    if(trigger === 'update'){
      session.user.name = user.name;
    }
    return session
  },
  async jwt({ token, user, trigger, session }: any) {
    // Assing user fields to the token
    if (user) {
      token.role = user.role;
      // If user has no name, then use the email
      if (user.name === 'NO_NAME') {
        token.name = user.email!.split('@')[0];

      // Update database to reflect the token name
      await prisma.user.update({
        where: { id: user.id },
        data: { name: token.name }
      });
      }
      return token;
    }
  }
},
} satisfies NextAuthConfig;
/*
Todo acerca de lo que vamos a tener disponible para agregar a este objeto, se encuentra en la
documentacion del sitio web de NextAuth */
export const { handlers, auth, signIn, signOut } = NextAuth(config);
