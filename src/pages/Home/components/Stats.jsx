import CountUp from "react-countup";
import { motion } from "framer-motion";

const Stats = () => {
  const statsData = [
    { label: "Weddings Styled", value: 450, suffix: "+" },
    { label: "Corporate Events", value: 120, suffix: "" },
    { label: "Client Satisfaction", value: 99, suffix: "%" },
    { label: "Design Awards", value: 15, suffix: "" },
  ];

  return (
    <div className="border-y border-base-content/5 bg-base-100 mt-10 relative z-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className={`text-center flex flex-col items-center justify-center ${
                idx !== statsData.length - 1
                  ? "md:border-r border-base-content/10"
                  : ""
              }`}
            >
              <h3 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-3 leading-none">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                <span className="text-4xl text-secondary">{stat.suffix}</span>
              </h3>
              <p className="text-xs lg:text-sm font-sans uppercase tracking-[0.2em] text-base-content/60 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Stats;
