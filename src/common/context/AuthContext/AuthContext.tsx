import * as React from "react";
import Router, { useRouter } from "next/router";

import * as services from "@/common/services/requests";
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
  const [user, setUser] = React.useState<UserData | null>(null);

  const authenticationTokens = new AuthenticationTokens();
  const token = authenticationTokens.getToken();

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { token, refreshToken } = await services.signIn(credentials);

      authenticationTokens.setAuthenticationTokens({ token, refreshToken });

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (token) {
      services
        .getUser()
        .then((data) => {
          const { email, permissions, roles } = data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          setUser(null);
          signOut();
        });
    }
  }, [router.pathname, setUser, token]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated: !!user,
        user,
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
