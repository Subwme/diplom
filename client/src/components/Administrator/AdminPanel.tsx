import { useAppSelector } from "../../store";
import "./Adminpanel.css";
import { ProductsTable } from "./ProductsTable";

export const AdminPanel = () => {
  const products = useAppSelector((state) => state.products);

  return (
    <div>
      <table className="administrator-table">
        <tbody>
          <tr>
            <th>id</th>
            <th>Наименование</th>
            <th>Категория</th>
            <th>Стоимость</th>
            <th>Кол-во</th>
            <th>Фото</th>
            <th>Действия</th>
          </tr>
          {products.map((product) => (
            <ProductsTable key={product._id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
