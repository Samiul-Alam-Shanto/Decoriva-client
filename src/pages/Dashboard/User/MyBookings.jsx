import { use, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  FaEye,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSortAmountDown,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("date_desc");
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  console.log(bookings);
  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortCriteria === "date_desc")
      return new Date(b.date) - new Date(a.date);
    if (sortCriteria === "date_asc") return new Date(a.date) - new Date(b.date);
    if (sortCriteria === "price_high") return b.price - a.price;
    if (sortCriteria === "price_low") return a.price - b.price;
    if (sortCriteria === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${id}`);
          refetch();
          toast.success("Booking cancelled.");
        } catch (error) {
          toast.error("Failed to cancel.");
        }
      }
    });
  };

  const openTrackingModal = (booking) => {
    setSelectedBooking(booking);
    modalRef.current.showModal();
  };

  const steps = [
    "pending",
    "paid",
    "assigned",
    "planning",
    "materials",
    "on_way",
    "setup",
    "completed",
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold">My Bookings</h2>
          <p className="text-base-content/60 mt-1">
            Manage your upcoming and past events.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-2 rounded-full border border-base-content/10 shadow-sm">
          <span className="pl-3 text-sm opacity-60">
            <FaSortAmountDown />
          </span>
          <select
            className="select select-ghost select-sm focus:bg-transparent w-full max-w-xs"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="price_high">Price: High to Low</option>
            <option value="status">Group by Status</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedBookings.map((booking) => (
          <div
            key={booking._id}
            className="card bg-base-100 shadow-lg border border-base-content/5 hover:border-primary/20 transition-all duration-300 md:flex-row overflow-hidden group"
          >
            <figure className="md:w-48 h-48 md:h-auto relative shrink-0">
              <img
                src={booking.image || "https://i.ibb.co/PzY1f33/default.jpg"}
                alt="Service"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:bg-linear-to-r"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs uppercase tracking-wider font-bold opacity-80">
                  {booking.category}
                </p>
              </div>
            </figure>

            <div className="card-body p-6 flex-1 grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-2xl font-serif font-bold text-base-content group-hover:text-primary transition-colors">
                  {booking.serviceName}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt />{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt /> {booking.address}
                  </span>
                </div>
                <div className="badge badge-ghost mt-2 font-mono text-xs opacity-60">
                  ID: {booking._id.slice(-6).toUpperCase()}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-2xl font-serif font-bold">
                  ${booking.price}
                </div>

                <div
                  className={`badge badge-lg border-0 text-white font-bold uppercase text-xs tracking-wider py-3
                                    ${
                                      booking.status === "completed"
                                        ? "bg-success"
                                        : booking.status === "pending"
                                        ? "bg-warning"
                                        : booking.status === "assigned"
                                        ? "bg-info"
                                        : "bg-primary"
                                    }`}
                >
                  {booking.status.replace("_", " ")}
                </div>

                <div className="flex gap-2 mt-2">
                  {booking.status !== "pending" && (
                    <button
                      onClick={() => openTrackingModal(booking)}
                      className="btn btn-sm btn-outline gap-2 hover:bg-base-content hover:text-base-100"
                    >
                      <FaEye /> Track
                    </button>
                  )}

                  {booking.status === "pending" && (
                    <>
                      <Link
                        to={`/book/${booking.serviceId}`}
                        className="btn btn-sm btn-primary text-white shadow-lg shadow-primary/30"
                      >
                        Pay Now
                      </Link>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedBookings.length === 0 && (
          <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-content/20">
            <h3 className="text-2xl font-serif opacity-50">
              No bookings found.
            </h3>
            <Link
              to="/services"
              className="btn btn-link no-underline text-primary"
            >
              Browse Collections
            </Link>
          </div>
        )}
      </div>

      {/* TRACKING MODAL  */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-base-100 p-10 rounded-4xl">
          <h3 className="font-serif font-bold text-3xl mb-10 text-center">
            Order Timeline
          </h3>

          {selectedBooking && (
            <div className="w-full">
              <ul className="steps steps-vertical lg:steps-horizontal w-full">
                {steps.map((step, idx) => {
                  const currentStatusIndex = steps.indexOf(
                    selectedBooking.status
                  );
                  const isStepCompleted = idx <= currentStatusIndex;
                  return (
                    <li
                      key={step}
                      data-content={isStepCompleted ? "✓" : ""}
                      className={`step ${
                        isStepCompleted ? "step-primary" : ""
                      } uppercase tracking-widest text-xs font-bold`}
                    >
                      {step.replace("_", " ")}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-12 text-center p-6 bg-base-200/50 rounded-2xl border border-base-content/5">
                <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
                  Current Stage
                </p>
                <p className="font-serif font-bold text-2xl text-primary">
                  {selectedBooking.status.replace("_", " ").toUpperCase()}
                </p>
              </div>
            </div>
          )}
          <div className="modal-action justify-center mt-8">
            <form method="dialog">
              <button className="btn btn-wide btn-outline rounded-full">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default MyBookings;
