import { useEffect, useState, useCallback } from "react";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import SectionTitle from "../../components/shared/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../../assets/hero1.png";
import img2 from "../../assets/gallery2.png";
import img3 from "../../assets/hero2.png";
import img4 from "../../assets/gallery4.png";
import img5 from "../../assets/gallery5.jpg";
import img6 from "../../assets/gallery6.jpg";
import img7 from "../../assets/gallery7.png";
import img8 from "../../assets/gallery8.jpg";
import img9 from "../../assets/gallery9.jpg";

const Gallery = () => {
  useEffect(() => {
    document.title = "Decoriva | Portfolio";
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock Data
  const images = [
    {
      id: 1,
      src: `${img1}`,
      category: "Wedding",
      title: "Royal Stage",
    },
    {
      id: 2,
      src: `${img2}`,
      category: "Birthday",
      title: "Superhero Bash",
    },
    {
      id: 3,
      src: `${img3}`,
      category: "Office",
      title: "Tech Conference",
    },
    {
      id: 4,
      src: `${img4}`,
      category: "Wedding",
      title: "Floral Walkway",
    },
    {
      id: 5,
      src: `${img5}`,
      category: "Birthday",
      title: "Sweet 16",
    },
    {
      id: 6,
      src: `${img6}`,
      category: "Office",
      title: "Startup Hub",
    },
    {
      id: 7,
      src: `${img7}`,
      category: "Wedding",
      title: "Outdoor Canopy",
    },
    {
      id: 8,
      src: `${img8}`,
      category: "Home",
      title: "Living Room",
    },
    {
      id: 9,
      src: `${img9}`,
      category: "Home",
      title: "Cozy Corner",
    },
  ];

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="bg-base-100 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Our Masterpieces"
          subHeading="A Visual Journey"
          center={true}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Wedding", "Birthday", "Office", "Home"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn rounded-full px-8 transition-all font-sans tracking-wide ${
                filter === cat
                  ? "btn-primary text-primary-content shadow-lg"
                  : "btn-ghost hover:bg-base-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/*  Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="relative group break-inside-avoid overflow-hidden rounded-3xl shadow-sm cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale-20 group-hover:grayscale-0"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="text-2xl font-serif font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </h3>
                  <p className="text-xs font-sans tracking-[0.2em] uppercase mt-2 text-white/80">
                    {img.category}
                  </p>
                  <div className="mt-6 flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <button className="btn btn-circle btn-sm btn-outline border-white text-white hover:bg-white hover:text-black">
                      <AiOutlineFullscreen />
                    </button>
                    <button className="btn btn-circle btn-sm btn-primary border-none text-white">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-20 right-6 btn btn-circle btn-ghost text-white text-2xl hover:bg-white/20 z-500"
            >
              <FaTimes />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 lg:left-10 btn btn-circle btn-outline border-white/30 text-white hover:bg-white hover:text-black hover:border-white z-50 hidden md:flex"
            >
              <FaChevronLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 lg:right-10 btn btn-circle btn-outline border-white/30 text-white hover:bg-white hover:text-black hover:border-white z-50 hidden md:flex"
            >
              <FaChevronRight />
            </button>

            {/* Image Container */}
            <div
              className="relative w-full h-full p-4 md:p-20 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-full max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[currentImageIndex].src}
                  alt={filteredImages[currentImageIndex].title}
                  className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                />

                {/* Caption */}
                <div className="absolute -bottom-12 left-0 w-full text-center text-white">
                  <h3 className="text-2xl font-serif font-bold">
                    {filteredImages[currentImageIndex].title}
                  </h3>
                  <p className="text-sm opacity-60 uppercase tracking-widest">
                    {filteredImages[currentImageIndex].category}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Mobile Controls (Bottom) */}
            <div className="absolute bottom-10 flex gap-8 md:hidden z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="btn btn-circle btn-outline text-white"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="btn btn-circle btn-outline text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Gallery;
