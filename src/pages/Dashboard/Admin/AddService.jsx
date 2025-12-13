import { React, use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import {
  FaImage,
  FaTag,
  FaMapMarkerAlt,
  FaDollarSign,
  FaPen,
  FaLayerGroup,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddService = () => {
  const { user } = use(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const divisions = [
    "All Bangladesh",
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Cox's Bazar",
  ];

  const onSubmit = async (data) => {
    const serviceData = {
      service_name: data.service_name,
      image: data.image,
      category: data.category,
      location: data.location,
      cost: parseInt(data.cost),
      unit: data.unit,
      description: data.description,
      createdByEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/services", serviceData);
      if (res.data.insertedId) {
        toast.success("Service Published Successfully");
        reset();
      }
    } catch (error) {
      toast.error("Failed to publish service");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-base-content/10 pb-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-base-content">
            Add Service
          </h2>
          <p className="text-base-content/60 mt-2 text-lg">
            Create a new entry in the service catalog.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT  */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl border border-base-content/5">
            <div className="card-body p-8">
              <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                <FaPen className="text-primary text-sm" /> Service Details
              </h3>

              <div className="form-control mb-4">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Service Title
                </label>
                <input
                  type="text"
                  {...register("service_name", { required: true })}
                  placeholder="e.g. Royal Vintage Wedding Setup"
                  className="input input-bordered input-lg w-full text-lg font-serif placeholder:font-sans focus:border-primary focus:outline-none bg-base-200/30"
                />
              </div>

              <div className="form-control">
                <label className="label block font-bold text-xs uppercase tracking-widest opacity-60">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered h-48 text-base w-full leading-relaxed focus:border-primary focus:outline-none bg-base-200/30"
                  placeholder="Describe the styling, materials used, and the atmosphere created..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-content/5">
            <div className="card-body p-8">
              <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                <FaImage className="text-primary text-sm" /> Visuals
              </h3>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Cover Image URL
                </label>
                <div className="join w-full">
                  <span className="join-item btn btn-active cursor-default bg-base-200 border-base-content/20">
                    https://
                  </span>
                  <input
                    type="text"
                    {...register("image", { required: true })}
                    placeholder="images.example.com/photo..."
                    className="join-item input input-bordered w-full focus:border-primary focus:outline-none"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/40">
                    We recommend a 16:9 aspect ratio high-res image.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT  */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl border border-base-content/5">
            <div className="card-body p-6">
              <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                <FaLayerGroup className="text-secondary text-sm" />{" "}
                Categorization
              </h3>

              <div className="form-control mb-4">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Category
                </label>
                <div className="relative">
                  <FaTag className="absolute top-4 left-4 text-base-content/30 z-10" />
                  <select
                    {...register("category")}
                    className="select select-bordered w-full pl-10 focus:border-secondary focus:outline-none"
                  >
                    <option>Wedding</option>
                    <option>Home</option>
                    <option>Office</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                  Location Availability
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-4 left-4 text-base-content/30 z-10" />
                  <select
                    {...register("location")}
                    className="select select-bordered w-full pl-10 focus:border-secondary focus:outline-none"
                  >
                    {divisions.map((div, i) => (
                      <option key={i} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-content/5">
            <div className="card-body p-6">
              <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                <FaDollarSign className="text-accent text-sm" /> Pricing
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Cost
                  </label>
                  <input
                    type="number"
                    {...register("cost", { required: true })}
                    placeholder="0.00"
                    className="input input-bordered w-full focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-widest opacity-60">
                    Unit
                  </label>
                  <input
                    type="text"
                    {...register("unit", { required: true })}
                    placeholder="e.g. Event"
                    className="input input-bordered w-full focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg w-full rounded-xl shadow-lg shadow-primary/20 text-white font-sans tracking-wide">
            Publish Service
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddService;
