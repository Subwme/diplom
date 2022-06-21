import { IProduct, NotificationType } from "../../types";
import { Button, Card } from "antd";

interface IProps {
  product: IProduct[];
  onBuy: (string: NotificationType) => void;
}

export const TotalBasketForm = (props: IProps) => {
  const productsFromBasket = props.product;
  return (
    <Card
      title={
        <p>
          Итого:{" "}
          {productsFromBasket.reduce((total, p) => {
            if (p.total === undefined) {
              return total;
            }
            return total + p.total;
          }, 0)}
          р.
        </p>
      }
      headStyle={{ alignItems: "center" }}
      bodyStyle={{ display: "none" }}
      style={{ width: 300, height: 70 }}
      extra={[
        <Button
          key={props.product[0]._id}
          style={{ marginBottom: 20 }}
          type="primary"
          size="small"
          onClick={() => props.onBuy("success")}
        >
          Buy
        </Button>,
      ]}
    />
  );
};
