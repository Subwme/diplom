export interface IUser {
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface UserData {
  refreshToken: string;
}

export type NotificationType = "success";

export interface IRegisterData extends Omit<IUser, "isAdmin"> {
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ICategory {
  name: string;
  _id: string;
}

export interface IPosition {
  productId: string;
  count: number;
  productName: string;
  productPrice: number;
}

export interface IProduct {
  name: string;
  price: number;
  amount: number;
  description: string;
  image: string;
  category: ICategory["_id"];
  _id: string;
  count?: number;
  total?: number;
}

export interface INewProduct {
  name: string;
  price: number;
  amount: number;
  description: string;
  image: string;
  category: ICategory["_id"];
}

export interface IProductData {
  name: string;
  category: string;
  price: number;
  amount: number;
  url: string;
}
