import { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { getErrorMessage, passwordValidation } from "../../utils/authHelpers";
import img from "../../assets/hero2.png";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_host
}`;

const Register = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Decoriva | Join Us";
  }, []);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axios.post(image_hosting_api, formData);
      console.log(res.data);

      if (res.data.success) {
        const photoURL = res.data.data.url;
        toast.loading("Creating account...", { id: toastId });
        await createUser(data.email, data.password);

        await updateUserProfile(data.name, photoURL);
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: photoURL,
        };

        const dbResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/user`,
          userInfo
        );

        if (dbResponse.data.insertedId || dbResponse.data.message) {
          toast.success("Welcome to Decoriva!", { id: toastId });
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
      const msg = error.response
        ? "Image upload failed. Check API key."
        : getErrorMessage(error.code);
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen pt-6 flex bg-base-100">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20 relative order-2 lg:order-1"
      >
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2 text-base-content">
              Create Account
            </h1>
            <p className="text-base-content/60">
              Join our community of style enthusiasts.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Profile photo is required",
                })}
                className="file-input file-input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary"
                accept="image/*"
              />
              {errors.image && (
                <span className="text-error text-xs mt-1">
                  {errors.image.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary"
                placeholder="email@example.com"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label text-sm font-bold text-base-content/70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", passwordValidation)}
                  className={`input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
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
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button className="btn btn-primary w-full text-white rounded-full text-lg shadow-lg hover:shadow-primary/30 mt-4">
              Start Journey
            </button>
          </form>

          <p className="text-center mt-8 text-base-content/60">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative bg-neutral items-center justify-center overflow-hidden order-1 lg:order-2"
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src={`${img}`}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Register Decor"
        />
        <div className="relative z-20 max-w-md text-center p-10 glass-panel rounded-2xl border-none text-white">
          <h2 className="text-4xl font-serif font-bold mb-4">Join the Elite</h2>
          <p className="text-lg opacity-90 italic font-light">
            "Simplicity is the ultimate sophistication."
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
