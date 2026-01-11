import { FaSearch, FaCalendarCheck, FaGlassCheers } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Discover Your Style",
      desc: "Browse our curated portfolio of premium themes, from Royal Weddings to Minimalist Homes.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Reserve the Date",
      desc: "Select your preferred timeline and customize your package with exclusive add-ons.",
    },
    {
      icon: <FaGlassCheers />,
      title: "Experience Magic",
      desc: "Our expert team handles the execution while you enjoy your perfectly styled occasion.",
    },
  ];

  return (
    <section className="py-24 bg-base-200/50">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="The Experience"
          subHeading="Seamless & Sophisticated"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-secondary/30 to-transparent border-t border-dashed border-secondary/50"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-base-100 border border-secondary/20 flex items-center justify-center text-3xl text-secondary shadow-lg z-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                {step.icon}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-serif font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed px-4">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
