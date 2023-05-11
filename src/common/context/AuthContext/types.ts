import { SignInCredentials } from "@/common/types/auth";
import { UserData } from "@/common/types/user";

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user?: UserData;
};


export type AuthProviderProps = {
  children: React.ReactNode
};
