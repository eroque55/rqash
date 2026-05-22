export type TUser = {
  id: string;
  email: string;
};

export type TLoginResponse = {
  jwt: string;
  user: TUser;
};
