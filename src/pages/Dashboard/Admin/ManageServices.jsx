import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageServices = () => {
  const [editingService, setEditingService] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: services = [], refetch } = useQuery({
    queryKey: ["manage-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services?limit=100`
      );
      return Array.isArray(res.data) ? res.data : res.data.services || [];
    },
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete this collection?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/services/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Service has been removed.", "success");
        }
      }
    });
  };

  const EditModal = () => {
    const { register, handleSubmit } = useForm({
      defaultValues: editingService,
    });

    const onSubmit = async (data) => {
      const res = await axiosSecure.patch(
        `/services/${editingService._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        setEditingService(null);
        Swal.fire("Updated", "Service updated successfully", "success");
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-base-100 p-8 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
          <h3 className="text-2xl font-serif font-bold mb-6">Edit Service</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs mr-2 uppercase font-bold opacity-60">
                Name
              </label>
              <input
                {...register("service_name")}
                className="input input-bordered"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs uppercase font-bold opacity-60">
                  Price
                </label>
                <input
                  type="number"
                  {...register("cost")}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label text-xs uppercase font-bold opacity-60">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="select select-bordered"
                >
                  <option>Wedding</option>
                  <option>Home</option>
                  <option>Office</option>
                  <option>Birthday</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label text-xs block uppercase font-bold opacity-60">
                Description
              </label>
              <textarea
                {...register("description")}
                className="textarea w-full textarea-bordered h-24"
              ></textarea>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary text-white flex-1"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-serif font-bold">Manage Collections</h2>
        <div className="badge badge-lg badge-outline">
          Total: {services.length}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead className="bg-base-200/50 font-serif uppercase text-sm">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-base-200/30 transition-colors border-b border-base-content/5"
                >
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="Service" />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{item.service_name}</td>
                  <td>
                    <div className="badge badge-ghost">{item.category}</div>
                  </td>
                  <td className="font-mono">${item.cost}</td>
                  <td className="text-right">
                    <div className="join">
                      <button
                        onClick={() => setEditingService(item)}
                        className="btn btn-sm btn-ghost join-item text-warning"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-sm btn-ghost join-item text-error"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingService && <EditModal />}
    </div>
  );
};
export default ManageServices;
