import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Gallery from "../pages/Gallery/Gallery";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ServiceDetails from "../pages/Services/ServiceDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import BookingForm from "../pages/Booking/BookingForm";
import PaymentSuccess from "../pages/Booking/PaymentSuccess";
import Cart from "../pages/Cart/Cart";
import BeADecor from "../pages/BeADecor/BeADecor";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardEntry from "../pages/Dashboard/DashboardEntry";
import MyBookings from "../pages/Dashboard/User/MyBookings";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import ErrorPage from "../pages/ErrorPage";
import DecoratorRoute from "./DecoratorRoute";
import DecoratorHome from "../pages/Dashboard/Decorator/DecoratorHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "book/:id",
        element: (
          <PrivateRoute>
            <BookingForm />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      { path: "cart", element: <Cart /> },
      {
        path: "be-a-decor",
        element: (
          <PrivateRoute>
            <BeADecor />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardEntry />,
      },
      // user paths
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      { path: "profile", element: <UserProfile /> },

      //decorator paths

      {
        path: "decorator-home",

        element: (
          <DecoratorRoute>
            <DecoratorHome />
          </DecoratorRoute>
        ),
      },
    ],
  },
]);
