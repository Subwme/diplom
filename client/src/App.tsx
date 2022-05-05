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
import { Basket } from "./components/Basket";
import { AdminPanel } from "./components/Administrator/AdminPanel";
import "./style.css";

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
    <>
      <NavigationBar user={user}/>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/product/:productId" component={ProductCard} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/basket" component={Basket} />
      </Switch>
    </>
  );
};

export default App;
