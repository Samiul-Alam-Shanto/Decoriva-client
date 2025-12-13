import React from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaDollarSign,
  FaUsers,
  FaCalendarCheck,
  FaBoxOpen,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data;
    },
  });

  // Chart Data
  const chartData = [
    { name: "Services", count: stats.totalServices || 0 },
    { name: "Users", count: stats.totalUsers || 0 },
    { name: "Bookings", count: stats.totalBookings || 0 },
  ];

  // Custom Bar Shape
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif font-bold text-base-content">
          Dashboard Overview
        </h2>
        <p className="text-base-content/60">Welcome back, Administrator.</p>
      </div>

      {/*  STATS  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue  */}
        <div className="card bg-linear-to-br from-primary to-secondary text-primary-content shadow-xl">
          <div className="card-body relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-20 transform translate-x-2 -translate-y-2">
              <FaDollarSign size={80} />
            </div>
            <div className="stat-title text-primary-content/80 mb-1">
              Total Revenue
            </div>
            <div className="stat-value font-serif text-4xl lg:text-5xl">
              $<CountUp end={stats.revenue || 0} duration={2} separator="," />
            </div>
            <div className="stat-desc text-primary-content/60 mt-2">
              {" "}
              Lifetime Earnings
            </div>
          </div>
        </div>

        {/* Users  */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary">
              <FaUsers size={24} />
            </div>
            <div>
              <div className="text-sm opacity-60 font-bold uppercase tracking-wider">
                Total Users
              </div>
              <div className="text-3xl font-serif font-bold">
                <CountUp end={stats.totalUsers || 0} duration={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings  */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-secondary">
              <FaCalendarCheck size={24} />
            </div>
            <div>
              <div className="text-sm opacity-60 font-bold uppercase tracking-wider">
                Bookings
              </div>
              <div className="text-3xl font-serif font-bold">
                <CountUp end={stats.totalBookings || 0} duration={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="card bg-base-100 shadow-lg border border-base-content/5">
          <div className="card-body flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-accent">
              <FaBoxOpen size={24} />
            </div>
            <div>
              <div className="text-sm opacity-60 font-bold uppercase tracking-wider">
                Services
              </div>
              <div className="text-3xl font-serif font-bold">
                <CountUp end={stats.totalServices || 0} duration={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHART  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-content/5">
          <div className="card-body">
            <h3 className="card-title font-serif mb-6">Business Performance</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "gray" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "gray" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))",
                      borderColor: "var(--fallback-bc,oklch(var(--bc)/0.1))",
                      borderRadius: "1rem",
                      color: "var(--fallback-bc,oklch(var(--bc)/1))",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--color-primary)"
                    shape={TriangleBar}
                    label={{ position: "top", fill: "gray" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-secondary)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="card bg-base-100 shadow-xl border border-base-content/5">
          <div className="card-body">
            <h3 className="card-title font-serif mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="badge badge-primary badge-xs"></div>
                <span className="text-sm opacity-70">
                  Review pending bookings
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="badge badge-secondary badge-xs"></div>
                <span className="text-sm opacity-70">
                  Update service prices
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <div className="badge badge-accent badge-xs"></div>
                <span className="text-sm opacity-70">
                  Check decorator availability
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="text-center">
              <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
                System Health
              </p>
              <progress
                className="progress progress-success w-full"
                value="100"
                max="100"
              ></progress>
              <p className="text-xs mt-1 text-success font-bold">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
