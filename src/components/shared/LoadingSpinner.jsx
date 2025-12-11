import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-tr-3xl rounded-bl-3xl shadow-xl"></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50">
          Decoriva
        </p>
      </motion.div>
    </div>
  );
};
export default LoadingSpinner;
