import { Button } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../reusable/textField";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { register } from "../../utils/apiProvider";
import { validateRegister } from "../../utils/utils";
import { AuthData, ErrorDraft } from "../../layouts/authForm";

interface IProps {
  data: AuthData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleForm: () => void;
}

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

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrorMapRegister = validateRegister(props.data);

    if (Object.keys(newErrorMapRegister).length > 0) {
      setErrors(newErrorMapRegister);
      return;
    }

    if (props.data.password !== props.data.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    const sendToData: AuthData = {
      name: props.data.name,
      email: props.data.email,
      password: props.data.password,
    };

    register(sendToData)
      .then((user) => {
        dispatch(setUserAction(user));
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
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
        value={props.data.name}
        onChange={props.onChange}
        errors={errors.name}
      />
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
      <TextField
        classNamme="form__confirm-password input"
        label="Пароль"
        type="password"
        name="confirmPassword"
        value={props.data.confirmPassword}
        onChange={props.onChange}
        errors={errors.confirmPassword}
      />
      <Button className="form__button" type="primary" htmlType="submit">
        Регистрация
      </Button>
      <div className="footer">
        <p className="footer__text">Уже есть аккаунт ?</p>
        <Button onClick={() => props.handleToggleForm()} type="link">
          Войти
        </Button>
      </div>
    </form>
  );
};
