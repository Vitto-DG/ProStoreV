
/* import sampleData from "@/db/sample-data"; */
import { gestLatestProducts } from "@/lib/actions/product.actions";
/* import { Button } from "@/components/ui/button"; */
import ProductList from "@/components/shared/product/product-list";
/* import { setTimeout } from "timers"; */
/* Para testear la pargina de LOADING */
/* const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 */
export const metadata = {
  title:'Home'
}

const Homepage = async () => {
  const latesProducts = await gestLatestProducts()

  return <>
  <ProductList data={latesProducts} title='Newest Arrivals'
  limit={4}/>
  </>;
}

/* funcionó */
/*
const Homepage = async () => {
  await delay(2000)
  return ( <Button>Arrancamos de nuevo</Button> );
} */
export default Homepage;
