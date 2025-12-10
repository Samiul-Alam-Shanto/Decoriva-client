import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import decor1 from "../../../assets/Decor1.png";
import decor2 from "../../../assets/Decor2.jpg";
import decor3 from "../../../assets/Decor3.png";

const decorators = [
  {
    id: 1,
    name: "Abir",
    role: "Wedding Visionary",
    img: `${decor1}`,
  },
  {
    id: 2,
    name: "Samiul",
    role: "Interior Architect",
    img: `${decor2}`,
  },
  {
    id: 3,
    name: "Koushik",
    role: "Floral Artist",
    img: `${decor3}`,
  },
  {
    id: 4,
    name: "Shanto",
    role: "Lighting Specialist",
    img: `${decor2}`,
  },
];

const TopDecorators = () => {
  return (
    <section className="py-24 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Our Artisans"
          subHeading="Meet the Experts"
          center={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
            className="pb-16"
          >
            {decorators.map((dec) => (
              <SwiperSlide key={dec.id}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl h-[450px]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img
                      src={dec.img}
                      alt={dec.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-2xl font-serif font-bold">
                        {dec.name}
                      </h3>

                      <div className="flex justify-between items-end mt-1">
                        <p className="text-secondary font-medium tracking-wide text-sm uppercase">
                          {dec.role}
                        </p>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                          <FaStar />{" "}
                          <span className="text-white font-bold ml-1">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};
export default TopDecorators;
