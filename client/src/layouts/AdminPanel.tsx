import { useAppSelector } from "../store";
import { AdminTools } from "../components/Administrator/AdminTools";
import { ProductsTable } from "../components/Administrator/ProductsTable";
import "../components/Administrator/Adminpanel.css"
import { Col, Row } from "antd";

export const AdminPanel = () => {
  const products = useAppSelector((state) => state.products);

  return (
    <div className="admin-tools-panel">
      <Row>
        <Col span={12}>
          <AdminTools />
        </Col>
        <Col span={12} offset={0}>
          <ProductsTable products={products} />
        </Col>
      </Row>
    </div>
  );
};
