import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useCart from "../../hooks/useCart";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`).then((res) => {
      setService(res.data);
      document.title = `Decoriva | ${res.data.service_name}`;
    });
  }, [id]);

  if (!service) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 mt-6 min-h-screen pb-20">
      {/*HERO IMAGE */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.service_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full container mx-auto">
          <div className="flex gap-3 mb-4">
            <span className="badge badge-primary badge-lg border-none text-white shadow-lg">
              {service.category}
            </span>
            {service.location && (
              <span className="badge badge-neutral badge-lg bg-white/20 backdrop-blur-md border-none text-white">
                <FaMapMarkerAlt className="mr-1" /> {service.location}
              </span>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-base-content drop-shadow-sm"
          >
            {service.service_name}
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/*  LEFT */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              About this Collection
            </h3>
            <p className="text-lg text-base-content/70 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          <div className="border-y border-base-content/10 py-8">
            <h3 className="text-xl font-serif font-bold mb-6">
              Experience Includes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Premium Material Sourcing",
                "On-site Styling Team",
                "Lighting & Ambiance",
                "Post-Event Dismantling",
                "Dedicated Coordinator",
                "Theme Customization",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-base-content/80"
                >
                  <FaCheckCircle className="text-secondary" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  RIGHT CARD */}
        <div className="relative">
          <div className="sticky top-28 glass-panel p-8 rounded-4xl shadow-2xl border border-white/20">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm uppercase tracking-wide opacity-60 mb-1">
                  Starting Price
                </p>
                <p className="text-4xl font-serif font-bold text-primary">
                  ${service.cost}
                </p>
              </div>
              <span className="text-sm opacity-60 mb-2">/ {service.unit}</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm opacity-80 border-b border-base-content/10 pb-4">
                <span>Service Fee</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-sm opacity-80 pb-2">
                <span>Consultation</span>
                <span className="text-success font-bold">Free</span>
              </div>
            </div>

            <div className="divider"></div>

            {/* BUTTONS  */}
            <div className="flex flex-col gap-3 mb-4">
              <button
                onClick={() => addToCart(service)}
                className="btn btn-primary flex-1 rounded-full text-lg shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all"
              >
                Add to Cart
              </button>

              <Link
                to={`/book/${service._id}`}
                className="btn btn-primary flex-1 rounded-full text-lg shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all"
              >
                Reserve Date
              </Link>
            </div>

            <p className="text-xs text-center opacity-50">
              You won't be charged yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetails;
