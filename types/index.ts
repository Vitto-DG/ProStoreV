import { z } from "zod";
import { insertProductSchema, insertCartSchema, cartItemSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
//De esta forma, vamos a poder importar todos los campos que definimos en el archivo @/types/validations.ts
