export default function DashboardLayout({
  children,
  text,
  subtext,
  component,
  setting,
}: {
  children: React.ReactNode;
  text?: string;
  subtext?: string;
  component?: React.ReactNode;
  setting?: boolean;
}) {
  const setnamepage = usePageStore((state) => state.changeNamePage);

  useEffect(() => {
    setnamepage(text ?? "Default");
  }, []);

  return (
    <ProtectedRoute>
      <div
        className="flex w-full min-h-screen"
        style={{ fontFamily: "JetBrains Mono" }}
      >
        <Header />
        <MainBody>
          {setting ? (
            <>{children}</>
          ) : (
            <div className="p-3 lg:max-w-full">
              {text && (
                <div className="flex items-center justify-between">
                  <h2 className="font-montserrat #dark:text-white text-2xl font-semibold">
                    {text}
                  </h2>
                  <>{component}</>
                </div>
              )}
              {subtext && (
                <p className="font-worksans #dark:text-gray-400 text-gray-500">
                  {subtext}
                </p>
              )}
              <div className="mt-3">{children}</div>
            </div>
          )}
        </MainBody>
      </div>
    </ProtectedRoute>
  );
}

import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Bell,
  BookUser,
  CakeSlice,
  LogOut,
  Moon,
  Package2,
  ScrollText,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import { LOGOBAR, LOGOMINIBAR, NEWLABEL } from "../lib/config";
import { useMiniBarStore, usePageStore, useSideBarStore } from "../lib/menubar";
import { useThemeStore } from "../lib/theme";

export function HeaderContent() {
  const isMiniBar = useMiniBarStore((state) => state.isMiniBar);
  const handleToggleisSideBar = useSideBarStore((state) => state.toggleSideBar);
  const toggleStaticMiniBar = useMiniBarStore(
    (state) => state.toggleStaticMiniBar
  );
  const [isNotification, setIsNotification] = useState(false);

  const namepage = usePageStore((state) => state.namepage);

  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={clsx(
        "#dark:bg-black header fixed left-0 right-0 top-0 z-30 flex items-center border-[#e5e6ea] border-b bg-gray-50 px-6 py-4 lg:ml-60 xl:ml-[265px]",
        mounted && isMiniBar && "lg:ml-16!"
      )}
    >
      <div
        className={clsx(
          "#dark:bg-transparent relative -my-4 -ml-6 mr-2 flex shrink-0 py-3 pl-3 md:mr-4 lg:hidden"
        )}
      >
        <button
          className="#dark:text-gray-200 relative mr-2 text-gray-800"
          onClick={() => {
            toggleStaticMiniBar(false);
            handleToggleisSideBar();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="w-8"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="relative h-10 shrink-0">
          <Link className="relative block h-10 py-1 md:py-0" to="/dashboard">
            <>
              <img
                src={LOGOMINIBAR}
                alt="logo single"
                className="block h-full md:hidden"
              />
              <img
                src={LOGOBAR}
                alt="brand logo"
                className="hidden h-full md:block"
              />
            </>
          </Link>
        </div>
      </div>
      <h1 className="font-montserrat #dark:text-gray-200 truncate text-lg font-semibold text-gray-800 md:text-xl">
        {namepage}
      </h1>
      <div className="flex items-center justify-end flex-1 pl-3">
        <button
          className={clsx(
            "hover:bg-muted-foreground/20 cursor-pointer #dark:text-gray-300 relative mr-2 size-8 rounded p-2 transition-all",
            isNotification ? "text-red-500" : "text-gray-700"
          )}
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r0:"
          data-state="closed"
          id="notification"
          onClick={() => setIsNotification(!isNotification)}
        >
          <Bell />
        </button>
        <Tooltip
          style={{ zIndex: 999 }}
          anchorSelect="#notification"
          place="left"
        >
          notifikasi
        </Tooltip>
        {isNotification && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-label="notifications"
            className="absolute top-20 grid w-[400px] gap-1 rounded border border-slate-200 bg-white p-2"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsNotification(false)}>
                <X size={16} />
              </button>
            </div>
            <span className="w-full p-2 text-blue-500 rounded bg-blue-50">
              Soon
            </span>
          </motion.div>
        )}
        <div className="relative">
          <button
            onClick={toggleTheme}
            className="p-2 transition-all duration-200 rounded-lg hover:bg-muted-foreground/20 size-8"
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MainBody({ children }: { children: React.ReactNode }) {
  const isMiniBar = useMiniBarStore((state) => state.isMiniBar);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={clsx(
        "#dark:bg-black main-dashboard flex w-full flex-1 flex-col bg-gray-50 lg:pl-60 xl:pl-[265px]",
        mounted && isMiniBar && "lg:pl-16!"
      )}
    >
      <HeaderContent />
      <div className="#dark:text-white mt-16 flex h-full w-full flex-1 flex-col p-4 pb-20 lg:pb-4">
        {children}
      </div>
    </div>
  );
}

export function LayoutApp({
  children,
  text,
  subtext,
  component,
}: {
  children: React.ReactNode;
  text: string;
  subtext: string;
  component?: React.ReactNode;
}) {
  const setnamepage = usePageStore((state) => state.changeNamePage);

  useEffect(() => {
    setnamepage(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="p-3 lg:max-w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-montserrat #dark:text-white text-2xl font-semibold">
            {text}
          </h2>
          <>{component}</>
        </div>
        {subtext && (
          <p className="font-worksans #dark:text-gray-400 text-gray-500">
            {subtext}
          </p>
        )}
        <div className="mt-3">{children}</div>
      </div>
    </>
  );
}

export function Header() {
  const isMiniBar = useMiniBarStore((state) => state.isMiniBar);
  const handleToggleisMiniBar = useMiniBarStore((state) => state.toggleMiniBar);
  const isSideBar = useSideBarStore((state) => state.isSideBar);
  const handleToggleisSideBar = useSideBarStore((state) => state.toggleSideBar);

  // const user = useUserProfileStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {isSideBar && (
        <button
          onClick={handleToggleisSideBar}
          className="fixed w-screen h-screen pr-10 transition-opacity duration-200 bg-black bg-opacity-75 d-backdrop z-100 lg:hidden"
        ></button>
      )}
      <div
        className={clsx(
          "#dark:bg-black duration-30 side-menu fixed z-100 flex h-full w-72 shrink-0 -translate-x-full transform-gpu flex-col border bg-gray-50 transition-transform lg:translate-x-0 border-[#e5e6ea]",
          mounted && isMiniBar
            ? "border-r lg:w-16"
            : "border-r lg:w-60 xl:w-[265px]",
          isSideBar && "translate-x-0 border-r"
        )}
      >
        <header
          id="main-header"
          className={clsx(
            "#dark:bg-black relative flex bg-gray-50 py-3 pl-5",
            mounted && isMiniBar && "lg:px-1.5"
          )}
        >
          <div className="#dark:text-gray-800 relative flex items-center">
            <>
              {mounted && isMiniBar ? (
                <Link
                  className={clsx(
                    "relative block h-12 w-20",
                    isMiniBar && "lg:mb-2 lg:h-9 lg:w-14"
                  )}
                  to="/app/dashboard"
                >
                  <img
                    src={LOGOMINIBAR}
                    className="object-contain w-full h-10"
                    alt="brand logo"
                  />
                </Link>
              ) : (
                <Link
                  className={clsx(
                    "relative block w-36",
                    isMiniBar && "lg:mb-2 lg:h-9 lg:w-14"
                  )}
                  to="/app/dashboard"
                >
                  <img
                    src={LOGOBAR}
                    className="object-contain w-full"
                    alt="brand logo"
                  />
                </Link>
              )}
            </>
          </div>
          <div className="absolute top-0 bottom-0 items-center hidden -right-3 translate-y-7 lg:flex">
            <button
              onClick={() => {
                handleToggleisMiniBar();
              }}
              className={clsx(
                "bg-white h-6 w-6 rounded-full border p-0.5 transition duration-200 border-[#e5e6ea] cursor-pointer",
                isMiniBar ? "rotate-180" : "rotate-0"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </header>
        <aside
          className={clsx(
            "relative mb-4 border-b pb-4 border-[#e5e6ea]",
            mounted && isMiniBar && "lg:mb-2 lg:pb-2"
          )}
        >
          <div className={clsx("flex pl-4", mounted && isMiniBar && "lg:px-2")}>
            <div>
              <div className="bg-primary #dark:bg-red-700 flex h-12 w-12 items-center justify-center rounded-lg text-white">
                <span className="text-lg font-semibold">TA</span>
              </div>
            </div>
            {mounted && !isMiniBar && (
              <div className="#dark:text-white pl-2 pt-1 text-sm">
                <h2 className="font-semibold fname">Tholabul Amin</h2>
                <p className="#dark:text-gray-400 role mr-2 mt-0.5 text-xs font-semibold text-gray-500">
                  UI-UX
                </p>
              </div>
            )}
          </div>
        </aside>
        <SideBarMenu />
        {mounted && !isMiniBar && (
          <footer
            id="main-footer"
            className="#dark:text-gray-200 border-t px-5 py-3 text-sm text-gray-500 border-[#e5e6ea]"
          >
            <p className="mt-2 text-xs">GMarket - © 2025</p>
            <em className="text-xs">v1.0.1.6913ed2</em>
          </footer>
        )}
      </div>
    </>
  );
}

export function SideBarMenu() {
  const isMiniBar = useMiniBarStore((state) => state.isMiniBar);
  const activeclass =
    "font-worksans hover:bg-foreground/5 group relative flex items-center rounded px-3 py-2 transition-all duration-200 bg-red-100 font-semibold text-red-600 hover:bg-red-100!";
  const inactiveclass =
    "font-worksans hover:bg-foreground/5 group relative flex items-center rounded px-3 py-2 transition-all duration-200 hover:bg-slate-200/80";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex-1 px-2">
      <ul>
        {listsidebarmenu.map((item, index) => {
          return (
            <li className="mb-1 cursor-pointer group" key={index}>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeclass : inactiveclass;
                }}
                to={item.link}
                viewTransition
              >
                <span className="block w-4 shrink-0">{item.icon}</span>
                {mounted && !isMiniBar && (
                  <span className="flex flex-1">
                    <span
                      className="flex-1 ml-3"
                      data-ninja-font="worksans_regular_normal_v29ya"
                    >
                      {item.name}
                    </span>

                    {item.isNew && <BetaLable />}
                  </span>
                )}
                {mounted && isMiniBar && (
                  <span
                    className={clsx(
                      "absolute left-16 hidden cursor-default gap-2 rounded bg-black px-4 py-2 text-sm text-white transition hover:hidden group-hover:block"
                    )}
                  >
                    {item.name}
                    {item.isNew && (
                      <span className="px-1 ml-2 font-semibold text-white bg-orange-400 rounded">
                        {NEWLABEL}
                      </span>
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function BetaLable() {
  return (
    <span
      className="absolute px-1 text-xs font-semibold text-white bg-orange-400 rounded-md right-2 top-3"
      data-ninja-font="worksans_semibold_normal_v29ya"
    >
      {NEWLABEL}
    </span>
  );
}

export function LayoutSettingsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  async function logoutApp() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="flex flex-wrap lg:min-h-full lg:flex-nowrap">
      <div className="flex flex-col w-full shrink-0 lg:w-60">
        <SubMenuList />
        <div className="hidden pr-4 lg:block">
          <button
            type="submit"
            onClick={logoutApp}
            className="flex items-center w-full px-3 py-2 text-red-600 transition duration-200 border border-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white"
          >
            <LogOut />
            <span className="flex-1 pr-6 text-center">Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-1 w-full lg:border-l border-slate-200 lg:pl-6">
        {children}
      </div>
      <div className="block w-full py-10 lg:hidden"></div>
    </div>
  );
}

function SubMenuList() {
  const staticClass =
    "block px-4 py-2 hover:bg-slate-100 rounded-md sm:rounded-none font-worksans transition-all duration-200 ";
  const active = `${staticClass} bg-red-100 #dark:bg-red-700 text-red-500 #dark:text-red-50 font-semibold sm:border-r-4 sm:border-red-500`;
  const nonactive = `${staticClass} text-gray-700 #dark:text-gray-100`;

  return (
    <div className="flex-1 hidden lg:block">
      <ul>
        {menusettings.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? active : nonactive
                }
                to={item.link}
                viewTransition
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { LayoutDashboard } from "lucide-react";
import React from "react";
import ProtectedRoute from "../components/protected";

type ListSideBardMenuType = {
  name: string;
  icon: React.ReactNode;
  link: string;
  isNew: boolean;
}[];

export const listsidebarmenu: ListSideBardMenuType = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    link: "/dashboard",
    isNew: false,
  },
  {
    name: "Order",
    icon: <ScrollText size={20} />,
    link: "/order",
    isNew: false,
  },
  {
    name: "Produk",
    icon: <Package2 size={20} />,
    link: "/produk",
    isNew: false,
  },
  {
    name: "Kategori",
    icon: <CakeSlice size={20} />,
    link: "/kategori",
    isNew: false,
  },
  {
    name: "Customer",
    icon: <BookUser size={20} />,
    link: "/customer",
    isNew: false,
  },
  {
    name: "Pengaturan",
    icon: <Settings size={20} />,
    link: "/pengaturan",
    isNew: false,
  },
];

export const menusettings = [
  {
    name: "Profile",
    link: "/pengaturan/profile",
  },
  {
    name: "Password",
    link: "/pengaturan/password",
  },
];
