import "./product.css";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

export const Product = (props: IProps) => {
  return (
    <>
      <div className="product-card">
        <img
          className="product-card__image"
          src={props.product.image}
          alt="Картинка"
        ></img>
        <span className="product-card__name">{props.product.name}</span>
        <span className="product-card__price">{props.product.price}</span>
        <button className="product-card__button">
          {
            <Link
              className="navigation-product-card__text"
              to={`/product/${props.product._id}`}
            >
              Открыть-карточку
            </Link>
          }
        </button>
      </div>
    </>
  );
};
