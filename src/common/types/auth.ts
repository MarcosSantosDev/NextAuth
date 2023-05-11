export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthenticatedData = {
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
};
