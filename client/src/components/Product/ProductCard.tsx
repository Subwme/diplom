import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addProductToBasketAction } from "../../store/reducers/reducer";

interface IProductId {
  productId: string;
}

export const ProductCard = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { productId } = useParams<IProductId>();
  const currentProduct = useAppSelector((state) =>
    state.products.find((p) => productId === p._id)
  );

  if (currentProduct === undefined) {
    return null;
  }
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="product-card-page">
      <span>{currentProduct.image}</span>
      <span>{currentProduct.name}</span>
      <span>{currentProduct.amount}</span>
      <span>{currentProduct.price}</span>
      <button type="button" onClick={handleBack}>
        К списку
      </button>
      <button
        type="button"
        onClick={() => dispatch(addProductToBasketAction(currentProduct._id))}
      >
        Купить
      </button>
    </div>
  );
};
