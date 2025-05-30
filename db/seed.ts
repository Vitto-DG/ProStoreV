/* Este archivo es la funcionalidad para obtener nuetros priductos desde una DDBB
  y no desde nuestra simulacion.
  Con esta funcion podremos agregar productos a nuestra DDBB.
  El fin es obtener nuestros productos desde una DDBB y no desde un archivo
  */


  import { PrismaClient } from "@prisma/client";
/* import { PrismaClient } from "../lib/generated/prisma"; */
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products })
  await prisma.user.createMany({ data: sampleData.users })

  console.log('Database seeded successfully!');
}

/*
Este archivo debe ser ejecutado y lo lograremos con el comando:
npx tsx ./db/seed
*/

main();
