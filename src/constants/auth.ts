export const ADMIN_EMAIL = "zaid@gmail.com";

export const AUTH_COOKIE_NAME = "pegador_auth";
export const ADMIN_COOKIE_NAME = "pegador_admin";

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
