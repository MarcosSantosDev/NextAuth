import { SignInCredentials } from "@/common/types/auth";
import { UserData } from "@/common/types/user";

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user?: UserData | null;
};


export type AuthProviderProps = {
  children: React.ReactNode
};
