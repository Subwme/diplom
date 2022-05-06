import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { IProductData } from "../../types";
import "./Adminpanel.css";
import { AdminTools } from "./AdminTools";
import { ProductsTable } from "./ProductsTable";

export const AdminPanel = () => {
  const draft: IProductData = {
    name: "Имя",
    category: "Категория",
    price: 0,
    amount: 0,
    url: "url",
  };
  const [productData, setProductData] = useState(draft);
  const products = useAppSelector((state) => state.products);
  const selectProductFromAdmin = useAppSelector(
    (state) => state.selecteEditProduct
  );
useEffect(()=> {
  if (selectProductFromAdmin !== null && selectProductFromAdmin !== undefined) {
    setProductData({
      ...productData,
      name: selectProductFromAdmin.name,
      category: selectProductFromAdmin.category,
      price: selectProductFromAdmin.price,
      amount: selectProductFromAdmin.amount,
      url: selectProductFromAdmin.image,
    });
  }
}, [selectProductFromAdmin, productData])
 

  return (
    <div className="admin-panel-container">
      <AdminTools productData={productData} />
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
    </div>
  );
};
