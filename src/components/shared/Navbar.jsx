/* eslint-disable no-unused-vars */
import { use, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "luxury-light"
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme Logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "luxury-light" ? "luxury-dark" : "luxury-light"
    );

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  const handleMenu = () => setMobileMenuOpen(false);

  // --- NAVIGATION LINKS  ---
  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinks = user
    ? [...baseLinks, { name: "Join Team", path: "/be-a-decor" }]
    : baseLinks;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-99 transition-all duration-500 border-b ${
          scrolled || mobileMenuOpen
            ? "bg-base-100/90 backdrop-blur-xl border-base-content/5 py-3 shadow-lg"
            : "bg-transparent border-transparent  py-4 lg:py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 bg-primary rounded-tr-xl rounded-bl-xl group-hover:rotate-12 transition-transform duration-300"></div>
            <span className="text-2xl font-serif font-bold tracking-tighter text-base-content">
              Decoriva<span className="text-primary">.</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center bg-base-100/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-base-content/5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                                    px-5 py-2 rounded-full  text-sm font-medium transition-all duration-300 relative
                                    ${
                                      isActive
                                        ? "text-primary-content"
                                        : "text-base-content/70 hover:text-primary"
                                    }
                                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-sm btn-ghost text-base-content/70 hover:text-primary transition-colors"
            >
              {theme === "luxury-light" ? (
                <FaMoon />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-2 ring-offset-base-100"
                >
                  <div className="w-9 rounded-full">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-2xl bg-base-100 rounded-2xl w-56 border border-base-200"
                >
                  <li className="menu-title px-4 py-2 opacity-50">
                    Signed in as {user.displayName}
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button onClick={logOut} className="text-error">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm rounded-full px-6 font-sans"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <div className="flex gap-4 items-center lg:hidden">
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-xs btn-ghost"
            >
              {theme === "luxury-light" ? (
                <FaMoon />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>

            <button
              className="btn btn-ghost btn-circle text-base-content"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-0 w-full z-40 bg-base-100/95 backdrop-blur-xl border-b border-base-content/5 shadow-2xl lg:hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {/* User Status Section */}
              {user ? (
                <div className="bg-base-200/50 p-4 rounded-xl flex items-center gap-4 border border-base-content/5">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} alt="user" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{user.displayName}</h4>
                    <p className="text-xs opacity-60">Logged In</p>
                  </div>
                  <button
                    onClick={() => logOut()}
                    className="btn btn-ghost btn-circle btn-sm text-error"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center">
                  <p className="text-sm mb-3 font-medium">
                    Join Decoriva today
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link to="/login" className="btn btn-sm btn-primary flex-1">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-sm btn-outline flex-1"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}

              <div className="divider my-0"></div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={handleMenu}
                    className={({ isActive }) => `
                                            p-3 rounded-xl text-lg font-medium transition-all flex justify-between items-center
                                            ${
                                              isActive
                                                ? "bg-primary text-primary-content"
                                                : "hover:bg-base-200"
                                            }
                                        `}
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Dashboard Link for Mobile */}
                {user && (
                  <Link
                    to="/dashboard"
                    onClick={handleMenu}
                    className="p-3 rounded-xl text-lg font-medium hover:bg-base-200 flex justify-between items-center"
                  >
                    <span className="flex items-center gap-2">
                      <FaThLarge /> Dashboard
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
