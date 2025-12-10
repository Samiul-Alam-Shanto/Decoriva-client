import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <Navbar />

      <div className="grow pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
