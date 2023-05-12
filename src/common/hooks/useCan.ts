import { useAuthContext } from '@/common/context'

export type UseCanHookProps = {
  permissions?: string[];
  roles?: string[];
}

const useCan = ({ permissions = [], roles = [] }: UseCanHookProps) => {
  const auth = useAuthContext();

  if (auth && auth.isAuthenticated && auth.user) {
    const { user } = auth;

    if (user.permissions.length > 0) {
      const hasAllPermissions = permissions.every(permission => {
        return user.permissions.includes(permission);
      });

      return hasAllPermissions;
    }

    if (user.roles.length > 0) {
      const hasAllRoles = roles.every(role => {
        return user.roles.includes(role);
      });

      return hasAllRoles;
    }
  }

  return false;
}

export default useCan;