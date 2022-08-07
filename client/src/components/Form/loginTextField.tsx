import TextField from "../../reusable/textField";
import { ILoginData } from "../../types";
import { ErrorMap } from "./authForm";

interface IProps {
  data: ILoginData;
  errors: ErrorMap;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginTextField = (props: IProps) => {
  return (
    <>
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
    </>
  );
};
