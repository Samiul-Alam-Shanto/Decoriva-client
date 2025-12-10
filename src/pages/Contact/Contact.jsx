import { useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    document.title = "Decoriva | Contact";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message received. Our concierge will contact you shortly.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-100 pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-sans font-bold tracking-[0.3em] text-secondary uppercase mb-3">
            At Your Service
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold">
            Contact Concierge
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-panel p-10 rounded-[2.5rem] shadow-xl border border-base-content/5">
              <h3 className="text-2xl font-serif font-bold mb-8">
                Direct Channels
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest opacity-50 mb-1">
                      Call Us (24/7)
                    </p>
                    <p className="text-xl font-serif">+880 1700-000000</p>
                    <p className="text-sm opacity-60 mt-1">
                      Priority Support Line
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-secondary text-secondary-content flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest opacity-50 mb-1">
                      Email
                    </p>
                    <p className="text-xl font-serif">concierge@decoriva.com</p>
                    <p className="text-sm opacity-60 mt-1">
                      Response within 2 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-accent text-accent-content flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest opacity-50 mb-1">
                      Visit HQ
                    </p>
                    <p className="text-xl font-serif">Gulshan Avenue, Dhaka</p>
                    <p className="text-sm opacity-60 mt-1">
                      By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-2">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest opacity-50">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-lg w-full bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest opacity-50">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="bangla@example.com"
                  className="input input-bordered input-lg w-full bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest opacity-50">
                  Inquiry
                </label>
                <textarea
                  className="textarea textarea-bordered h-40 w-full bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all text-base"
                  placeholder="Tell us about your dream event..."
                  required
                ></textarea>
              </div>

              <button className="btn btn-primary btn-lg w-full rounded-full shadow-xl hover:shadow-primary/30 mt-4">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
