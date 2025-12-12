import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaWallet,
} from "react-icons/fa";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorHome = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: projects = [] } = useQuery({
    queryKey: ["decorator-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const total = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const active = total - completed;

  const totalEarnings = projects
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-2">
            Welcome back, {user?.displayName.split(" ")[0]}
          </h2>
          <p className="opacity-90">
            You have{" "}
            <span className="font-bold underline">
              {active} active projects
            </span>{" "}
            requiring your attention today.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Earnings Card */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <FaWallet />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                Total Earnings
              </span>
            </div>
            <div className="text-3xl font-serif font-bold text-secondary">
              $<CountUp end={totalEarnings} duration={2} separator="," />
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <FaClock />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                In Progress
              </span>
            </div>
            <div className="text-3xl font-serif font-bold">
              <CountUp end={active} duration={2} />
            </div>
          </div>
        </div>

        {/* Completed Projects*/}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                <FaCheckCircle />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                Completed
              </span>
            </div>
            <div className="text-3xl font-serif font-bold">
              <CountUp end={completed} duration={2} />
            </div>
          </div>
        </div>

        {/* Total Assigned */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <FaClipboardList />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                Total Assigned
              </span>
            </div>
            <div className="text-3xl font-serif font-bold">
              <CountUp end={total} duration={2} />
            </div>
          </div>
        </div>
      </div>

      {/*  Workflow  */}
      <div className="card bg-base-100 shadow-xl border border-base-content/5">
        <div className="card-body">
          <h3 className="card-title font-serif mb-6">
            Standard Operating Procedure
          </h3>
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">Assigned</li>
            <li className="step step-primary">Planning Phase</li>
            <li className="step step-primary">Material Check</li>
            <li className="step">On Route</li>
            <li className="step">Setup & Styling</li>
            <li className="step">Completion</li>
          </ul>
          <div className="mt-6 bg-base-200/50 p-4 rounded-xl text-sm opacity-70">
            <strong>Note:</strong> Please ensure high-quality photos are taken
            after setup completion for the gallery.
          </div>
        </div>
      </div>
    </div>
  );
};
export default DecoratorHome;
