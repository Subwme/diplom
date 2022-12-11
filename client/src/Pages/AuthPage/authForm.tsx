import { useState } from "react";
import { LoginForm } from "./components/LoginForm";

import { IFormType, ILoginData } from "../../types";
import "./authentication.css";
import { RegisterForm } from "./components/RegisterForm";

export type ErrorDraft = Partial<Record<keyof ILoginData, string>>;

const authFormType: IFormType = {
  authType: "login",
};

export const AuthForm = () => {
  const [formType, setFormType] = useState(authFormType.authType);

  const handleToggleForm = () => {
    formType === "login" ? setFormType("register") : setFormType("login");
  };

  return (
    <div className="auth">
      <div className="image">
      <p className="image__text">
        Компьютер — это самый удивительный инструмент, с каким я когда-либо
        сталкивался. Это велосипед для нашего сознания.
      </p>
      </div>
      <>
        {formType === "login" ? (
          <LoginForm handleToggleForm={handleToggleForm} />
        ) : (
          <RegisterForm handleToggleForm={handleToggleForm} />
        )}
      </>
    </div>
  );
};
