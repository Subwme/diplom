import { ProductsList } from "./components/ProductsList";
import { CategoriesList } from "./components/CategoriesList";
import { useAppSelector } from "../../store";
import { useHistory } from "react-router-dom";
import { Col, Row } from "antd";

export const Main = () => {
  const user = useAppSelector((state) => state.user);
  const history = useHistory();

  if (user === null) {
    history.replace("/auth");
  }

  return (
    <Row>
      <Col span={3}>
        <CategoriesList />
      </Col>
      <Col span={16}>
        <ProductsList />
      </Col>
    </Row>
  );
};
