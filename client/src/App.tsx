import { Route, Switch } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Main } from "./Pages/Main/Main";
import { ProductCard } from "./Pages/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "./store";
import { getCategories, getComments, getProducts } from "./utils/apiProvider";
import { useEffect } from "react";
import {
  setProductsAction,
  setCategoriesAction,
  setCommnetsAction,
} from "./store/reducers/reducer";
import { Basket } from "./Pages/Basket/Basket";
import { AdminPanel } from "./Pages/AdminPanel/AdminPanel";
import { ProtectedRoute } from "./components/hoc/ProtectedRoute";
// import { Layout } from "antd";
import "./style.css";
// import "antd/dist/antd.min.css";
import { NotFound } from "./Pages/NotFound/notFound";
import { ErrorPopup } from "./components/ErrorPopup/errorPopup";
import { AuthForm } from "./Pages/AuthPage/";

// const { Content } = Layout;

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      return;
    }
    Promise.all([getProducts(), getCategories(), getComments()])
      .then(([products, categories, comments]) => {
        products.forEach((p) => {
          p.image = `http://placeimg.com/200/200/${Math.random() * 100}`;
        });
        dispatch(setProductsAction(products));
        dispatch(setCategoriesAction(categories));
        dispatch(setCommnetsAction(comments));
      })
      .catch((error) => console.log(error));
  }, [dispatch, user]);

  return (
    <>
      <ErrorPopup time={5000} />
      <NavigationBar user={user} />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/product/:productId" component={ProductCard} />
        <ProtectedRoute path="/admin">
          <AdminPanel />
        </ProtectedRoute>
        <Route path="/auth" exact component={AuthForm} />
        <Route path="/basket" component={Basket} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
