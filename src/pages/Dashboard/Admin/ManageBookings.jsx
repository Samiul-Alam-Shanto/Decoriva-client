import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaCheckCircle,
  FaLock,
  FaUserTie,
  FaMapPin,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch Bookings
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  // Fetch Decorators List
  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/decorators");
      return res.data;
    },
  });

  const handleAssignDecorator = async (bookingId, decoratorEmail) => {
    try {
      await axiosSecure.patch(`/bookings/${bookingId}`, {
        decoratorEmail,
        status: "assigned",
      });
      toast.success("Expert Assigned Successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to assign");
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-base-content/10 pb-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-base-content">
            Manage Bookings
          </h2>
          <p className="text-base-content/60 mt-2 text-lg">
            Monitor orders and assign workflow.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Service or Email..."
            className="input input-bordered w-full pl-12 rounded-full bg-base-100 shadow-sm focus:outline-none focus:border-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
        </div>
      </div>

      {/* Data  */}
      <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead className="bg-base-200/50 font-serif text-base-content text-sm uppercase tracking-widest">
              <tr>
                <th>Service</th>
                <th>Client Details</th>
                <th>Status</th>
                <th>Decorator Assignment</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-200/30 transition-colors border-b border-base-content/5"
                >
                  <td className="min-w-[250px]">
                    <div className="flex items-center gap-4">
                      <div className="avatar rounded-xl overflow-hidden h-16 w-16 shadow-sm">
                        <img
                          src={
                            booking.image || "https://via.placeholder.com/150"
                          }
                          alt="Service"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-lg leading-tight">
                          {booking.serviceName}
                        </div>
                        <div className="text-xs opacity-60 font-mono mt-1 flex items-center gap-2">
                          <span className="badge badge-xs badge-ghost font-sans">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="font-bold text-secondary">
                            ${booking.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="space-y-1">
                      <div className="font-bold text-sm">
                        {booking.userName}
                      </div>
                      <div className="text-xs opacity-60 font-mono">
                        {booking.userEmail}
                      </div>
                      <div className="flex items-center gap-1 text-xs opacity-50 mt-1">
                        <FaMapPin className="text-primary" /> {booking.address}
                      </div>
                    </div>
                  </td>

                  <td>
                    <div
                      className={`badge badge-lg border-0 text-white font-bold tracking-wide uppercase text-xs py-3
                                            ${
                                              booking.status === "completed"
                                                ? "bg-success"
                                                : booking.status === "assigned"
                                                ? "bg-info"
                                                : booking.status === "paid"
                                                ? "bg-secondary"
                                                : booking.status === "pending"
                                                ? "bg-warning text-black"
                                                : "bg-primary"
                                            }`}
                    >
                      {booking.status}
                    </div>
                  </td>

                  {/* Action  */}
                  <td>
                    {booking.status === "completed" ? (
                      <div className="flex items-center gap-2 text-success font-bold text-sm bg-success/10 p-2 rounded-lg w-fit px-4 border border-success/20">
                        <FaCheckCircle /> Task Completed
                      </div>
                    ) : booking.status === "pending" ? (
                      <div className="flex items-center gap-2 text-warning font-bold text-sm opacity-60">
                        <FaLock /> Waiting Payment
                      </div>
                    ) : (
                      <div className="form-control w-full max-w-xs">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserTie className="text-base-content/40" />
                          </div>
                          <select
                            className={`select select-bordered w-full pl-10 rounded-lg text-sm
                                                            ${
                                                              booking.decoratorEmail
                                                                ? "select-primary bg-primary/5 font-bold"
                                                                : "bg-base-100"
                                                            }
                                                        `}
                            onChange={(e) =>
                              handleAssignDecorator(booking._id, e.target.value)
                            }
                            defaultValue={booking.decoratorEmail || ""}
                            disabled={booking.status === "completed"}
                          >
                            <option disabled value="">
                              {booking.decoratorEmail
                                ? "Re-assign Decorator"
                                : "Assign Decorator"}
                            </option>
                            {decorators.map((dec) => (
                              <option key={dec._id} value={dec.email}>
                                {dec.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {booking.decoratorEmail && (
                          <label className="label pb-0 pt-1">
                            <span className="label-text-alt text-xs opacity-50">
                              Currently: {booking.decoratorEmail}
                            </span>
                          </label>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50 bg-base-200/30">
            <FaSearch className="text-4xl mb-4 opacity-20" />
            <p>No bookings match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageBookings;
