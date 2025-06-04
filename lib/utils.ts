import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
};

/*
la <T> se llama un TypeScript generico. Es un marcador de posicion
 para cualquier tipo que la funcion podria aceptar cuando se llama.
Puede ser una cadena de caracteres, un objeto, un modelo de Prisma, etc.
el value: T, especifica el tipo de parametro o argumento que se pasa.
y esta : T es solo para el retorno de la funcion.
Asi que si llamamos a la funcion con un objeto producto, TS sabe que
el valor de retorno sera tambien del tipo producto?
*/

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` :
  `${int}.00`
}
/*
Que Meta me explique el paso a paso de esta funcion
*/

// Format errors
// Disable Comment para typescript. Esto nos va a permitir usar el any en el deply sin arrojar ningun error

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name ==='ZodError'){
    // Handle Zod error. querremos recorrer los objetos dentro del arreglo para que nos muestre el contenido del campo "message"
    const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].
  message);
  /* y con el return los vamos a juntar (por que son dos atributos en dos objetos separados) */
  return fieldErrors.join('. ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002') {
    // Handle Prisma error
      const field = error.meta?.target ? error.meta.target[0] : 'Field';
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
}

/*
error.errors es este arreglo de objetos:
[
  {
    code: 'too_small',
    minimum: 3,
    type: 'string',
    inclusive: true,
    exact: false,
    message: 'Name must be at leats 3 characters',
    path: [ 'name' ]
  },
  {
    validation: 'email',
    code: 'invalid_string',
    message: 'Invalid email address',
    path: [ 'email' ]
  }
] */
