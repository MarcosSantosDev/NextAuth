import Router from "next/router";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AxiosError } from "axios";

import * as services from "@/common/services/requests";
import AuthenticationTokens from "@/common/utils/AuthenticationTokens";
import { SignInCredentials } from "@/common/types/auth";
import { UserData } from "@/common/types/user";
import { useError } from "@/common/store/zustand/useError";

import { STORAGE_NAME_USER } from "./contants";

export type UserAuthState = {
  isAuthenticated: boolean;
  user: UserData | null;
};

export type UserAuthActions = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
};

export type UserAuthData = UserAuthState & UserAuthActions;

const initialState: UserAuthState = {
  isAuthenticated: false,
  user: null
}

export const useUserAuth = create(persist<UserAuthData>((set) => ({
  ...initialState,
  signIn: async (credentials) => {
    const authenticationTokens = new AuthenticationTokens();

    try {
      const { token, refreshToken } = await services.signIn(credentials);

      authenticationTokens.setAuthenticationTokens({ token, refreshToken });

      const { email, permissions, roles } = await services.getUser();

      set({ user: { email, permissions, roles }, isAuthenticated: true });

      Router.push("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        useError.getState().setError(error?.response?.data.message);
      }
    }
  },
  signOut: () => {
    const authenticationTokens = new AuthenticationTokens();

    authenticationTokens.destroyAuthenticationTokens();
    useUserAuth.persist.clearStorage()
    
    set(initialState);
    Router.push("/signIn");
  }
}), { name: STORAGE_NAME_USER }))