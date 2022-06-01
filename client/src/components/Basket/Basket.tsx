import { useAppSelector } from "../../store";
import { IProduct } from "../../types";
import { BasketProducts } from "./BasketProducts";
import { TotalBasketForm } from "./TotalBasketForm";

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
  console.log(productsInBasket);

  if (productsInBasket.length === 0) {
    return (
      <span className="basket-header-text">В корзине пока нет товаров.</span>
    );
  }

  return (
    <div className="basket-form">
      <div className="basket">
        {productsInBasket.map((p, i) => (
          <BasketProducts key={i + 1} product={p} />
        ))}
      </div>
      <TotalBasketForm product={productsInBasket} />
    </div>
  );
};
