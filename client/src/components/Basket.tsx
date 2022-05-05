import { useAppSelector } from "../store";
import { IProduct } from "../types";

export const Basket = () => {
  const products = useAppSelector((state) => state.products);
  const productsIdInBasket = useAppSelector(
    (state) => state.productInBasketIdList
  );

  const productsInBasket = productsIdInBasket.reduce((result, id) => {
    const product = products.find((p) => p._id === id);
    if (product === undefined) {
      return result;
    }
    return [...result, product];
  }, [] as IProduct[]);
  console.log(productsInBasket);

  return (
    <div>
      <span>Basket</span>
    </div>
  );
};
