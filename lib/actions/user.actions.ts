'use server';

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown,
  fromData: FormData) {
    try {
        const user = signInFormSchema.parse({
          email: fromData.get('email'),
          password: fromData.get('password')
        });
        await signIn('credentials', user)
        return { success: true, message: 'Signed in successfully'}
    } catch(error){
        if ( isRedirectError(error)){
          throw error;
        }
      return { success: false, message: 'Invalid email or password'}
    }
  }

  // Sign out
  export async function signOutUser(){
    await signOut();
  }

  // Sign up user
  export async function signUpUser(prevState: unknown, formData: FormData){
    try {
      const user = signUpFormSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
      })
const planePassword = user.password;

      user.password = hashSync(user.password, 10);

      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      })

      await signIn('credentials', {
        email: user.email,
        password: planePassword,
      });
      return { success: true, message: 'User registered successfully'}
    } catch (error) {
      /* Aqui vamos a escribir algunos console.log para ver que tipo de mensajes
      llegan */
      /* console.log(error.name);
      console.log(error.code);
      console.log(error.errors);
      console.log(error.meta?.target); */
      /* Salvamos los cambios y vamos a intentar crear un usuario nuevo con info incorrecta */
        if ( isRedirectError(error)){
          throw error;
        }
      return { success: false, message: formatError(error)}
      /* return { success: false, message: 'User was not registered'} */
    }
  }
