import ProductCard from "./product-card";
import { Product } from "@/types";

const ProductList = ({data, title, limit }: {data: Product[]; title?: string; limit?: number; }) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        /* asi creamos un grid.
        Con un div al que le definimos las caracteristidas de grid de esa forma.
        Incluso definimos la responsividad para las pantallas mobile, small, mid y large.
        Habra una logica condicional para evaluar si hay elementos para mostrar */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product}/>
          ))}
        </div>
      ): (
        <div>
          <p>No products Found</p>
        </div>
      )}
    </div>
   );
}

export default ProductList;
