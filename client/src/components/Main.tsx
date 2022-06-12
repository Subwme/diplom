import { ProductsList } from "./Product/ProductsList";
import { CategoriesList } from "./Category/CategoriesList";
import { Layout } from "antd";
import { useAppSelector } from "../store";
import { useHistory } from "react-router-dom";

const { Sider, Content } = Layout;
export const Main = () => {
  const user = useAppSelector((state) => state.user);
  const history = useHistory()

  if (user === null) {
    history.replace("/login")
  }

  return (
    <Layout>
      <Sider>
        <CategoriesList />
      </Sider>
      <Content>
        <ProductsList />
      </Content>
    </Layout>
  );
};
