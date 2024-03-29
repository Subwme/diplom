import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "../../../components/TextField";
import { useAppDispatch } from "../../../store";
import {
  setErrorTextToPopUp,
  setUserAction,
} from "../../../store/reducers/reducer";
import { ILoginData } from "../../../types";
import {
  createUserWithAuth,
  isResError,
  login,
} from "../../../utils/apiProvider";
import { validateLogin } from "../../../utils/utils";
import { MyButton } from "../../../components/Button/button";
import { ErrorDraft } from "../authForm";

interface IProps {
  handleToggleForm: () => void;
}

const initialData: ILoginData = {
  email: "",
  password: "",
};

const errorsMap: ErrorDraft = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginForm = (props: IProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState(errorsMap);
  const [data, setData] = useState(initialData);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrorMapLogin = validateLogin(data);
    if (Object.keys(newErrorMapLogin).length > 0) {
      setErrors(newErrorMapLogin);
      return;
    }

    const sendToData: ILoginData = {
      email: data.email,
      password: data.password,
    };

    login(sendToData)
      .then((data) => {
        if (isResError(data)) {
          setErrors({ ...errors, ...data.error });
          return;
        }
        const user = createUserWithAuth(data);
        dispatch(setUserAction(user));

        if (user.isAdmin === false) {
          history.replace("/");
        }

        if (user.isAdmin === true) {
          history.replace("/admin");
        }
      })
      .catch((e: Error) => {
        dispatch(setErrorTextToPopUp(e.message));
        return;
      });
  };

  return (
    <form onSubmit={onSubmit} className="form form_style">
      <p className="image__text text_filter mobile_form-text_hide">
        Компьютер — это самый удивительный инструмент, с каким я когда-либо
        сталкивался. Это велосипед для нашего сознания.
      </p>
      <h1 className="form__header-text">Магазин</h1>
      <TextField
        classNamme="form__email input"
        label="Email"
        type="text"
        name="email"
        placeHolder="введите email..."
        value={data.email}
        onChange={handleChange}
        errors={errors.email}
      />
      <TextField
        classNamme="form__password input"
        label="Пароль"
        type="password"
        name="password"
        placeHolder="введите пароль..."
        value={data.password}
        onChange={handleChange}
        errors={errors.password}
      />
      <MyButton
        className="form__button button_size_m button_active button_hovered"
        type="submit"
        text="войти"
      />
      <div className="footer">
        <p className="footer__text">Еще нет аккаунта?</p>
        <MyButton
          className="form__button-link button_active"
          onClick={() => props.handleToggleForm()}
          type="button"
          text="Зарегистрироваться"
        />
      </div>
    </form>
  );
};
