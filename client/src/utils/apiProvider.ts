import jwtParse from "jwt-decode";
import config from "./configServer.json";
import {
  ICategory,
  ILoginData,
  INewProduct,
  IProduct,
  IUser,
  UserData,
} from "../types";

export const login = async (content: ILoginData): Promise<IUser> => {
  const r = await fetch(config.endPoint + "/auth/sign-inb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(content),
  });
  let json;

  if (r.status === 404) {
    throw new Error("Oops something went wrong");
  }

  try {
    json = await r.json();
  } catch (error) {
    throw new Error("Oops something went wrong");
  }

  const { error }= json;

  if (error) {
    throw new Error("Указан неверный адрес почты");
  }

  return createUserWithAuth(json);
};

export const register = async (content: ILoginData): Promise<IUser> => {
  const r = await fetch(config.endPoint + "/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(content),
  });
  const json = await r.json();

  return createUserWithAuth(json);
};

export const getCategories = async (): Promise<ICategory[]> => {
  const r = await fetchWithToken(config.endPoint + "/category", {
    method: "GET",
  });
  return r.json();
};
// products methods
export const getProducts = async (): Promise<IProduct[]> => {
  const r = await fetchWithToken(config.endPoint + "/product", {
    method: "GET",
  });
  return r.json();
};

export const addProduct = async (product: INewProduct) => {
  const r = await fetchWithToken(config.endPoint + "/product", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (r.status === 404) {
    throw new Error("Oops something went wrong");
  }

  if (!r.ok) {
    throw new Error();
  }
  return r.json();
};

export const updateProduct = async (product: IProduct) => {
  const r = await fetchWithToken(config.endPoint + `/product/${product._id}`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!r.ok) {
    throw new Error();
  }
  return r.json();
};

export const deleteProduct = async (productId: string) => {
  const r = await fetchWithToken(config.endPoint + `/product/${productId}`, {
    method: "DELETE",
  });
  if (!r.ok) {
    throw new Error();
  }
  return;
};

const fetchWithToken = (url: string, options?: RequestInit | undefined) => {
  const token = localStorage.getItem("token");
  if (token === null) {
    throw new Error("Unauthorized");
  }
  const { headers = {}, ...restOfOptions } = options || {};

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    ...restOfOptions,
  });
};

const createUserWithAuth = (data: UserData): IUser => {
  const jwtData: IUser = jwtParse(data.refreshToken);
  const user = {
    email: jwtData.email,
    name: jwtData.name,
    isAdmin: jwtData.isAdmin,
    _id: jwtData._id,
  };
  localStorage.setItem("token", data.refreshToken);

  return user;
};
