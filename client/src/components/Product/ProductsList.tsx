import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSortByAscAction,
  setSortByDescAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import "./product.css";
import { Input, Button, Space, Col, Row, Empty, List } from "antd";
import { Link } from "react-router-dom";

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

  const countSortedProducts = sortedProducts.length;
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
      {sortedProducts.length === 0 ? (
        <Empty className="empty-list-text" description="Ничего не найдено" />
      ) : (
        <List
          itemLayout="vertical"
          size="small"
          pagination={countSortedProducts <= 4 ? false : { pageSize: 4 }}
          dataSource={sortedProducts}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <Link to={`/product/${item._id}`}>Перейти к товару</Link>,
              ]}
              extra={<img width={150} alt="logo" src={item.image} />}
            >
              <List.Item.Meta
                title={item.name}
                description={<p>Описание: {item.description}</p>}
              />
              <p>Стоимость: {item.description}</p>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
