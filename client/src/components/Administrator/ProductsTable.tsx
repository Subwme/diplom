import { deleteProduct } from "../../apiProvider";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  removeProductFromAdminAction,
  selectEditProductAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import "./Adminpanel.css";

export const ProductsTable = ({
  product,
  id,
}: {
  product: IProduct;
  id: number;
}) => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const getCategoryName = (id: string): string | null => {
    const category = categories.find((c) => {
      return c._id === id;
    });
    if (category === undefined) {
      return null;
    }
    return category.name;
  };

  const editProduct = (id: string) => {
    dispatch(selectEditProductAction(id));
  };

  const removeProduct = (productId: string) => {
    deleteProduct(productId)
      .then(() => {
        dispatch(removeProductFromAdminAction(productId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <tr>
        <td>{id + 1}</td>
        <td>{product.name}</td>
        <td>{getCategoryName(product.category)}</td>
        <td>{product.price}</td>
        <td>{product.amount}</td>
        <td>{product.image}</td>
        <td>
          <button
            onClick={() => editProduct(product._id)}
            className="edit-btn__btn"
          >
            Edit
          </button>
          <button
            onClick={() => removeProduct(product._id)}
            className="delete-btn__btn"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
