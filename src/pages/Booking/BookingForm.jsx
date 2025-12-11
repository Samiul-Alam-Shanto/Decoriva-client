import { use, useState, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingForm = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addons, setAddons] = useState([]);
  const [coupon, setCoupon] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const availableAddons = [
    { name: "Extra Floral Arrangements", price: 100 },
    { name: "Premium Lighting Setup", price: 150 },
    { name: "Live Music / DJ", price: 300 },
    { name: "Drone Photography", price: 200 },
  ];

  useEffect(() => {
    document.title = "StyleDecor | Book Service";
    axios
      .get(`${import.meta.env.VITE_API_URL}/services/${id}`)
      .then((res) => setService(res.data));
  }, [id]);

  const toggleAddon = (addon) => {
    if (addons.find((a) => a.name === addon.name)) {
      setAddons(addons.filter((a) => a.name !== addon.name));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please login to book");
    setLoading(true);

    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      image: service.image,
      price: service.cost,
      userEmail: user.email,
      userName: user.displayName,
      date: data.date,
      address: data.address,
      notes: data.notes,
      status: "pending",
      addons: addons,
      couponCode: coupon,
    };

    try {
      const bookingRes = await axiosSecure.post("/bookings", bookingData);

      if (bookingRes.data.insertedId) {
        const paymentRes = await axiosSecure.post("/create-checkout-session", {
          bookingId: bookingRes.data.insertedId,
          serviceName: service.service_name,
          price: service.cost,
          userEmail: user.email,
          addons,
          couponCode: coupon,
        });

        if (paymentRes.data.url) {
          window.location.replace(paymentRes.data.url);
        }
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`Failed: ${errMsg}`);
      setLoading(false);
    }
  };

  if (!service) return <LoadingSpinner />;

  const addonsTotal = addons.reduce((acc, curr) => acc + curr.price, 0);
  const estimatedTotal = service.cost + addonsTotal;

  return (
    <div className="min-h-screen bg-base-200 py-10 mt-6 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/3 bg-primary text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Booking Summary</h2>
            <div className="divider divider-warning"></div>
            <h3 className="text-xl font-semibold">{service.service_name}</h3>
            <p className="opacity-80 mt-2">{service.category}</p>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>${service.cost}</span>
              </div>
              {addons.map((add, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm opacity-90"
                >
                  <span>+ {add.name}</span>
                  <span>${add.price}</span>
                </div>
              ))}
              <div className="divider bg-white/20 h-0.5"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${estimatedTotal}</span>
              </div>
              {coupon && (
                <p className="text-xs text-yellow-300 mt-2">
                  * Coupon {coupon} applied at checkout
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side*/}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Complete Your Reservation
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label mr-2 font-semibold">Select Date</label>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="input input-bordered w-full"
                    placeholderText="Click to select date"
                    minDate={new Date()}
                  />
                )}
              />
              {errors.date && (
                <span className="text-red-500 text-sm">Date is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label mr-2 font-semibold">
                Service Address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Full Address"
                className="input input-bordered"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  Address is required
                </span>
              )}
            </div>

            {/* ADD-ONS  */}
            <div className="divider font-semibold text-gray-500">
              Customize Your Event
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableAddons.map((addon, idx) => (
                <label
                  key={idx}
                  className={`label cursor-pointer justify-start gap-3 border p-3 rounded-lg hover:bg-base-200 transition ${
                    addons.find((a) => a.name === addon.name)
                      ? "border-primary bg-base-200"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={() => toggleAddon(addon)}
                    checked={addons.some((a) => a.name === addon.name)}
                  />
                  <div>
                    <p className="font-bold text-sm">{addon.name}</p>
                    <p className="text-xs text-gray-500">+${addon.price}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-control mt-4">
              <label className="label mr-2 font-semibold">Apply Coupon</label>
              <div className="join">
                <input
                  type="text"
                  placeholder="Code (e.g. SAVE10)"
                  className="input input-bordered join-item w-full"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary join-item"
                  onClick={() =>
                    toast.success("Coupon saved! Discount applied at checkout.")
                  }
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label mr-2 font-semibold">
                Special Requests
              </label>
              <textarea
                {...register("notes")}
                className="textarea textarea-bordered h-20"
                placeholder="Any specific details?"
              ></textarea>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-white text-lg"
              >
                {loading ? <LoadingSpinner /> : "Proceed to Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
