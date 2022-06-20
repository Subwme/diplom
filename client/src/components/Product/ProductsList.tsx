import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSortByAscAction,
  setSortByDescAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import { Product } from "./Product";
import "./product.css"
import { Input, Button, Space, Col, Row } from "antd";

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

  const data = sortedProducts.map((p) => ({
    title: p.name,
    description: p.description,
    content: p.price,
    id: p._id,
    avatar: `http://placeimg.com/200/200/${Math.random() * 100}`,
  }));

  return (
    <>
      <Row>
        <Col span={10} offset={0}>
          <Space direction="horizontal" wrap={true}>
            <Input
              allowClear
              size="large"
              onChange={handleSearchTextChange}
              placeholder="Search..."
            />

            <Button
              type="primary"
              onClick={() => dispatch(setSortByAscAction())}
            >
              High
            </Button>
            <Button
              type="primary"
              onClick={() => dispatch(setSortByDescAction())}
            >
              Low
            </Button>
          </Space>
        </Col>
      </Row>
      <Product data={data} />
    </>
  );
};
