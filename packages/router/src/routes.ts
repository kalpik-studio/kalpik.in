// Generated file. Do not edit manually.

import type { ClientEnv } from "@innbell/constants/env";

export enum AppRoute {
  CHANGE_PASSWORD = "/change-password",
  LOGIN = "/login",
  LOGOUT = "/logout",
  ROOT = "/",
  ACCOUNT = "/account",
  ACCOUNT_EDIT_BUYER = "/account/edit-buyer",
  ACCOUNT_EDIT_VENDOR = "/account/edit-vendor",
  ACCOUNT_EDIT = "/account/edit",
  API_CACHE = "/api/cache",
  API_PUSH_SUBSCRIBE = "/api/push-subscribe",
  AUTH_PASSWORD_RESET = "/auth/password-reset",
  AUTH_VERIFY_EMAIL = "/auth/verify-email",
  ENQUIRIES_BUYER = "/enquiries-buyer",
  ENQUIRIES_VENDOR = "/enquiries-vendor",
  ENQUIRIES = "/enquiries",
  EXPLORE = "/explore",
  PROFILE = "/profile",
  PROFILE_EDIT = "/profile/edit",
  REGISTER = "/register",
  REGISTER_ACCOUNT = "/register/account",
  REGISTER_BUYER = "/register/buyer",
  REGISTER_VENDOR = "/register/vendor",
  REGISTER_VERIFY_EMAIL = "/register/verify-email",
  REVIEWS = "/reviews",
  SUPPORT_NEW = "/support/new",
  SUPPORT = "/support",
  VENDORS_BROADCAST = "/vendors/broadcast",
  VENDORS = "/vendors",
}

export function genAppRoute(
  fn?: ((Route: typeof AppRoute) => AppRoute) | AppRoute,
): string {
  const env: ClientEnv =
    // @ts-ignore window.ENV may be not defined
    (typeof window === "undefined"
      ? process.env
      : (window as unknown as Window & { ENV: ClientEnv })[
          "ENV"
        ]) as unknown as ClientEnv;
  if (!fn) return env?._URL_APP ?? "";
  return `${env?._URL_APP}${typeof fn === "function" ? fn(AppRoute) : fn}`;
}

export enum AdminRoute {
  ROOT = "/",
  API_BLOG = "/api/blog",
  API_COUNT = "/api/count",
  API_IMPERSONATE = "/api/impersonate",
  API = "/api",
  API_WHATSAPP = "/api/whatsapp",
  BLOG = "/blog",
  BUYERS = "/buyers",
  BUYERS_NEW = "/buyers/new",
  CATEGORIES = "/categories",
  CUSTOMERS_NEW = "/customers/new",
  CUSTOMERS = "/customers",
  DASHBOARD = "/dashboard",
  EMAIL_TEMPLATES = "/email-templates",
  EMPLOYEES_NEW = "/employees/new",
  EMPLOYEES = "/employees",
  ENQUIRIES = "/enquiries",
  FEATURE_FLAGS = "/feature-flags",
  IMPERSONATE = "/impersonate",
  LEADS = "/leads",
  LOGIN = "/login",
  LOGOUT = "/logout",
  LOGS = "/logs",
  PRODUCTS_NEW = "/products/new",
  PRODUCTS = "/products",
  REGION_CATEGORIES_NEW = "/region-categories/new",
  REGION_CATEGORIES = "/region-categories",
  REGIONS_NEW = "/regions/new",
  REGIONS = "/regions",
  REVIEWS = "/reviews",
  SETTINGS = "/settings",
  SETTINGS_BACKUPS = "/settings/backups",
  SETTINGS_CACHE = "/settings/cache",
  SETTINGS_EMAIL = "/settings/email",
  SETTINGS_UPLOAD = "/settings/upload",
  SPECIALISATIONS_NEW = "/specialisations/new",
  SPECIALISATIONS = "/specialisations",
  SUPPORT = "/support",
  VENDORS = "/vendors",
  VENDORS_NEW = "/vendors/new",
  WHATSAPP_CHAT = "/whatsapp-chat",
  WHATSAPP_TEMPLATES = "/whatsapp-templates",
}

export function genAdminRoute(
  fn?: ((Route: typeof AdminRoute) => AdminRoute) | AdminRoute,
): string {
  const env: ClientEnv =
    // @ts-ignore window.ENV may be not defined
    (typeof window === "undefined"
      ? process.env
      : (window as unknown as Window & { ENV: ClientEnv })[
          "ENV"
        ]) as unknown as ClientEnv;
  if (!fn) return env?._URL_ADMIN ?? "";
  return `${env?._URL_ADMIN}${typeof fn === "function" ? fn(AdminRoute) : fn}`;
}

export enum WwwRoute {
  ROOT = "/",
  ABOUT_US = "/about-us",
  ABOUT = "/about",
  BLOG = "/blog",
  BUYER = "/buyer",
  CONTACT_US = "/contact-us",
  CONTACT = "/contact",
  LANDING = "/landing",
  PRIVACY_POLICY = "/privacy-policy",
  REFUND_POLICY = "/refund-policy",
  VENDOR = "/vendor",
}

export function genWwwRoute(
  fn?: ((Route: typeof WwwRoute) => WwwRoute) | WwwRoute,
): string {
  const env: ClientEnv =
    // @ts-ignore window.ENV may be not defined
    (typeof window === "undefined"
      ? process.env
      : (window as unknown as Window & { ENV: ClientEnv })[
          "ENV"
        ]) as unknown as ClientEnv;
  if (!fn) return env?._URL_WWW ?? "";
  return `${env?._URL_WWW}${typeof fn === "function" ? fn(WwwRoute) : fn}`;
}
