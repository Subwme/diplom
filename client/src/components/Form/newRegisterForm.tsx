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
    <form onSubmit={onSubmit} className="auth-form">
      <h1>Магазин</h1>
      <TextField
        classNamme="auth-username"
        label="Имя"
        type="text"
        name="name"
        value={props.data.name}
        onChange={props.onChange}
        errors={errors.name}
      />
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
      <TextField
        classNamme="auth-confirm-password"
        label="Пароль"
        type="password"
        name="confirmPassword"
        value={props.data.confirmPassword}
        onChange={props.onChange}
        errors={errors.confirmPassword}
      />
      <Button type="primary" htmlType="submit">
        Регистрация
      </Button>
      <div className="auth-footer">
        <p className="auth-footer-text">Уже есть аккаунт ?</p>
        <Button onClick={() => props.handleToggleForm()} type="link">
          Войти
        </Button>
      </div>
    </form>
  );
};
