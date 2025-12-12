import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaUserEdit, FaCamera, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const UserProfile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const [role] = useRole();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName,
      photoURL: user?.photoURL,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUserProfile(data.name, data.photoURL);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold">Profile Settings</h2>
        <p className="text-base-content/60 mt-1">
          Manage your public profile and account details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl border border-base-content/5 h-fit">
          <div className="h-32 bg-linear-to-r from-primary to-secondary opacity-90"></div>

          <div className="card-body items-center text-center -mt-16 relative z-10">
            <div className="avatar indicator">
              <span className="indicator-item badge badge-secondary p-1">
                <FaUserEdit className="text-white text-xs" />
              </span>
              <div className="w-32 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 shadow-2xl">
                <img
                  src={user?.photoURL || "https://i.ibb.co/de/avatar.png"}
                  alt="Profile"
                />
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold mt-4">
              {user?.displayName}
            </h3>
            <div className="badge badge-ghost gap-2 mt-2">
              <FaShieldAlt className="text-xs" /> {role || "User"}
            </div>
            <p className="text-sm opacity-60 mt-4 px-4">
              Member since{" "}
              {new Date(user?.metadata?.creationTime).getFullYear()}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-content/5">
          <div className="card-body p-8">
            <h3 className="card-title font-serif mb-6 border-b border-base-content/10 pb-4">
              Edit Details
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-control">
                <label className="label font-bold text-sm opacity-70">
                  Display Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                />
              </div>

              <div className="form-control">
                <label className="label font-bold text-sm opacity-70">
                  Avatar URL
                </label>
                <div className="relative">
                  <FaCamera className="absolute left-3 top-3.5 text-base-content/30" />
                  <input
                    type="text"
                    {...register("photoURL")}
                    className="input input-bordered w-full pl-10 bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-sm opacity-70">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3.5 text-base-content/30" />
                  <input
                    type="text"
                    value={user?.email}
                    disabled
                    className="input input-bordered w-full pl-10 bg-base-200/50 text-base-content/50 cursor-not-allowed"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt text-warning">
                    Email cannot be changed manually.
                  </span>
                </label>
              </div>

              <div className="card-actions justify-end mt-8">
                <button
                  disabled={loading}
                  className="btn btn-primary px-8 rounded-full shadow-lg text-white"
                >
                  {loading ? <LoadingSpinner /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
