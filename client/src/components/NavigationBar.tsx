import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setUserAction } from "../store/reducers/reducer";
import { IUser } from "../types";
import "./components.css";

export const NavigationBar = ({ user }: { user: IUser | null }) => {
  const history = useHistory();
  const dispath = useAppDispatch();
  const handleChange = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("productInBasketIdList");
    dispath(setUserAction(null));
    history.push("/login");
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
            <select name="user" value={user.name} onChange={handleChange}>
              <option disabled hidden>
                {user.name}
              </option>
              <option value={user.name}>Logout</option>
            </select>
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
