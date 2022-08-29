import { getProductsInBasketIdListFromLocalStorage } from "../../utils/utils";
import { getUserFromLocalStorage } from "../../utils/utils";
import { ICategory, IComment, IProduct, IUser } from "./../../types";
import {
  IState,
  ActionTypes,
  SetUser,
  Action,
  SetProducts,
  SetCategories,
  SetSortByAsc,
  SetSortByDesc,
  SetSearchText,
  SetSelectedCategory,
  RemoveProductFromBasket,
  AddProductToBasket,
  RemovedProductFromAdmin,
  SelectEditProduct,
  SetUpdateProduct,
  AddedProduct,
  ClearProductsIdInBasket,
  SetComments,
  AddComment,
} from "../types";

const initialState: IState = {
  user: getUserFromLocalStorage(),
  products: [],
  categories: [],
  comments: [],
  sortBy: null,
  searchText: "",
  selectedCategoryName: null,
  productInBasketIdList: getProductsInBasketIdListFromLocalStorage(),
  selecteEditProduct: null,
};

export const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return { ...state, user: action.payload };
    case ActionTypes.SetProducts:
      return { ...state, products: action.payload };
    case ActionTypes.SetCategories:
      return { ...state, categories: action.payload };
    case ActionTypes.SetComments:
      return { ...state, comments: action.payload };
    case ActionTypes.SetSortByAsc:
      return { ...state, sortBy: "asc" };
    case ActionTypes.SetSortByDesc:
      return { ...state, sortBy: "desc" };
    case ActionTypes.SetSearchText:
      return { ...state, searchText: action.payload };
    case ActionTypes.SetSelectedCategory:
      return { ...state, selectedCategoryName: action.payload };
    case ActionTypes.AddProductToBasket: {
      const updatedProductInBasketIdList = [
        ...state.productInBasketIdList,
        action.payload,
      ];

      // store subscribe
      localStorage.setItem(
        "productInBasketIdList",
        JSON.stringify(updatedProductInBasketIdList)
      );
      return { ...state, productInBasketIdList: updatedProductInBasketIdList };
    }
    case ActionTypes.RemoveProductFromBasket: {
      const index = state.productInBasketIdList.indexOf(action.payload);
      if (index === -1) {
        return state;
      }
      const updatedProductInBasketIdList = [
        ...state.productInBasketIdList.slice(0, index),
        ...state.productInBasketIdList.slice(index + 1),
      ];
      // store subscribe
      localStorage.setItem(
        "productInBasketIdList",
        JSON.stringify(updatedProductInBasketIdList)
      );
      return { ...state, productInBasketIdList: updatedProductInBasketIdList };
    }
    case ActionTypes.ClearProductsIdInBasket: {
      return { ...state, productInBasketIdList: action.payload };
    }
    case ActionTypes.RemovedProductFromAdmin: {
      const updatedProductFromAdminList = state.products.filter((p) => {
        return p._id !== action.payload;
      });
      return { ...state, products: updatedProductFromAdminList };
    }
    case ActionTypes.SelectEditProduct: {
      return { ...state, selecteEditProduct: action.payload };
    }
    case ActionTypes.SetUpdateProduct: {
      const updatedProduct = action.payload;
      const updatedProducts = state.products.map((p) => {
        if (p._id === updatedProduct._id) {
          return updatedProduct;
        }
        return p;
      });
      return { ...state, products: updatedProducts };
    }
    case ActionTypes.AddedProduct: {
      return { ...state, products: [action.payload, ...state.products] };
    }
    case ActionTypes.AddComment: {
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    }
    default:
      return state;
  }
};

export const setUserAction = (payload: IUser | null): SetUser => ({
  type: ActionTypes.SetUser,
  payload,
});

export const setProductsAction = (payload: IProduct[]): SetProducts => ({
  type: ActionTypes.SetProducts,
  payload,
});

export const setCategoriesAction = (payload: ICategory[]): SetCategories => ({
  type: ActionTypes.SetCategories,
  payload,
});

export const setCommnetsAction = (payload: IComment[]): SetComments => ({
  type: ActionTypes.SetComments,
  payload,
});

export const setSortByAscAction = (): SetSortByAsc => ({
  type: ActionTypes.SetSortByAsc,
});

export const setSortByDescAction = (): SetSortByDesc => ({
  type: ActionTypes.SetSortByDesc,
});

export const setSearchTextAction = (payload: string): SetSearchText => ({
  type: ActionTypes.SetSearchText,
  payload,
});

export const setSelectedCategoryAction = (
  payload: string
): SetSelectedCategory => ({
  type: ActionTypes.SetSelectedCategory,
  payload,
});

export const addProductToBasketAction = (
  payload: string
): AddProductToBasket => ({
  type: ActionTypes.AddProductToBasket,
  payload,
});

export const removeProductFromBasketAction = (
  payload: string
): RemoveProductFromBasket => ({
  type: ActionTypes.RemoveProductFromBasket,
  payload,
});

export const removeProductFromAdminAction = (
  payload: string
): RemovedProductFromAdmin => ({
  type: ActionTypes.RemovedProductFromAdmin,
  payload,
});

export const selectEditProductAction = (
  payload: string
): SelectEditProduct => ({
  type: ActionTypes.SelectEditProduct,
  payload,
});

export const setUpdateProductAction = (
  payload: IProduct
): SetUpdateProduct => ({
  type: ActionTypes.SetUpdateProduct,
  payload,
});

export const addedProductAction = (payload: IProduct): AddedProduct => ({
  type: ActionTypes.AddedProduct,
  payload,
});

export const addedCommentAction = (payload: IComment): AddComment => ({
  type: ActionTypes.AddComment,
  payload,
});

export const clearProductsIdInBasketAction = (
  payload: string[]
): ClearProductsIdInBasket => ({
  type: ActionTypes.ClearProductsIdInBasket,
  payload,
});
