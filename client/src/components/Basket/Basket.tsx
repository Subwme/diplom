import { useAppSelector } from "../../store";
import { IProduct } from "../../types";
import { BasketProducts } from "./BasketProducts";
import { TotalBasketForm } from "./TotalBasketForm";

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

  if (productsInBasket.length === 0) {
    return <span>Корзина пуста</span>;
  }

  return (
    <>
    <div className="basket">
      {productsInBasket.map((p, i) => (
        <BasketProducts key={i + 1} product={p} />
      ))}
    </div>
    <TotalBasketForm product={productsInBasket}/>
    </>
  );
};
