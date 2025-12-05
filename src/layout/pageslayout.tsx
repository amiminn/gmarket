import { Heart, Home, ShoppingBag, User } from "lucide-react";
import { NavLink } from "react-router";
import { useCartStore } from "../lib/productstore";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-slate-100"
      style={{ fontFamily: "Fredoka" }}
    >
      {/* {isMobile && <BottomBar />} */}
      <div className="max-w-[480px] p-2 mx-auto relative min-h-screen bg-white">
        {children}
      </div>
    </div>
  );
}

export function BottomBar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="fixed bottom-0 max-w-[480px] mx-auto left-0 right-0 font-normal rounded-t bg-white drop-shadow">
      <div className="flex w-full h-16 gap-3 p-2">
        <div className="grid w-full grid-cols-4">
          {listmenu.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `cursor-pointer flex justify-center items-center relative ${
                  isActive ? "text-primary font-semibold" : "text-gray-500"
                }`
              }
              viewTransition
            >
              <div className="grid gap-1 text-xs place-items-center">
                {item.icon}
                <span>
                  {item.name}{" "}
                  {item.name === "Tas" && cart.length > 0 && (
                    <span className="text-xs text-red-600">
                      ({cart.length})
                    </span>
                  )}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
export function BottomLoginBar() {
  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 font-normal rounded-t bg-white drop-shadow">
      <div className="flex w-full h-16 p-2">
        <NavLink
          className="flex items-center justify-center w-full text-white rounded bg-slate-800"
          to={"/login"}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

type MenuItem = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

const listmenu: MenuItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <Home />,
  },
  {
    name: "Tas",
    link: "/cart",
    icon: <ShoppingBag />,
  },
  {
    name: "Wishlist",
    link: "/favorite",
    icon: <Heart />,
  },
  {
    name: "Akun",
    link: "/profile",
    icon: <User />,
  },
];
