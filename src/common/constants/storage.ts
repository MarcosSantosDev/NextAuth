export const APP_PREFIX = '@app-next-auth';

// AUTHENTICATION
export const COOKIE_AUTH_TOKEN = `${APP_PREFIX}:token`;
export const COOKIE_AUTH_REFRESHTOKEN = `${APP_PREFIX}:refreshtoken`;
export const COOKIE_AUTH_MAX_AGE = 60 * 60 * 24 * 30 // 30 days;