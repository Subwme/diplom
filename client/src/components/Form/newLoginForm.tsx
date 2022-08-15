import { Button } from "antd";
import React from "react";
import TextField from "../../reusable/textField";
import { ILoginData } from "../../types";
import { ErrorDraft } from "./authForm";

interface IProps {
  data: ILoginData;
  errors: ErrorDraft;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  handleToggleForm: () => void;
}

export const NewLoginForm = (props: IProps) => {
  return (
    <form onSubmit={props.onSubmit} className="auth-form">
      <h1>Магазин</h1>
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
