export interface IUser {
  email: string;
  name: string;
  isAdmin: boolean;
  _id: string;
}

export interface UserData {
  refreshToken: string;
}

export type NotificationType = "success";

export interface IRegisterData extends Omit<IUser, "isAdmin"> {
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface ILoginData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IFormType {
  authType: "login" | "register";
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

export interface IComment {
  content: string;
  userId: IUser["_id"];
  productId: IProduct["_id"];
  _id: string;
}
