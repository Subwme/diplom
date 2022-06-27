import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addProductToBasketAction } from "../../store/reducers/reducer";
import { Card, Button, notification, Space, Row, Col } from "antd";
import { NotificationType } from "../../types";
import { RollbackOutlined, ShoppingOutlined } from "@ant-design/icons";
import "./product.css";

interface IProductId {
  productId: string;
}
const { Meta } = Card;

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
      placement: "top",
    });
  };

  return (
    <Row>
      <Col>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src={`http://placeimg.com/200/200/${Math.random() * 100}`}
            />
          }
        >
          <Meta
            style={{ margin: 0 }}
            title={<p>Название: {currentProduct.name}</p>}
            description={<p>Описание: {currentProduct.description}</p>}
          />
          <p>Стоимость:{currentProduct.price}</p>
          <Space direction="horizontal">
            <Button
              icon={<RollbackOutlined />}
              onClick={handleBack}
              size="small"
            >
              К списку
            </Button>
            <Button
              icon={<ShoppingOutlined />}
              size="small"
              onClick={() => handleBuy("success")}
            >
              Купить
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
