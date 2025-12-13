import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaPaintBrush,
  FaUser,
  FaEllipsisV,
  FaSearch,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'requests'
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  //  Fetch Users
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch Requests
  const { data: requests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["decorator-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator-requests");
      return res.data.filter((r) => r.status === "pending");
    },
  });

  //  Change Role
  const handleMakeRole = async (userId, role, userName) => {
    Swal.fire({
      title: `Update Role?`,
      text: `Set ${userName} to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/role/${userId}`, { role: role });
        refetchUsers();
        toast.success("Role Updated");
      }
    });
  };

  //  Handle Request
  const handleRequest = async (id, status, email) => {
    try {
      await axiosSecure.patch(`/decorator-requests/${id}`, { status, email });
      toast.success(`Application ${status}`);
      refetchRequests();
      refetchUsers();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold">
            People & Permissions
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage users and review applications.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-2 rounded-2xl shadow-sm border border-base-content/5">
        <div className="tabs tabs-boxed bg-transparent">
          <a
            className={`tab ${
              activeTab === "users"
                ? "tab-active bg-primary rounded-xl text-primary-content"
                : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            All Users ({users.length})
          </a>
          <a
            className={`tab ${
              activeTab === "requests"
                ? "tab-active bg-secondary rounded-xl text-secondary-content"
                : ""
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Requests
            {requests.length > 0 && (
              <span className="badge badge-sm badge-error ml-2 text-white">
                {requests.length}
              </span>
            )}
          </a>
        </div>

        {activeTab === "users" && (
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
            <input
              type="text"
              placeholder="Search name or email..."
              className="input input-bordered w-full pl-10 h-10 rounded-xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {activeTab === "users" && (
        <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-lg">
              <thead className="bg-base-200/50 font-serif text-base-content text-sm uppercase">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-base-200/30 transition-colors border-b border-base-content/5"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={u.photo || "https://i.ibb.co/de/avatar.png"}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div className="font-bold">{u.name}</div>
                      </div>
                    </td>
                    <td className="font-mono text-sm opacity-70">{u.email}</td>
                    <td>
                      <div
                        className={`badge badge-lg border-0 gap-2 ${
                          u.role === "admin"
                            ? "bg-primary text-white"
                            : u.role === "decorator"
                            ? "bg-secondary text-black"
                            : "bg-base-200"
                        }`}
                      >
                        <span className="capitalize">{u.role || "User"}</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="dropdown dropdown-end dropdown-hover">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-circle btn-sm"
                        >
                          <FaEllipsisV />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-1 menu p-2 shadow-xl bg-base-100 rounded-xl w-48"
                        >
                          <li className="menu-title text-xs">Set Role</li>
                          <li>
                            <button
                              onClick={() =>
                                handleMakeRole(u._id, "admin", u.name)
                              }
                            >
                              Admin
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleMakeRole(u._id, "decorator", u.name)
                              }
                            >
                              Decorator
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleMakeRole(u._id, "user", u.name)
                              }
                            >
                              User
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-10 opacity-50">
                No users found.
              </div>
            )}
          </div>
        </div>
      )}

      {/*  REQUESTS LIST */}
      {activeTab === "requests" && (
        <div className="card bg-base-100 shadow-xl border border-base-content/5">
          <div className="card-body">
            {requests.length === 0 ? (
              <div className="text-center py-10 opacity-50">
                No pending applications.
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 border border-base-content/10 rounded-xl bg-base-200/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={req.photo} alt={req.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{req.name}</h4>
                        <p className="text-xs opacity-70">{req.email}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="badge badge-sm badge-outline">
                            {req.specialty}
                          </span>
                          <span className="badge badge-sm badge-outline">
                            {req.experience} Years Exp
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                      <a
                        href={req.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-ghost"
                      >
                        View Portfolio
                      </a>
                      <button
                        onClick={() =>
                          handleRequest(req._id, "rejected", req.email)
                        }
                        className="btn btn-sm btn-error btn-outline"
                      >
                        <FaTimes /> Reject
                      </button>
                      <button
                        onClick={() =>
                          handleRequest(req._id, "approved", req.email)
                        }
                        className="btn btn-sm btn-success text-white"
                      >
                        <FaCheck /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageUsers;
