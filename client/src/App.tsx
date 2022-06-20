import RegisterForm from "./components/Form/registerForm";
import { Route, Switch } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { Main } from "./components/Main";
import LoginForm from "./components/Form/loginForm";
import { ProductCard } from "./components/Product/ProductCard";
import { useAppDispatch, useAppSelector } from "./store";
import { getCategories, getProducts } from "./apiProvider";
import { useEffect } from "react";
import {
  setProductsAction,
  setCategoriesAction,
} from "./store/reducers/reducer";
import { Basket } from "./components/Basket/Basket";
import { AdminPanel } from "./components/Administrator/AdminPanel";
import { ProtectedRoute } from "./components/hoc/ProtectedRoute";
import { Layout } from "antd";

import "./style.css";
import "antd/dist/antd.min.css";

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
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/basket" component={Basket} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
