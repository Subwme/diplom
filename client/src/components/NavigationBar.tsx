import { Link } from "react-router-dom";
import { IUser } from "../types";
import "./components.css";

export const NavigationBar = ({ user }: { user: IUser | null }) => {
  return (
    <ul className="navigation">
      {user && (
        <li className="navigation__link">
          <Link className="navigation__text" to="/">
            Main
          </Link>
        </li>
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
      {user && (
        <li className="navigation__link">
          <Link className="navigation__text" to="/basket">
            Basket
          </Link>
        </li>
      )}
      {user?.isAdmin && (
        <li className="navigation__link">
          <Link className="navigation__text" to="/admin">
            Admin
          </Link>
        </li>
      )}
    </ul>
  );
};
