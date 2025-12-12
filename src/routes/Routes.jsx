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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    children: [
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);
