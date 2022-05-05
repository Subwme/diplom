import { deleteProduct } from "../../apiProvider";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeProductFromAdminAction } from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import "./Adminpanel.css";

export const ProductsTable = ({ product }: { product: IProduct }) => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const getCategoryName = (id: string): string | null => {
    const categoryName = categories.find((c) => {
      return c._id === id;
    });
    if (categoryName === undefined) {
      return null;
    }
    return categoryName.name;
  };

  const editProduct = (id: string) => {
    console.log(id);
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
        <td>{product._id}</td>
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
