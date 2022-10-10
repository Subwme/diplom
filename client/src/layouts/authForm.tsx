import { useState } from "react";
import { NewLoginForm } from "../components/Form/newLoginForm";
import { NewRegisterForm } from "../components/Form/newRegisterForm";
import { IFormType, ILoginData} from "../types";
import "../components/Form/authentication.css";

export type ErrorDraft = Partial<Record<keyof ILoginData, string>>;

const authFormType: IFormType = {
  authType: "login",
};

const AuthForm = () => {
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
          <NewLoginForm
            handleToggleForm={handleToggleForm}
          />
        ) : (
          <NewRegisterForm
            handleToggleForm={handleToggleForm}
          />
        )}
      </>
    </div>
  );
};

export default AuthForm;
