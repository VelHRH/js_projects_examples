import { FC } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="py-7 px-20 flex flex-col gap-10">
      <Navbar /> <Outlet />
    </div>
  );
};

export default Layout;
