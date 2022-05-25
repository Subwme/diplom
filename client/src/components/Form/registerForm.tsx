import { useForm } from "react-hook-form";
import { IRegisterData } from "../../types";
import { setUserAction } from "../../store/reducers/reducer";
import { useAppDispatch } from "../../store";
import { authentication } from "../../apiProvider";
import config from "../../configServer.json";
import "./authentication.css";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRegisterData>({ mode: "onChange" });

  const submitFunc = (data: IRegisterData) => {
    authentication(config.endPoint + "/auth/sign-up", data).then((user) => {
      dispatch(setUserAction(user));
      history.push("/");
    });
    reset();
  };

  return (
    <div className="auth">
      <div className="authentication-form">
        <h1>Регистрация</h1>

        <form onSubmit={handleSubmit(submitFunc)}>
          <label className="label">
            <span className="authentication-form__text">Имя</span>
            <input
              type="text"
              {...register("name", {
                required: { value: true, message: "Укажите ваше имя..." },
                minLength: {
                  value: 3,
                  message: "Минимальная длина имени 3 - символа",
                },
              })}
            />
          </label>
          <p className="error">{errors.name && errors.name.message}</p>

          <label className="label">
            <span className="authentication-form__text">Email</span>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Пожалуйста, укажите адрес электронной почты",
                },
                pattern: {
                  value: /@/,
                  message: "Email адрес должен содержать символ @",
                },
              })}
            />
          </label>
          <p className="error">{errors.email && errors.email.message}</p>

          <label className="label">
            <span className="authentication-form__text">Пароль</span>
            <input
              autoComplete="off"
              type="password"
              {...register("password", {
                required: { value: true, message: "Укажите пароль..." },
                minLength: {
                  value: 8,
                  message: "Минимальная длина пароля 8 - символов",
                },
                // pattern: {
                //   value: /([A-Z])([0-9])+/g,
                //   message: "Пароль должен содержать хотябы одну заглавную букву",
                // },
              })}
            />
          </label>
          <p className="error">{errors.password && errors.password.message}</p>
          <input type="submit" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
