import { useState } from "react";
import { NewLoginForm } from "./newLoginForm";
import { NewRegisterForm } from "./newRegisterForm";
import { IFormType, ILoginData, IRegisterData } from "../../types";
import "./authentication.css";

export type ErrorDraft = Partial<Record<keyof ILoginData, string>>;
export type AuthData = ILoginData | IRegisterData;
const initialData: AuthData = {
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

const authFormType: IFormType = {
  authType: "login",
};

const AuthForm = () => {

  const [formType, setFormType] = useState(authFormType.authType);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(errorsMap);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleToggleForm = () => {
    formType === "login" ? setFormType("register") : setFormType("login");
    setData(initialData);
    setErrors(errorsMap);
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <p className="auth-image-text">
          Компьютер — это самый удивительный инструмент, с каким я когда-либо
          сталкивался. Это велосипед для нашего сознания.
        </p>
      </div>
      <>
        {formType === "login" ? (
          <NewLoginForm
            data={data}
            onChange={handleChange}
            handleToggleForm={handleToggleForm}
          />
        ) : (
          <NewRegisterForm
            data={data}
            onChange={handleChange}
            handleToggleForm={handleToggleForm}
          />
        )}
      </>
    </div>
  );
};

export default AuthForm;

