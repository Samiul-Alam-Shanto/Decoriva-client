import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import img1 from "../../assets/hero1.png";
import img2 from "../../assets/hero2.png";

const About = () => {
  useEffect(() => {
    document.title = "Decoriva | Our Heritage";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-base-100 min-h-screen pt-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-sm font-sans font-bold tracking-[0.3em] text-secondary uppercase mb-6">
            Since 2024
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-base-content leading-tight mb-8">
            Crafting Memories, <br />
            <span className="italic font-light text-base-content/60">
              Curating Dreams.
            </span>
          </h1>
          <p className="text-xl text-base-content/70 font-light leading-relaxed">
            We don't just decorate venues. We translate your emotions into
            visual poetry. Decoriva is the bridge between imagination and
            reality.
          </p>
        </motion.div>
      </div>

      {/* 2. SPLIT STORY SECTION */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={img1}
              alt="Luxury Wedding"
              className="w-4/5 rounded-4xl shadow-2xl z-10 relative"
            />
            <img
              src={img2}
              alt="Interior"
              className="absolute -bottom-10 -right-4 w-3/5 rounded-4xl shadow-2xl border-4 border-base-100 z-20 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-serif font-bold">
              The Art of Celebration
            </h3>
            <p className="text-base-content/70 leading-loose text-lg">
              Founded in Dhaka, Decoriva started with a singular vision: to
              democratize luxury. We noticed that high-end styling was often
              inaccessible or opaque. We set out to change that by combining
              <span className="text-primary font-bold">
                {" "}
                world-class design
              </span>{" "}
              with transparent technology.
            </p>
            <p className="text-base-content/70 leading-loose text-lg">
              Today, we are a collective of 50+ architects, florists, and
              lighting specialists working in harmony to create events that are
              not just seen, but felt.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-4xl font-serif font-bold text-secondary mb-2">
                  500+
                </h4>
                <p className="text-sm uppercase tracking-widest opacity-60">
                  Events Curated
                </p>
              </div>
              <div>
                <h4 className="text-4xl font-serif font-bold text-secondary mb-2">
                  100%
                </h4>
                <p className="text-sm uppercase tracking-widest opacity-60">
                  Success Rate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. TEAM / PHILOSOPHY STRIP */}
      <div className="bg-base-200/50 py-24">
        <div className="container mx-auto px-6 text-center">
          <SectionTitle
            heading="Our Philosophy"
            subHeading="Core Values"
            center={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Precision",
                desc: "Every petal, every light, placed with absolute intent.",
              },
              {
                title: "Elegance",
                desc: "We believe in sophistication that stands the test of time.",
              },
              {
                title: "Transparency",
                desc: "Clear pricing, clear timelines. No hidden surprises.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-base-100 rounded-3xl shadow-sm border border-base-content/5"
              >
                <h4 className="text-2xl font-serif font-bold mb-4">
                  {item.title}
                </h4>
                <p className="text-base-content/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CTA */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
          Ready to write your story?
        </h2>
        <Link
          to="/contact"
          className="btn btn-primary btn-lg rounded-full px-12 shadow-xl hover:scale-105 transition-transform"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
};
export default About;
