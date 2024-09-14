/**
 * Array route yang dapat diakses secara public
 * Route ini tidak membutuhkan otentikasi
 * @types {string[]}
 */

export const publicRoutes = ["/"];

/**
 * Array route yang digunakan untuk otentikasi
 * Route ini akan redirect ke /dashboard
 * @types {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Prefix untuk route otentikasi
 * Route dengan prefix ini digunakan untuk Otentikasi API
 * @types {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path setelah login
 *  @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
