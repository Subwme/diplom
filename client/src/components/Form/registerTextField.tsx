import TextField from "../../reusable/textField";
import { AuthData, ErrorMap } from "./authForm";

interface IProps {
  data: AuthData;
  errors: ErrorMap;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterTextField = (props: IProps) => {
  return (
    <>
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
    </>
  );
};
