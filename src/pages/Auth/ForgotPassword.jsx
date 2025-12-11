import { use, useState } from "react"; // React 19
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { auth } from "../../firebase/firebase.init";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  //   const onSubmit = async (data) => {
  //     setLoading(true);
  //     try {
  //       await sendPasswordResetEmail(auth, data.email);
  //       toast.success("Reset link sent! Check your email.");
  //     } catch (error) {
  //       // Simple error handling for reset
  //       toast.error("Could not send link. Check the email.");
  //     }
  //     setLoading(false);
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-base-content/60 hover:text-primary mb-6"
        >
          <FaArrowLeft /> Back to Login
        </Link>

        <h2 className="text-3xl font-serif font-bold mb-2">Forgot Password?</h2>
        <p className="text-base-content/60 mb-8">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form className="space-y-6">
          <div className="form-control">
            <label className="label text-sm font-bold opacity-70">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-base-content/40" />
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full pl-10 bg-base-200 focus:bg-base-100 focus:border-primary"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <button
            disabled={loading}
            className="btn btn-primary w-full rounded-full text-white"
          >
            {loading ? <LoadingSpinner /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
