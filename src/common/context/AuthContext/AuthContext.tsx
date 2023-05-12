import * as React from "react";
import Router, { useRouter } from "next/router";

import * as authServices from "@/common/services/requests/auth";
import * as userServices from "@/common/services/requests/user";
import { SignInCredentials } from "@/common/types/auth";
import { UserData } from "@/common/types/user";
import AuthenticationTokens from "@/common/utils/AuthenticationTokens";
import { AuthProviderProps, AuthContextData } from "./types";

const AuthContext = React.createContext({} as AuthContextData);

export const signOut = () => {        
  const authenticationTokens = new AuthenticationTokens();
  
  authenticationTokens.destroyAuthenticationTokens();

  Router.push("/signIn");
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<UserData>();
  
  const authenticationTokens = new AuthenticationTokens();

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { token, refreshToken } = await authServices.signIn(credentials);

      authenticationTokens.setAuthenticationTokens({ token, refreshToken });

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const token = authenticationTokens.getToken();

    if (token) {
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
