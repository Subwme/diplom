import { Route, Switch } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Main } from "./components/Main";
import { ProductCard } from "./components/Product/ProductCard";
import { useAppDispatch, useAppSelector } from "./store";
import { getCategories, getProducts } from "./utils/apiProvider";
import { useEffect } from "react";
import {
  setProductsAction,
  setCategoriesAction,
} from "./store/reducers/reducer";
import { Basket } from "./layouts/Basket";
import { AdminPanel } from "./layouts/AdminPanel";
import { ProtectedRoute } from "./components/hoc/ProtectedRoute";
import { Layout } from "antd";

import "./style.css";
import "antd/dist/antd.min.css";
import AuthForm from "./layouts/authForm";

const { Content } = Layout;

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      return;
    }
    Promise.all([getProducts(), getCategories()])
      .then(([products, categories]) => {
        products.forEach((p) => {
          p.image = `http://placeimg.com/200/200/${Math.random() * 100}`;
        });
        dispatch(setProductsAction(products));
        dispatch(setCategoriesAction(categories));
      })
      .catch((error) => console.log(error));
  }, [dispatch, user]);

  return (
    <Layout>
      <Content>
        <NavigationBar user={user} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/product/:productId" component={ProductCard} />
          <ProtectedRoute path="/admin">
            <AdminPanel />
          </ProtectedRoute>
          <Route path="/auth" exact component={AuthForm} />
          <Route path="/basket" component={Basket} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
