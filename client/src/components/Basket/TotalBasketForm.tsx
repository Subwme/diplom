import { IProduct } from "../../types";

interface IProps {
  product: IProduct[];
}

export const TotalBasketForm = (props: IProps) => {
  const productsFromBasket = props.product;
  return (
    <div className="basket-total-form">
      <div className="basket-total-price">
        К оплате:{" "}
        {productsFromBasket.reduce((total, p) => {
          return total + p.price;
        }, 0)}
      </div>
      <button
        onClick={() => alert(`Спасибо за покупку.`)}
        className="basket-form-buy-btn"
      >
        Buy
      </button>
    </div>
  );
};
