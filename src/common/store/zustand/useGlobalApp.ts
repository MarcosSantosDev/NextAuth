import { create } from 'zustand'

import AuthenticationTokens from '@/common/utils/AuthenticationTokens';

import { useUserAuth } from './useUserAuth'

export const useGlobalApp = create(() => ({
  validatePersistedDataThatNeedsAuthentication: () => {
    const authenticationTokens = new AuthenticationTokens();

    const token = authenticationTokens.getToken();
    const refreshToken = authenticationTokens.getRefreshToken();
    
    if(!token && !refreshToken) {
      useUserAuth.persist.clearStorage();
    }
  }
}))