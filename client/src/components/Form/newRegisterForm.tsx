import { Button } from "antd";
import TextField from "../../reusable/textField";
import { AuthData, ErrorDraft } from "./authForm";

interface IProps {
  data: AuthData;
  errors: ErrorDraft;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  handleToggleForm: () => void;
}

export const NewRegisterForm = (props: IProps) => {
  return (
    <form onSubmit={props.onSubmit} className="auth-form">
      <h1>Магазин</h1>
      <TextField
        classNamme="auth-username"
        label="Имя"
        type="text"
        name="name"
        value={props.data.name}
        onChange={props.onChange}
        errors={props.errors.name}
      />
      <TextField
        classNamme="auth-email"
        label="Email"
        type="text"
        name="email"
        value={props.data.email}
        onChange={props.onChange}
        errors={props.errors.email}
      />
      <TextField
        classNamme="auth-password"
        label="Пароль"
        type="password"
        name="password"
        value={props.data.password}
        onChange={props.onChange}
        errors={props.errors.password}
      />
      <TextField
        classNamme="auth-confirm-password"
        label="Пароль"
        type="text"
        name="confirmPassword"
        value={props.data.confirmPassword}
        onChange={props.onChange}
        errors={props.errors.confirmPassword}
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
