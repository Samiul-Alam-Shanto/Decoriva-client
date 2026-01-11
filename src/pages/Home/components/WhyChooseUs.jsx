import SectionTitle from "../../../components/shared/SectionTitle";
import { FaGem, FaClock, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGem />,
      title: "Unmatched Quality",
      desc: "We source only premium, imported florals and authentic materials. No plastic, no shortcuts—just pure elegance.",
    },
    {
      icon: <FaClock />,
      title: "Punctual Execution",
      desc: "Time is luxury. Our team adheres to strict timelines, ensuring your venue is picture-perfect 4 hours before guests arrive.",
    },
    {
      icon: <FaHandshake />,
      title: "Transparent Pricing",
      desc: "No hidden costs. The price you see is the price you pay, including labor, transport, and post-event cleanup.",
    },
  ];

  return (
    <section className="py-24 bg-base-200/50 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Why Decoriva?"
          subHeading="The Gold Standard"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group p-8 rounded-4xl hover:bg-base-200/50 transition-colors duration-500"
            >
              <div className="w-20 h-20 mx-auto bg-primary/5 rounded-full flex items-center justify-center text-4xl text-primary mb-6 group-hover:bg-primary group-hover:text-primary-content transition-all duration-500 shadow-lg group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-base-content/60 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
