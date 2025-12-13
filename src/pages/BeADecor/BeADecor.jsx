import { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeADecor = () => {
  const { user } = use(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please login to apply");

    const applicationData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      specialty: data.specialty,
      experience: data.experience,
      portfolio: data.portfolio,
      status: "pending",
      appliedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post(
        "/decorator-requests",
        applicationData
      );
      if (res.data.message) {
        toast.error(res.data.message);
      } else {
        toast.success("Application Submitted! Admin will review shortly.");
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle
          heading="Join Our Experts"
          subHeading="Become a Decorator"
          center={true}
        />

        <div className="card bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left*/}
            <div className="bg-neutral text-neutral-content p-10 flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-bold mb-4">
                Why Join Decoriva?
              </h3>
              <ul className="space-y-4 opacity-80">
                <li>✨ Access to high-end clients</li>
                <li>✨ Smart dashboard to manage projects</li>
                <li>✨ Guaranteed payments & security</li>
                <li>✨ Showcase your portfolio to thousands</li>
              </ul>
            </div>

            {/* Right*/}
            <div className="p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    disabled
                    className="input input-bordered bg-base-200/50"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Specialty
                  </label>
                  <select
                    {...register("specialty")}
                    className="select select-bordered w-full"
                  >
                    <option>Wedding Styling</option>
                    <option>Interior Design</option>
                    <option>Corporate Events</option>
                    <option>Lighting Expert</option>
                    <option>Floral Artist</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    {...register("experience", { required: true })}
                    placeholder="e.g. 5"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">
                    Portfolio Link
                  </label>
                  <input
                    type="text"
                    {...register("portfolio", { required: true })}
                    placeholder="https://instagram.com/..."
                    className="input input-bordered"
                  />
                </div>

                <button className="btn btn-primary w-full rounded-full shadow-lg">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BeADecor;
