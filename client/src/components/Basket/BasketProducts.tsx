import { useAppDispatch } from "../../store";
import { removeProductFromBasketAction } from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import "./basket.css";

interface IProps {
  product: IProduct;
}

export const BasketProducts = (props: IProps) => {
  const dispath = useAppDispatch();
  return (
    <div className="basket-products">
      <div className="basket-product-card">
        <img
          className="product-card__image"
          src={props.product.image}
          alt="Картинка"
        ></img>
        <span className="product-card__name">ID: {props.product._id}</span>
        <span className="product-card__name">Количество: {props.product.count}</span>
        <span className="product-card__name">Название: {props.product.name}</span>
        <span className="product-card__name">Доступно в магазине: {props.product.amount}</span>
        <span className="product-card__price">Цена: {props.product.price}</span>
        <span className="product-card__name">Итого: {props.product.total}</span>
        <button
          className="basket-btn"
          onClick={() =>
            dispath(removeProductFromBasketAction(props.product._id))
          }
        >
          delete
        </button>
      </div>
    </div>
  );
};
