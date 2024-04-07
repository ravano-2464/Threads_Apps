export type IUser = {
  id?: number;
  full_name?: string;
  username?: string;
  email?: string;
  image?: string | Blob;
  description?: string;
}

export type IUserRegister = {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export type IUserlogin = {
  email: string;
  password: string;
}