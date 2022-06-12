import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addProductToBasketAction } from "../../store/reducers/reducer";
import { Card, Button, notification } from "antd";
import { NotificationType } from "../../types";

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

  const handleBuy = (type: NotificationType) => {
    dispatch(addProductToBasketAction(currentProduct._id));
    notification[type]({
      message: "Product added to cart",
    });
  };

  return (
    <Card style={{ width: 300, borderRadius: 5, borderColor: "black" }}>
      <span className="product-card__image">{currentProduct.image}</span>
      <span className="product-card__name">{currentProduct.name}</span>
      <span className="product-card__name">{currentProduct.amount}</span>
      <span className="product-card__price">{currentProduct.price}</span>
      <div className="product-btns-block">
        <Button onClick={handleBack}>К списку</Button>
        <Button onClick={() => handleBuy("success")}>Купить</Button>
      </div>
    </Card>
  );
};
