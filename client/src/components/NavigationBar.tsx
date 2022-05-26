import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import {
  clearProductsIdInBasketAction,
  setUserAction,
} from "../store/reducers/reducer";
import { IUser } from "../types";
import "./components.css";

export const NavigationBar = ({ user }: { user: IUser | null }) => {
  const dispath = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("productInBasketIdList");
    dispath(clearProductsIdInBasketAction([]));
    dispath(setUserAction(null));
  };
  return (
    <ul className="navigation">
      {user && (
        <>
          <li className="navigation__link">
            <Link className="navigation__text" to="/">
              Main
            </Link>
          </li>
          <li className="navigation__link">
            <Link className="navigation__text" to="/basket">
              Basket
            </Link>
          </li>
          {user?.isAdmin && (
            <li className="navigation__link">
              <Link className="navigation__text" to="/admin">
                Admin
              </Link>
            </li>
          )}
          <li className="navigation__link">
            <Link
              to="/login"
              className="navigation__text"
              onClick={() => logout()}
            >
              Logout
            </Link>
          </li>
        </>
      )}
      {!user && (
        <>
          <li className="navigation__link">
            <Link className="navigation__text" to="/register">
              Register
            </Link>
          </li>
          <li className="navigation__link">
            <Link className="navigation__text" to="/login">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
