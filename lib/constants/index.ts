/* ###########
Quiere contstantes globales
###########
*/

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'ProstoreVitto';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'An attempt of an Ecommerce by Brad'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
/* cuando se haga el deploy, el localhost va a ser reemplazado por cualquiera sea el dominio que tengamos */
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: '',
  password: '',
}
export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}
