import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addProductToBasketAction } from "../../store/reducers/reducer";
import "./product.css";

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
      <span className="product-card__image">{currentProduct.image}</span>
      <span className="product-card__name">{currentProduct.name}</span>
      <span className="product-card__name">{currentProduct.amount}</span>
      <span className="product-card__price">{currentProduct.price}</span>
      <div className="product-btns-block">
        <button className="product-card-btn" onClick={handleBack}>
          К списку
        </button>
        <button
          className="product-card-btn"
          onClick={() => dispatch(addProductToBasketAction(currentProduct._id))}
        >
          Купить
        </button>
      </div>
    </div>
  );
};
