export type IProduct = {
  battery: string;
  brand: string;
  camera: string;
  _id?: string;
  description: string;
  image: string;
  keyfeatures: string[];
  model: string;
  os: string;
  price: number;
  productName: string;
  quantity: number;
  size: string;
  status: boolean;
  storage: string;
};
export type IUser = {
  name: string;
  password: string;
  email: string;
  image: string;
};
export interface IComment {
  _id: string;
  user: IUser;
  comment: string;
  product: IProduct;
  createdAt: Date;
}
