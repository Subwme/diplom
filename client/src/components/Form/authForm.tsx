import { Button } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, register } from "../../apiProvider";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { IFormType, ILoginData, IRegisterData } from "../../types";
import TextField from "../../reusable/textField";
import "./authentication.css";

const initialData: ILoginData | IRegisterData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const authFormType: IFormType = {
  authType: "login",
};

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [formType, setFormType] = useState(authFormType.authType);
  const [data, setData] = useState(initialData);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleToggleForm = () => {
    switch (formType) {
      case "login":
        setFormType("register");
        break;
      case "register":
        setFormType("login");
        break;
      default:
        return formType;
    }
    setData(initialData);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    if (formType !== "login" && data.password === data.confirmPassword) {
      const sendToData: ILoginData = {
        email: data.email,
        password: data.password,
      };

      login(sendToData)
        .then((user) => {
          dispatch(setUserAction(user));

          if (user.isAdmin === false) {
            history.push("/");
          }
          if (user.isAdmin === true) {
            history.push("/admin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (formType !== "register" && data.password === data.confirmPassword) {
      const sendToData: ILoginData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      register(sendToData)
        .then((user) => {
          dispatch(setUserAction(user));
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <p className="auth-image-text">
          Компьютер — это самый удивительный инструмент, с каким я когда-либо
          сталкивался. Это велосипед для нашего сознания.
        </p>
      </div>
      <form onSubmit={onSubmit} className="auth-form">
        <h1>Магазин</h1>
        {formType === "login" && (
          <TextField
            classNamme="auth-username"
            label="Имя"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        )}
        <TextField
          classNamme="auth-email"
          label="Email"
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <TextField
          classNamme="auth-password"
          label="Пароль"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {formType === "login" && (
          <TextField
            classNamme="auth-confirm-password"
            label="Пароль"
            type="text"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
        )}
        <Button type="primary" htmlType="submit">
          {formType === "register" ? "Войти" : "Регистрация"}
        </Button>
        <div className="auth-footer">
          <p className="auth-footer-text">
            {formType === "register"
              ? "Еще нет аккаунта ? "
              : "Уже есть аккаунт ?"}
          </p>
          <Button onClick={() => handleToggleForm()} type="link">
            {formType === "register" ? "Зарегистрироваться" : "Авторизоваться"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
