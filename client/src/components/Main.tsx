import { ProductsList } from "./Product/ProductsList";
import { CategoriesList } from "./Category/CategoriesList";

export const Main = () => {
  
  return (
    <div className="main">
      <CategoriesList />
      <ProductsList />
    </div>
  );
};
