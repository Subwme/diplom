import { ILoginData, IRegisterData, IUser } from "../types";
import jwtParse from "jwt-decode";

export const getUserFromLocalStorage = (): IUser | null => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return null;
  }
  return jwtParse(token);
};

export const getProductsInBasketIdListFromLocalStorage = (): string[] => {
  const idList = localStorage.getItem("productInBasketIdList");
  if (idList === null) {
    return [];
  }
  return JSON.parse(idList);
};

const minLengthName = 3;
const minLengthPassword = 6;
const emailRegExp = /@/;
const nameCount = `Минимальная длина имени ${minLengthName} символа`;
const nameRequire = "Имя обязательно для заполнения";
const passwordCount = `Минимальная длина пароля ${minLengthPassword} символов`;
const passwordRequire = "Пароль обязателен для заполнения";
const isEmailCondition = "Введите корректный Email";
const emailRequire = "Email обязателен для заполнения";

const validateConfig = {
  name: {
    count: nameCount,
    require: nameRequire,
  },
  email: {
    isEmail: isEmailCondition,
    require: emailRequire,
  },
  password: {
    count: passwordCount,
    require: passwordRequire,
    noMatchPassword: () => alert("Пароли не совпадают!"),
  },
};

type ErrorMap<T> = Partial<Record<keyof T, string>>;

export function validateLogin(content: ILoginData): ErrorMap<ILoginData> {
  const errors: ErrorMap<ILoginData> = {};

  if (content.email === "") {
    errors.email = validateConfig.email.require;
  }

  if (content.email && !emailRegExp.test(content.email)) {
    errors.email = validateConfig.email.isEmail;
  }

  if (content.password === "") {
    errors.password = validateConfig.password.require;
  }

  if (content.password && content.password.length < minLengthPassword) {
    errors.password = validateConfig.password.count;
  }

  return errors;
}

export function validateRegister(
  content: IRegisterData
): ErrorMap<IRegisterData> {
  const errors: ErrorMap<IRegisterData> = {};

  if (content.name === "") {
    errors.name = validateConfig.name.require;
  }

  if (content.name && content.name.length < minLengthName) {
    errors.name = validateConfig.name.count;
  }

  if (content.email === "") {
    errors.email = validateConfig.email.require;
  }

  if (content.email && !emailRegExp.test(content.email)) {
    errors.email = validateConfig.email.isEmail;
  }

  if (content.password === "") {
    errors.password = validateConfig.password.require;
  }

  if (content.password && content.password.length < minLengthPassword) {
    errors.password = validateConfig.password.count;
  }

  if (content.confirmPassword === "") {
    errors.confirmPassword = validateConfig.password.require;
  }

  if (
    content.confirmPassword &&
    content.confirmPassword.length < minLengthPassword
  ) {
    errors.confirmPassword = validateConfig.password.count;
  }

  if (content.password !== content.confirmPassword) {
    validateConfig.password.noMatchPassword();
  }

  return errors;
}
