import { IProduct } from "../../types";
import { Button } from 'antd';


interface IProps {
  product: IProduct[];
  onBuy: any;
}

export const TotalBasketForm = (props: IProps) => {
  const productsFromBasket = props.product;
  return (
    <div className="basket-total-form">
      <div className="basket-total-price">
        К оплате:{" "}
        {productsFromBasket.reduce((total, p) => {
          if (p.total === undefined) {
            return total;
          }
          return total + p.total;
        }, 0)}
      </div>
      <Button type="primary" onClick={() => props.onBuy("success")} >
        Buy
      </Button>
    </div>
  );
};
