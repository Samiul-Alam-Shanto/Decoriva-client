import { Link } from "react-router";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { _id, service_name, image, cost, category, description, location } =
    service;

  return (
    <div className="group h-full  bg-base-100 rounded-3xl border border-base-content/5 overflow-hidden flex flex-col hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      {/* IMAGE CONTAINER */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={service_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

        {/* Top Tags  */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="badge border-none bg-white/30 backdrop-blur-md text-white font-medium px-3 py-3 rounded-full text-xs uppercase tracking-wide shadow-sm">
            {category}
          </div>
          {/* Location Tag */}
          {location && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">
              <FaMapMarkerAlt className="text-secondary" /> {location}
            </div>
          )}
        </div>
      </div>

      {/*  CONTENT CONTAINER */}
      <div className="p-6 flex flex-col grow relative">
        <div className="w-8 h-0.5 bg-secondary mb-4"></div>

        <h3 className="text-2xl font-serif font-bold text-base-content mb-3 group-hover:text-primary transition-colors leading-tight">
          {service_name}
        </h3>
        <p className="text-base-content/60 text-sm leading-relaxed line-clamp-2 mb-6 grow font-light">
          {description}
        </p>

        {/* Price & Action */}
        <div className="border-t border-base-content/10 pt-4 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-base-content/40 uppercase tracking-widest font-bold mb-1">
              Starting From
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-serif font-bold text-base-content">
                ${cost.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            to={`/services/${_id}`}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary group/btn hover:text-secondary transition-colors"
          >
            Explore
            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:translate-x-1 transition-all duration-300">
              <FaArrowRight size={10} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
