import type { RouteObject } from "react-router-dom";

const mainpage = (page: string) =>
  import(`./pages/${page}.tsx`).then((m) => ({ Component: m.default }));

const dashboardpage = (page: string) =>
  import(`./dashboard/${page}.tsx`).then((m) => ({ Component: m.default }));

const Fallback = () => null;

export const routes = [
  // main page
  { path: "/", HydrateFallback: Fallback, lazy: () => mainpage("home") },
  {
    path: "/detail-produk/:id",
    HydrateFallback: Fallback,
    lazy: () => mainpage("produk.detail"),
  },
  {
    path: "/profile",
    HydrateFallback: Fallback,
    lazy: () => mainpage("profile"),
  },
  {
    path: "/cart",
    HydrateFallback: Fallback,
    lazy: () => mainpage("tas"),
  },
  {
    path: "/self-order",
    HydrateFallback: Fallback,
    lazy: () => mainpage("order"),
  },
  {
    path: "/favorite",
    HydrateFallback: Fallback,
    lazy: () => mainpage("favorite"),
  },
  {
    path: "/checkout/:invoice/:token",
    HydrateFallback: Fallback,
    lazy: () => mainpage("checkout.detail"),
  },
  { path: "/login", HydrateFallback: Fallback, lazy: () => mainpage("login") },

  // dashboard
  {
    path: "/app-login",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("login"),
  },
  {
    path: "/dashboard",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("index"),
  },
  {
    path: "/produk",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("produk"),
  },
  {
    path: "/produk/tambah-produk",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("produk.tambahproduk"),
  },
  {
    path: "/produk/detail-produk/:id",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("produk.detailproduk"),
  },
  {
    path: "/order",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("order"),
  },
  {
    path: "/kategori",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("kategori"),
  },
  {
    path: "/customer",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("customer"),
  },
  {
    path: "/pengaturan",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("pengaturan"),
  },
  {
    path: "/pengaturan/profile",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("profile"),
  },
  {
    path: "/pengaturan/password",
    HydrateFallback: Fallback,
    lazy: () => dashboardpage("password"),
  },

  // notfound
  { path: "*", HydrateFallback: Fallback, lazy: () => mainpage("notfound") },
] satisfies RouteObject[];
