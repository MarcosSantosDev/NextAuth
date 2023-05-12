import { clientHttp } from '../http';

import { SignInCredentials, AuthenticatedData } from "@/common/types/auth";

export const signIn = async (signInCredentials: SignInCredentials): Promise<AuthenticatedData> => {
  const { data } = await clientHttp.post('sessions', signInCredentials);
  
  return data
}
