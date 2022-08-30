import { Button } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../reusable/textField";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { ILoginData } from "../../types";
import { login } from "../../utils/apiProvider";
import { validateLogin } from "../../utils/utils";
import { ErrorDraft } from "../../layouts/authForm";

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
          history.replace("/");
        }

        if (user.isAdmin === true) {
          history.replace("/admin");
        }
      })
      .catch(({ message }: { message: string }) => {
        if (message === "Oops something went wrong") {
          history.push("/404");
        }
        setErrors({ ...errors, email: message });
      });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h1 className="form__header-text">Магазин</h1>
      <TextField
        classNamme="form__email input"
        label="Email"
        type="text"
        name="email"
        value={props.data.email}
        onChange={props.onChange}
        errors={errors.email}
      />
      <TextField
        classNamme="form__password input"
        label="Пароль"
        type="password"
        name="password"
        value={props.data.password}
        onChange={props.onChange}
        errors={errors.password}
      />

      <Button className="form__button" type="primary" htmlType="submit">
        Войти
      </Button>
      <div className="footer">
        <p className="footer__text">Еще нет аккаунта ?</p>
        <Button onClick={() => props.handleToggleForm()} type="link">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
