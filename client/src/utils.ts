import { IUser } from "./types";
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
