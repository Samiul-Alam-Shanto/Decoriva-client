import { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { FaGoogle, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { getErrorMessage } from "../../utils/authHelpers";
import img from "../../assets/hero3.png";
const Login = () => {
  const { signIn, googleSignIn } = use(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Decoriva | Login";
  }, []);

  const onSubmit = (data) => {
    const toastId = toast.loading("Signing in...");
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Welcome back!", { id: toastId });
        navigate(from);
      })
      .catch((error) => {
        const msg = getErrorMessage(error.code);
        toast.error(msg, { id: toastId });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: user?.email,
          name: user?.displayName,
          photo: user?.photoURL,
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/auth/user`, userInfo)
          .then(() => {
            toast.success("Welcome back!");
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        const msg = getErrorMessage(error.code);
        toast.error(msg);
      });
  };

  return (
    <div className="min-h-screen pt-6 flex bg-base-100">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative bg-neutral text-neutral-content items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={`${img}`}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Decor"
        />
        <div className="relative z-20 max-w-md text-center p-10 glass-panel rounded-2xl border-none text-white">
          <h2 className="text-4xl font-serif font-bold mb-4">Welcome Back</h2>
          <p className="text-lg opacity-90 italic font-light">
            "Design is not just what it looks like and feels like. Design is how
            it works."
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20 relative"
      >
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold mb-2 text-base-content">
              Sign In
            </h1>
            <p className="text-base-content/60">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-base-content/50 hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label">
                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover text-base-content/50 hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <button className="btn btn-primary w-full text-white rounded-full text-lg shadow-lg hover:shadow-primary/30">
              Sign In
            </button>
          </form>

          <div className="divider my-8 text-base-content/30">
            Or continue with
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full rounded-full gap-3 hover:bg-base-content hover:text-base-100 border-base-content/20"
          >
            <FaGoogle className="text-lg" /> Google
          </button>

          <p className="text-center mt-8 text-base-content/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
