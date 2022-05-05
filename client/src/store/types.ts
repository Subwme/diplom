import { IUser, IProduct, ICategory } from "./../types";

export interface IState {
  user: IUser | null;
  products: IProduct[];
  categories: ICategory[];
  sortBy: "asc" | "desc" | null;
  searchText: string;
  selectedCategoryName: string | ICategory | null;
  productInBasketIdList: string[];
}

export enum ActionTypes {
  SetUser = "set-user",
  SetProducts = "set-products",
  SetCategories = "set-categories",
  SetSortByAsc = "set-sort-by-asc",
  SetSortByDesc = "set-sort-by-desc",
  SetSearchText = "set-search-text",
  SetSelectedCategory = "set-selected-categry",
  AddProductToBasket = "add-product-to-basket",
  RemoveProductFromBasket = "remove-product-from-basket",
  RemovedProductFromAdmin = "remove-product-from-admin",
}

export interface SetUser {
  type: ActionTypes.SetUser;
  payload: IUser | null;
}

export interface SetProducts {
  type: ActionTypes.SetProducts;
  payload: IProduct[];
}

export interface SetCategories {
  type: ActionTypes.SetCategories;
  payload: ICategory[];
}

export interface SetSortByAsc {
  type: ActionTypes.SetSortByAsc;
}

export interface SetSortByDesc {
  type: ActionTypes.SetSortByDesc;
}

export interface SetSearchText {
  type: ActionTypes.SetSearchText;
  payload: string;
}

export interface SetSelectedCategory {
  type: ActionTypes.SetSelectedCategory;
  payload: string;
}

export interface AddProductToBasket {
  type: ActionTypes.AddProductToBasket;
  payload: string;
}

export interface RemoveProductFromBasket {
  type: ActionTypes.RemoveProductFromBasket;
  payload: string;
}

export interface RemovedProductFromAdmin {
  type: ActionTypes.RemovedProductFromAdmin;
  payload: string;
}

export type Action =
  | SetUser
  | SetProducts
  | SetCategories
  | SetSortByAsc
  | SetSortByDesc
  | SetSearchText
  | SetSelectedCategory
  | AddProductToBasket
  | RemoveProductFromBasket
  | RemovedProductFromAdmin;
