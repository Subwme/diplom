import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MyButton } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { useAppDispatch } from "../../../store";
import { setUserAction } from "../../../store/reducers/reducer";
import { IRegisterData } from "../../../types";
import {
  createUserWithAuth,
  isResError,
  register,
} from "../../../utils/apiProvider";
import { validateRegister } from "../../../utils/utils";
import { ErrorDraft } from "../authForm";

interface IProps {
  handleToggleForm: () => void;
}

const initialData: IRegisterData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorsMap: ErrorDraft = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = (props: IProps) => {
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

    const newErrorMapRegister = validateRegister(data);

    if (Object.keys(newErrorMapRegister).length > 0) {
      setErrors(newErrorMapRegister);
      return;
    }

    if (data.password !== data.confirmPassword) {
      return;
    }

    const sendToData: IRegisterData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    register(sendToData)
      .then((data) => {
        if (isResError(data)) {
          setErrors({ ...errors, ...data.error });
          return;
        }
        const user = createUserWithAuth(data);
        dispatch(setUserAction(user));
        history.replace("/");
      })
      .catch((e: Error) => {
        if (e.name === "Network error") {
          history.push("/404");
          return;
        }
        setErrors({ ...errors, email: e.message });
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
        classNamme="form__username input"
        label="Имя"
        type="text"
        name="name"
        placeHolder="введите имя..."
        value={data.name}
        onChange={handleChange}
        errors={errors.name}
      />
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
      <TextField
        classNamme="form__confirm-password input"
        label="Пароль"
        type="password"
        name="confirmPassword"
        placeHolder="подтвердите пароль..."
        value={data.confirmPassword}
        onChange={handleChange}
        errors={errors.confirmPassword}
      />
      <MyButton
        className="form__button button_size_m button_active button_hovered"
        type="submit"
        text="Регистрация"
      />
      <div className="footer">
        <p className="footer__text">Уже есть аккаунт?</p>
        <MyButton
          className="form__button-link button_active"
          onClick={() => props.handleToggleForm()}
          type="button"
          text="Войти"
        />
      </div>
    </form>
  );
};
