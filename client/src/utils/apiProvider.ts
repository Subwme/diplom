import jwtParse from "jwt-decode";
import config from "./configServer.json";
import {
  ICategory,
  IComment,
  ILoginData,
  INewProduct,
  IProduct,
  IRegisterData,
  IUser,
  UserData,
} from "../types";

type LoginError = {
  error: {
    email?: string;
    password?: string;
  };
};

type ResponseError = LoginError;

type ResponseSuccess = UserData;

type ResponseType = ResponseError | ResponseSuccess;

export function isResError(res: ResponseType): res is ResponseError {
  if ((res as ResponseError).error) {
    return true;
  }
  return false;
}

export const login = async (content: ILoginData): Promise<ResponseType> => {
  const r = await fetch(config.endPoint + "/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(content),
  });

  if (!r.ok) {
    const networkError = new Error();
    networkError.message = "Что-то пошло не так. Попробуйте еще раз.";
    throw networkError;
  }

  return r.json();
};

export const register = async (
  content: IRegisterData
): Promise<ResponseType> => {
  const r = await fetch(config.endPoint + "/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(content),
  });

  if (!r.ok) {
    const networkError = new Error();
    networkError.message = "Network error";
    throw networkError;
  }

  return r.json();
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

// comments
export const getComments = async (): Promise<IComment[]> => {
  const r = await fetchWithToken(config.endPoint + "/comment", {
    method: "GET",
  });
  return r.json();
};

export const addComment = async (comment: IComment) => {
  const r = await fetchWithToken(config.endPoint + "/comment", {
    method: "POST",
    body: JSON.stringify(comment),
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

export const createUserWithAuth = (data: UserData): IUser => {
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
