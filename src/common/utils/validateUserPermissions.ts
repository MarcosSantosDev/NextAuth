type User = {
  permissions?: string[];
  roles?: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export const validateUserPermissions = ({ user, permissions = [], roles = [] }: ValidateUserPermissionsParams) => {
  if (permissions.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions?.includes(permission);
    });

    return hasAllPermissions;
  }

  if (roles.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles?.includes(role);
    });

    return hasAllRoles;
  }

  return false;
}