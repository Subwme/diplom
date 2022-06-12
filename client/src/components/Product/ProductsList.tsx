import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSortByAscAction,
  setSortByDescAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import { Product } from "./Product";
import { Input, Button, Space } from "antd";

export const ProductsList = () => {
  const products = useAppSelector((state) => state.products);
  const sortBy = useAppSelector((state) => state.sortBy);
  const searchText = useAppSelector((state) => state.searchText);
  const selectedCategoryName = useAppSelector(
    (state) => state.selectedCategoryName
  );
  const dispatch = useAppDispatch();
  let sortedProducts: IProduct[] = products;

  if (selectedCategoryName) {
    sortedProducts = sortedProducts.filter((product) => {
      return selectedCategoryName === product.category;
    });
  }

  if (searchText !== "") {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchText);
    });
  }

  if (sortBy === "asc") {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "desc") {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  }

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchTextAction(event.target.value.toLowerCase()));
  };

  return (
    <div className="product-list__desk">
      <div className="product-filter">
        <Space direction="vertical">
        <Input
          allowClear
          size="large"
          onChange={handleSearchTextChange}
          placeholder="Search..."
        />
        </Space>
        <div className="product-button-list">
          <Button type="primary" onClick={() => dispatch(setSortByAscAction())}>
            High
          </Button>
          <Button
            type="primary"
            onClick={() => dispatch(setSortByDescAction())}
          >
            Low
          </Button>
        </div>
      </div>
      <div className="products">
        {sortedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
