import * as React from "react";
import Router, { useRouter } from "next/router";

import * as authServices from "@/common/services/requests/auth";
import * as userServices from "@/common/services/requests/user";
import { SignInCredentials } from "@/common/types/auth";
import { UserData } from "@/common/types/user";
import {
  getAuthenticationToken,
  setAuthenticationTokens,
  destroyAuthenticationTokens,
} from "@/common/utils/auth";
import { AuthProviderProps, AuthContextData } from "./types";

const AuthContext = React.createContext({} as AuthContextData);

export const signOut = () => {
  if (!(typeof window === 'undefined')) {         
    destroyAuthenticationTokens();
  
    Router.push("/signIn");
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<UserData>();

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { token, refreshToken } = await authServices.signIn(credentials);

      setAuthenticationTokens({ token, refreshToken });

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const authToken = getAuthenticationToken();

    if (authToken) {
      userServices.getUser().then((data) => {
        const { email, permissions, roles } = data;

        setUser({ email, permissions, roles });
      })
      .catch(() => {
        signOut();
      });
    }
  }, [router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  try {
    const context = React.useContext(AuthContext);

    if (context) {
      return context;
    }

    throw new Error(
      "To use the useAuthContext hook, wrapper your app with AuthProvider"
    );
  } catch (error) {
    console.error(error);
  }
};
