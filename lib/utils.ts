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
