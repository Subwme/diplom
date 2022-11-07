import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  clearProductsIdInBasketAction,
  setUserAction,
} from "../../store/reducers/reducer";
import { IUser } from "../../types";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingFilled,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./navigationBar.css";

export const NavigationBar = ({ user }: { user: IUser | null }) => {
  const dispath = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("productInBasketIdList");
    dispath(clearProductsIdInBasketAction([]));
    dispath(setUserAction(null));
  };
  return (
    <>
      {user && (
        <Menu mode="horizontal">
          <>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Main</Link>
            </Menu.Item>
            <Menu.Item key="shope" icon={<ShoppingCartOutlined />}>
              <Link to="/basket">Basket</Link>
            </Menu.Item>
            {user?.isAdmin && (
              <Menu.Item key="admin" icon={<SettingFilled />}>
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            )}
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <Link to="/auth" onClick={() => logout()}>
                Logout
              </Link>
            </Menu.Item>
          </>
        </Menu>
      )}
    </>
  );
};
