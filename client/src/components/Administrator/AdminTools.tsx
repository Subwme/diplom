import { IProductData } from "../../types";

export const AdminTools = ({ productData }: { productData: IProductData }) => {
  
  return (
    <form>
      <label>
        Наименование
        <input type="text" defaultValue={productData.name} />
      </label>
      <select defaultValue={productData.category} />
      <input type="text" defaultValue={productData.price} />
      <input type="text" defaultValue={productData.amount} />
      <input type="text" defaultValue={productData.url} />
      <button className="form-submit-admin__btn" type="submit">Отправить</button>
    </form>
  );
};
