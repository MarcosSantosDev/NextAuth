import { setupClientHttp } from '../http';

import { SignInCredentials, AuthenticatedData } from "@/common/types/auth";

export const signIn = async (signInCredentials: SignInCredentials): Promise<AuthenticatedData> => {
  const { data } = await setupClientHttp.post('sessions', signInCredentials);
  
  return data
}
