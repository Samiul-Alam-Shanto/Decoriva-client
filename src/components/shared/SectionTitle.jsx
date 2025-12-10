import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? "text-center" : "text-left"}`}
    >
      {subHeading && (
        <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
          {subHeading}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-base-content leading-tight">
        {heading}
      </h2>
    </motion.div>
  );
};
export default SectionTitle;
