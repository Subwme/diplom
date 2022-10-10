import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../reusable/textField";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import {
  createUserWithAuth,
  isResError,
  register,
} from "../../utils/apiProvider";
import { validateRegister } from "../../utils/utils";
import { ErrorDraft } from "../../layouts/authForm";
import { MyButton } from "../../reusable/button";
import { IRegisterData } from "../../types";

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

export const NewRegisterForm = (props: IProps) => {
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
    <form onSubmit={onSubmit} className="form">
      <h1 className="form__header-text">Магазин</h1>
      <TextField
        classNamme="form__username input"
        label="Имя"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        errors={errors.name}
      />
      <TextField
        classNamme="form__email input"
        label="Email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        errors={errors.email}
      />
      <TextField
        classNamme="form__password input"
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        errors={errors.password}
      />
      <TextField
        classNamme="form__confirm-password input"
        label="Пароль"
        type="password"
        name="confirmPassword"
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
        <p className="footer__text">Уже есть аккаунт ?</p>
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
