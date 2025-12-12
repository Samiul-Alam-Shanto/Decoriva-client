import { use, useState, useEffect } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";
import {
  FaHome,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaPaintBrush,
  FaClipboardList,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaUser,
  FaLeaf,
  FaTimes,
  FaMoon,
  FaSun,
  FaList,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { user, logOut } = use(AuthContext);
  const [role] = useRole();
  const location = useLocation();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "luxury-light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "luxury-light" ? "luxury-dark" : "luxury-light"
    );

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("dashboard-drawer");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  useEffect(() => {
    closeDrawer();
  }, [location]);

  const handleLogOut = () => logOut();

  const SidebarContent = (
    <div className="min-h-full bg-base-100/95 backdrop-blur-2xl border-r border-base-content/5 p-6 flex flex-col w-64">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-tr-lg rounded-bl-lg"></div>
          <span className="text-xl font-serif font-bold tracking-tighter">
            Decoriva<span className="text-primary">.</span>
          </span>
        </Link>

        <label
          htmlFor="dashboard-drawer"
          className="btn btn-circle btn-ghost btn-sm lg:hidden"
        >
          <FaTimes />
        </label>
      </div>

      <div className="mb-6 p-3 bg-base-200/50 rounded-xl flex items-center gap-3 border border-base-content/5">
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="User" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-xs truncate">{user?.displayName}</h4>
          <span className="badge badge-xs badge-primary uppercase font-bold tracking-widest text-[10px]">
            {role}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <ul className="menu space-y-1 flex-1 px-0">
        {role === "admin" && (
          <>
            <li className="menu-title text-xs uppercase tracking-widest opacity-50 font-sans mt-2">
              Admin
            </li>
            <li>
              <NavLink to="/dashboard/admin-home">
                <FaHome /> Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-users">
                <FaUsers /> Users & Roles
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-service">
                <FaPlusCircle /> Add Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-services">
                <FaList /> Manage Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-bookings">
                <FaClipboardList /> All Bookings
              </NavLink>
            </li>
          </>
        )}

        {role === "decorator" && (
          <>
            <li className="menu-title text-xs uppercase tracking-widest opacity-50 font-sans mt-2">
              Workstation
            </li>
            <li>
              <NavLink to="/dashboard/decorator-home">
                <FaHome /> Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-projects">
                <FaPaintBrush /> Projects
              </NavLink>
            </li>
          </>
        )}

        {role === "user" && (
          <>
            <li className="menu-title text-xs uppercase tracking-widest opacity-50 font-sans mt-2">
              My Account
            </li>
            <li>
              <NavLink to="/dashboard/my-bookings">
                <FaCalendarAlt /> Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/payment-history">
                <FaWallet /> Payments
              </NavLink>
            </li>
          </>
        )}

        <div className="divider my-4"></div>

        <li>
          <NavLink to="/dashboard/profile">
            <FaUser /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <FaLeaf /> Home
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto space-y-3">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm w-full justify-start gap-3 text-base-content/70"
        >
          {theme === "luxury-light" ? (
            <FaMoon />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
          <span>{theme === "luxury-light" ? "Dark Mode" : "Light Mode"}</span>
        </button>

        <button
          onClick={handleLogOut}
          className="btn btn-outline btn-error btn-sm w-full gap-2 rounded-xl"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
        <div className="lg:hidden navbar bg-base-100/80 backdrop-blur-md border-b border-base-content/5 sticky top-0 z-40">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-serif font-bold text-lg">
            Decoriva Dashboard
          </div>
        </div>

        <div className="p-4 lg:p-10 flex-1 bg-base-200/30">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        {SidebarContent}
      </div>
    </div>
  );
};
export default DashboardLayout;
