import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import hero1 from "../../../assets/hero1.png";
import hero2 from "../../../assets/hero3.png";
import hero3 from "../../../assets/hero2.png";

const Hero = () => {
  const heroSlides = [
    {
      img: `${hero1} `,
      label: "Royal Weddings",
    },
    {
      img: `${hero2}`,
      label: "Modern Interiors",
    },
    {
      img: `${hero3}`,
      label: "Corporate Galas",
    },
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center bg-base-100 overflow-hidden">
      {/* 1. LEFT  */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20 lg:py-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-20 order-2 lg:order-1 text-center lg:text-left"
        >
          <div className="inline-block border-b border-secondary pb-1 mb-6">
            <span className="text-sm font-sans font-bold tracking-[0.2em] text-secondary uppercase">
              Est. 2024 • Excellence in Styling
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-serif font-bold leading-[1.1] mb-8 text-base-content">
            Design <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-base-content to-secondary/60">
              Beyond
            </span>{" "}
            <br />
            <span className="text-secondary italic font-light">
              <Typewriter
                words={["Expectation", "Imagination", "Boundaries"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed font-sans">
            We curate environments that tell your story. From intimate
            gatherings to grand celebrations, experience the art of luxury
            decoration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link
              to="/services"
              className="btn btn-primary btn-lg rounded-full px-10 text-lg font-sans shadow-2xl hover:scale-105 transition-transform"
            >
              Explore Collections
            </Link>
            <Link
              to="/about"
              className="btn btn-ghost btn-lg rounded-full px-10 text-lg font-sans underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* 2. RIGHT CONTENT  */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative h-[60vh] lg:h-[80vh] w-full z-10 order-1 lg:order-2"
        >
          {/* The " Arch" Mask */}
          <div className="absolute inset-0 rounded-t-[15rem] rounded-b-4xl overflow-hidden shadow-2xl border border-base-content/5">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect={"fade"}
              speed={1500}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full"
            >
              {heroSlides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full">
                    <img
                      src={slide.img}
                      alt={slide.label}
                      className="h-full w-full object-cover"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* Label Tag */}
                    <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-serif italic text-xl">
                      {slide.label}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Decorative Circle Behind */}
          <div className="absolute -z-10 top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        </motion.div>
      </div>

      {/* 3. SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute hidden  bottom-8 left-1/2 -translate-x-1/2  lg:flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-xs block uppercase tracking-widest font-sans">
          S <br /> c <br />r<br />o<br />l<br />l
        </span>
        <div className="w-px h-12 bg-linear-to-b from-base-content to-transparent"></div>
      </motion.div>
    </div>
  );
};
export default Hero;
