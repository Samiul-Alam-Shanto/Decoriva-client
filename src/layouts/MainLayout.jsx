import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <Navbar />

      <div className="grow pt-16">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
