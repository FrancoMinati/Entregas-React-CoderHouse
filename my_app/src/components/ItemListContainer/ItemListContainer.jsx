
import { useParams } from "react-router-dom";
import ProductCards from "../Card/ProductCard";
const ItemListContainer = ({productos}) => {
  const { categoryId } = useParams();
  productos=productos.filter(
    (product) => categoryId == null || product.category ===categoryId);
  return (
    <section className="w-full flex flex-col gap-5 px-16 mt-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {
          productos.map((producto) => (
              <ProductCards
                key={producto.id}
                title={producto.title}
                category={producto.category}
                image={producto.image}
                price={producto.price}
                id={producto.id}
              />
            ))}
      </div>
    </section>
  );
};
export default ItemListContainer;
