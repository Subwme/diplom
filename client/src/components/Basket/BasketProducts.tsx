import { useAppDispatch } from "../../store";
import { removeProductFromBasketAction } from "../../store/reducers/reducer";
import { IProduct } from "../../types";

interface IProps {
  product: IProduct;
}

export const BasketProducts = (props: IProps) => {
  const dispath = useAppDispatch();
  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={props.product.image}
        alt="Картинка"
      ></img>
      <span className="product-card__name">{props.product._id}</span>
      <span className="product-card__name">{props.product.name}</span>
      <span className="product-card__name">{props.product.amount}</span>
      <span className="product-card__price">{props.product.price}</span>
      <button className="basket-btn"
        onClick={() =>
          dispath(removeProductFromBasketAction(props.product._id))
        }
      >delete</button>
    </div>
  );
};
