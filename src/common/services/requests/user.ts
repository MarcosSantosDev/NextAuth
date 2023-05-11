import clientHttp from '../clientHttp';

import { UserData } from "@/common/types/user";

export const getUser = async (): Promise<UserData> => {
  const { data } = await clientHttp.get('me');
  return data
}