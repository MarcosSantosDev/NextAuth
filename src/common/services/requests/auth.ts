import clientHttp from '../clientHttp';

import { SignInCredentials, AuthenticatedData } from "@/common/types/auth";

export const signIn = async (signInCredentials: SignInCredentials): Promise<AuthenticatedData> => {
  const { data } = await clientHttp.post('sessions', signInCredentials);
  return data
}

export const authRefreshToken = async (token: string): Promise<AuthenticatedData> => {
  const { data } = await clientHttp.post('refresh', { refreshToken: token });
  return data
}
