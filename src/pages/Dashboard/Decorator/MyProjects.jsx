import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCheck, FaArrowRight, FaClock } from "react-icons/fa";

const MyProjects = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: projects = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorator-projects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const steps = [
    "assigned",
    "planning",
    "materials",
    "on_way",
    "setup",
    "completed",
  ];

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, { status: newStatus });
      toast.success(`Project moved to: ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold">Assigned Projects</h2>
          <p className="text-base-content/60 mt-1">
            Manage your workflow and updates.
          </p>
        </div>
        <div className="badge badge-lg badge-secondary p-4">
          Active: {projects.filter((p) => p.status !== "completed").length}
        </div>
      </div>

      {/* Project Cards  */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => {
          const currentStepIndex = steps.indexOf(project.status);
          const nextStep =
            currentStepIndex < steps.length - 1
              ? steps[currentStepIndex + 1]
              : null;
          const progress = ((currentStepIndex + 1) / steps.length) * 100;

          return (
            <div
              key={project._id}
              className="card bg-base-100 shadow-xl border border-base-content/5 lg:flex-row overflow-hidden"
            >
              <div className="bg-base-200/50 p-6 flex flex-col justify-center items-center text-center w-full lg:w-40 shrink-0 border-r border-base-content/5">
                <div className="text-3xl font-serif font-bold text-primary">
                  {new Date(project.date).getDate()}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold opacity-60 mb-2">
                  {new Date(project.date).toLocaleString("default", {
                    month: "short",
                  })}
                </div>
                <div className="badge badge-ghost badge-sm">
                  {new Date(project.date).getFullYear()}
                </div>
              </div>

              <div className="card-body p-6 lg:p-8 flex-1">
                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">
                      {project.serviceName}
                    </h3>
                    <p className="text-base-content/70 flex items-center gap-2 mt-1">
                      <FaUser className="text-xs opacity-50" />{" "}
                      {project.userName}
                      <span className="opacity-30">|</span>
                      <FaMapMarkerAlt className="text-xs opacity-50" />{" "}
                      {project.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-1">
                      Current Status
                    </p>
                    <div className="badge badge-lg badge-outline badge-primary uppercase font-bold text-xs p-3">
                      {project.status.replace("_", " ")}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs opacity-60 mb-2 font-bold uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full h-3"
                    value={progress}
                    max="100"
                  ></progress>
                </div>

                <div className="card-actions justify-end pt-4 border-t border-base-content/5">
                  {nextStep ? (
                    <button
                      onClick={() => handleStatusUpdate(project._id, nextStep)}
                      className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                    >
                      Mark as {nextStep.replace("_", " ")} <FaArrowRight />
                    </button>
                  ) : (
                    <div className="btn btn-success text-white rounded-full px-8 no-animation cursor-default">
                      <FaCheck /> All Tasks Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 opacity-50">
          No projects assigned yet.
        </div>
      )}
    </div>
  );
};
// Add missing icons import fix
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
export default MyProjects;
