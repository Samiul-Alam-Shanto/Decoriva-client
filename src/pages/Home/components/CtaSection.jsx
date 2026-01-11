import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const CtaSection = () => {
  return (
    <section className="py-24 bg-primary text-primary-content relative overflow-hidden">
      {/* Background Texture (Subtle Rings) */}
      <div className="absolute top-0 right-0 w-96 h-96 border-10 border-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-5 border-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Stay Inspired
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Ready to Transform <br /> Your Space?
          </h2>
          <p className="mb-10 text-lg opacity-80 font-light">
            Join 5,000+ happy clients. Subscribe to our newsletter for exclusive
            design trends and early access to new collections.
          </p>

          <div className="join w-full max-w-md shadow-2xl rounded-full overflow-hidden">
            <input
              className="input input-bordered join-item w-full text-black bg-white pl-6 focus:outline-none border-none text-lg"
              placeholder="Enter your email address"
            />
            <button className="btn btn-secondary join-item px-8 border-none text-white text-lg hover:brightness-110 transition-all">
              Subscribe <FaPaperPlane className="text-sm ml-2" />
            </button>
          </div>

          <p className="mt-6 text-xs opacity-50">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default CtaSection;
