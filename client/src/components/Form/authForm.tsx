import { Button } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, register } from "../../apiProvider";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { IFormType, ILoginData, IRegisterData } from "../../types";
import "./authentication.css";
import { LoginTextField } from "./loginTextField";
import { RegisterTextField } from "./registerTextField";
//TODO: утилитарные типы

export type ErrorMap = Partial<Record<keyof ILoginData, string>>;
export type AuthData = ILoginData | IRegisterData;
const initialData: AuthData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorsMap: ErrorMap = {
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
  const [errors, setErrors] = useState(errorsMap);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleToggleForm = () => {
    formType === "login" ? setFormType("register") : setFormType("login");
    setData(initialData);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrorMap = validate(data);

    if (Object.keys(newErrorMap).length > 0) {
      setErrors(newErrorMap);
      return;
    }

    if (Object.keys(newErrorMap).length === 0) {
      if (formType !== "login") {
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
      if (formType !== "register") {
        if (data.password !== data.confirmPassword) {
          alert("Пароли не совпадают!");
          return;
        }
        const sendToData: AuthData = {
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
        {formType === "login" ? (
          <RegisterTextField
            data={data}
            errors={errors}
            onChange={handleChange}
          />
        ) : (
          <LoginTextField data={data} errors={errors} onChange={handleChange} />
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

function validate <T extends AuthData>(content: T ): ErrorMap {
  const errors: ErrorMap = {};

  if (content.name === "") {
    errors.name = "Обязательно для заполнения";
  }

  if (content.email === "") {
    errors.email = "Обязательно для заполнения";
  }

  if (content.password === "") {
    errors.password = "Обязательно для заполнения";
  }

  if (content.password === "") {
    errors.confirmPassword = "Обязательно для заполнения";
  }

  return errors;
};

// TODO: VALIDATOR , REQUIRES, ERRORS
