import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Samiul & Shanto",
    text: "We were blown away. The attention to detail was impeccable. StyleDecor didn't just decorate; they created an atmosphere we will never forget.",
    loc: "Wedding at Radisson Blu",
  },
  {
    name: "Abir Corp",
    text: "Professional, punctual, and innovative. They transformed our dull conference hall into a vibrant hub of creativity. Highly recommended.",
    loc: "Annual Summit, Dhaka",
  },
  {
    name: "Dr. Farhana Ahmed",
    text: "My daughter's sweet 16 was a fairytale. The floral arrangements were fresh, and the lighting was magical. Thank you, StyleDecor!",
    loc: "Private Residence, Gulshan",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-neutral text-neutral-content relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.05, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <FaQuoteLeft className="text-[400px] absolute -top-20 -left-20" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          heading="Client Stories"
          subHeading="Words of Appreciation"
          center={true}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000 }}
            spaceBetween={50}
            slidesPerView={1}
            className="max-w-4xl mx-auto text-center"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center">
                  <FaQuoteLeft className="text-5xl text-secondary mb-8 opacity-50" />
                  <p className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-10 opacity-90">
                    "{review.text}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold font-sans uppercase tracking-widest text-secondary">
                      {review.name}
                    </h4>
                    <p className="text-sm opacity-60 mt-2">{review.loc}</p>
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
export default Testimonials;
