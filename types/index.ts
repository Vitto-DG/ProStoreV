import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

//De esta forma, vamos a poder importar todos los campos que definimos en el archivo @/types/validations.ts
