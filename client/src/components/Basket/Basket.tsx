import { useAppSelector } from "../../store";
import { IProduct, NotificationType } from "../../types";
import { BasketProducts } from "./BasketProducts";
import { TotalBasketForm } from "./TotalBasketForm";
import { Col, Divider, Row } from "antd";
import { notification } from "antd";

type ProductIdToCountMap = {
  [id: string]: number;
};

export const Basket = () => {
  const products = useAppSelector((state) => state.products);
  const productsIdInBasket = useAppSelector(
    (state) => state.productInBasketIdList
  );

  const productIdToCountMap = productsIdInBasket.reduce((result, id) => {
    if (result[id] === undefined) {
      return { ...result, [id]: 1 };
    }

    return { ...result, [id]: result[id] + 1 };
  }, {} as ProductIdToCountMap);

  const productsInBasket = Object.keys(productIdToCountMap).reduce(
    (result, id) => {
      const product = products.find((p) => {
        return p._id === id;
      });
      if (product === undefined) {
        return result;
      }
      return [
        ...result,
        {
          ...product,
          count: productIdToCountMap[id],
          total: product.price * productIdToCountMap[id],
        },
      ];
    },
    [] as IProduct[]
  );

  const onBuy = (type: NotificationType) => {
    notification[type]({
      message: "Thaks for buy!",
      placement: "top",
    });
  };

  if (productsInBasket.length === 0) {
    return (
      <Row align="middle">
        <Divider>В корзине пока нет товаров.</Divider>
      </Row>
    );
  }

  const data = productsInBasket.map((p) => ({
    title: p.name,
    content: p.price,
    id: p._id,
    avatar: `http://placeimg.com/200/200/${Math.random() * 100}`,
    amount: p.amount,
    count: p.count,
    total: p.total,
  }));

  return (
    <Row>
      <Col offset={2}>
        <BasketProducts data={data} />
      </Col>
      <Col offset={2}>
        <TotalBasketForm product={productsInBasket} onBuy={onBuy} />
      </Col>
    </Row>
  );
};
