import { setupClientHttp } from '../http';

import { UserData } from "@/common/types/user";

export const getUser = async (): Promise<UserData> => {
  const { data } = await setupClientHttp.get('me');
  return data
}
