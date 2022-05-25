import { IUser, IProduct, ICategory } from "./../types";

export interface IState {
  user: IUser | null;
  products: IProduct[];
  categories: ICategory[];
  sortBy: "asc" | "desc" | null;
  searchText: string;
  selectedCategoryName: string | ICategory | null;
  productInBasketIdList: string[]
  selecteEditProduct: string | null;
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
  SelectEditProduct = "select-edit-product",
  SetUpdateProduct = "set-update-product",
  AddedProduct = "add-product",
  ClearProductsIdInBasket = "clear-products-in-basket",
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

export interface SelectEditProduct {
  type: ActionTypes.SelectEditProduct;
  payload: string;
}

export interface SetUpdateProduct {
  type: ActionTypes.SetUpdateProduct;
  payload: IProduct;
}

export interface AddedProduct {
  type: ActionTypes.AddedProduct;
  payload: IProduct;
}

export interface ClearProductsIdInBasket {
  type: ActionTypes.ClearProductsIdInBasket;
  payload: string[];
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
  | RemovedProductFromAdmin
  | SelectEditProduct
  | SetUpdateProduct
  | AddedProduct
  | ClearProductsIdInBasket;
