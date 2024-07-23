import { FC } from "react";

import { Link, useLocation } from "react-router-dom";

const routes = {
  CALCULATOR: {
    path: "/",
    name: "products",
  },
  SETTINGS: {
    path: "/users",
    name: "users",
  },
} as const;

const Navbar: FC = () => {
  const location = useLocation();
  return (
    <div className="flex bg-slate-700 p-5 rounded-full gap-10">
      {Object.values(routes).map((route) => (
        <Link
          to={route.path}
          key={route.path}
          className={`hover:text-green-500 duration-300 hover:underline underline-offset-4 ${
            location.pathname === route.path && "text-green-500 underline"
          }`}
        >
          {route.name.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
