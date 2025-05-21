import { cn } from "@/lib/utils";


const ProductPrice = ({ value, className}: { value: number; className?:
  string;}) => {
    /* asegurar dos lugares decimales */
    const stringValue = value.toFixed(2);
    /* Obtener el int/float */
    const [intValue, floatValue] = stringValue.split('.');
/* En los return se renderiza cada componente. */
  return ( <p className={cn('text-2xl', className)}>
    <span className="text-xs align-super">$</span>
    {intValue}
    <span className="text-xs align-super">.{floatValue}</span>
  </p> );
}

export default ProductPrice;
