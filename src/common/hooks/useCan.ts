import { useAuthContext } from '@/common/context'
import { validateUserPermissions } from '@/common/utils/validateUserPermissions';

export type UseCanHookProps = {
  permissions?: string[];
  roles?: string[];
}

const useCan = ({ permissions = [], roles = [] }: UseCanHookProps) => {
  const auth = useAuthContext();

  if (!(auth?.isAuthenticated && auth?.user)) {
    return false
  }

  const { user } = auth;

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  });

  return userHasValidPermissions;
}

export default useCan;