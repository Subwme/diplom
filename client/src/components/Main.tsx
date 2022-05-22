import { ProductsList } from "./Product/ProductsList";
import { CategoriesList } from "./Category/CategoriesList";
// import "./main.css"

export const Main = () => {
  
  return (
    <div className="main">
      <CategoriesList />
      <ProductsList />
    </div>
  );
};
