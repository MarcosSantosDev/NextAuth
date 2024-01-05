import useStore from "@/common/store/zustand/useStore";
import { useUserAuth } from "@/common/store/zustand/useUserAuth";

import { validateUserPermissions } from '@/common/utils/validateUserPermissions';

export type UseCanHookProps = {
  permissions?: string[];
  roles?: string[];
}

const useCan = ({ permissions = [], roles = [] }: UseCanHookProps) => {
  const userAuth = useStore(useUserAuth, (state) => state);

  if (!userAuth?.isAuthenticated || userAuth?.user === null) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user: userAuth?.user,
    permissions,
    roles
  });

  return userHasValidPermissions;
}

export default useCan;