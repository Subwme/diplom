import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login, register } from "../../apiProvider";
import { useAppDispatch } from "../../store";
import { setUserAction } from "../../store/reducers/reducer";
import { IFormType, ILoginData, IRegisterData } from "../../types";
import { validateLogin, validateRegister } from "../../utils";
import "./authentication.css";
import { NewLoginForm } from "./newLoginForm";
import { NewRegisterForm } from "./newRegisterForm";
//TODO: утилитарные типы

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
  const history = useHistory();
  const dispatch = useAppDispatch();
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
    console.log("1");

    formType === "login" ? setFormType("register") : setFormType("login");
    setData(initialData);
    setErrors(errorsMap);
  };

  const onSubmit = (event: React.FormEvent) => {
    console.log(2);

    event.preventDefault();
    //loginStep
    if (formType === "login") {
      const newErrorMapLogin = validateLogin(data);

      if (Object.keys(newErrorMapLogin).length > 0) {
        setErrors(newErrorMapLogin);
        return;
      }

        const sendToData: ILoginData = {
          email: data.email,
          password: data.password,
        };

        login(sendToData)
          .then((user) => {
            dispatch(setUserAction(user));

            if (user.isAdmin === false) {
              history.push("/");
            }

            if (user.isAdmin === true) {
              history.push("/admin");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
    //registerStep
    if (formType === "register") {
      const newErrorMapRegister = validateRegister(data);
      
      if (Object.keys(newErrorMapRegister).length > 0) {
        setErrors(newErrorMapRegister);
        return;
      }

      if (data.password !== data.confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      const sendToData: AuthData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      register(sendToData)
        .then((user) => {
          dispatch(setUserAction(user));
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // TODO: две формы, логин и рега
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
            errors={errors}
            onChange={handleChange}
            onSubmit={onSubmit}
            handleToggleForm={handleToggleForm}
          />
        ) : (
          <NewRegisterForm
            data={data}
            errors={errors}
            onChange={handleChange}
            onSubmit={onSubmit}
            handleToggleForm={handleToggleForm}
          />
        )}
      </>
    </div>
  );
};

export default AuthForm;

// type Names = keyof AuthData;
// type FieldsR = Record<Names, string>;
// type Fields = Partial<FieldsR>;
// type Fields2 = { [key in Names]?: string };

// type typeObj = Record<"a" | "b" | "c", string>

//TODO: Не должно быть магических цифр
//TODO: сначала придумаю сам, как нибудь
//TODO: почитать про шаблоны для формы - js шаблоны
