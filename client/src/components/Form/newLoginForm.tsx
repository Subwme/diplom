import { Button } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../reusable/textField";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { ILoginData } from "../../types";
import { login } from "../../utils/apiProvider";
import { validateLogin } from "../../utils/utils";
import { ErrorDraft } from "./authForm";

interface IProps {
  data: ILoginData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleForm: () => void;
}

const errorsMap: ErrorDraft = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const NewLoginForm = (props: IProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState(errorsMap);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrorMapLogin = validateLogin(props.data);
    if (Object.keys(newErrorMapLogin).length > 0) {
      setErrors(newErrorMapLogin);
      return;
    }

    const sendToData: ILoginData = {
      email: props.data.email,
      password: props.data.password,
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
      .catch(({ message }) => {
        setErrors({ ...errors, email: message });
      });
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h1>Магазин</h1>
      <TextField
        classNamme="auth-email"
        label="Email"
        type="text"
        name="email"
        value={props.data.email}
        onChange={props.onChange}
        errors={errors.email}
      />
      <TextField
        classNamme="auth-password"
        label="Пароль"
        type="password"
        name="password"
        value={props.data.password}
        onChange={props.onChange}
        errors={errors.password}
      />

      <Button type="primary" htmlType="submit">
        Войти
      </Button>
      <div className="auth-footer">
        <p className="auth-footer-text">Еще нет аккаунта ?</p>
        <Button onClick={() => props.handleToggleForm()} type="link">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
