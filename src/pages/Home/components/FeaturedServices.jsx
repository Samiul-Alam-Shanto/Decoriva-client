import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../../components/ServiceCard";
import SectionTitle from "../../../components/shared/SectionTitle";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturedServices = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["featured-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services?limit=3`
      );
      return Array.isArray(res.data) ? res.data : res.data.services || [];
    },
  });

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-base-200/50">
      <div className="container mx-auto px-6">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div className="w-full md:w-auto text-center md:text-left">
            <SectionTitle
              heading="Trending Collections"
              subHeading="Curated for You"
              center={false}
            />
          </div>
          <Link
            to="/services"
            className="hidden md:flex items-center gap-2 group text-base-content/70 hover:text-primary transition-colors pb-12"
          >
            View All Packages
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service._id}
              variants={cardVariants}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/services"
            className="btn btn-outline btn-wide rounded-full"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedServices;
