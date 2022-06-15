import "./product.css";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface IProps {
  product: IProduct;
}

export const Product = (props: IProps) => {
  return (
    <>
      <p>{props.product.price}</p>
      <Button size="small">
        {
          <Link
            className="navigation-product-card__text"
            to={`/product/${props.product._id}`}
          >
            Открыть-карточку
          </Link>
        }
      </Button>
    </>
  );
};
