import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import SectionTitle from "../../../components/shared/SectionTitle";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
const position = [23.7937, 90.4066];
const locations = [
  {
    district: "Dhaka",
    name: "Gulshan Avenue, Dhaka",
    latitude: 23.7805733,
    longitude: 90.2792399,
    value: "Decoriva,HQ",
  },
  {
    district: "Chittagong",
    name: "Agrabad, Chittagong",
    latitude: 22.335109,
    longitude: 91.832469,
    value: "Decoriva,Office",
  },
  {
    district: "Rajshahi",
    name: "Shaheb Bazar, Rajshahi",
    latitude: 24.3745,
    longitude: 88.6042,
    value: "Decoriva,Office",
  },
  {
    district: "Khulna",
    name: "Sonadanga, Khulna",
    latitude: 22.8456,
    longitude: 89.5403,
    value: "Decoriva,Office",
  },
  {
    district: "Barishal",
    name: "Bandar Road, Barishal",
    latitude: 22.701,
    longitude: 90.3535,
    value: "Decoriva,Office",
  },
  {
    district: "Sylhet",
    name: "Zindabazar, Sylhet",
    latitude: 24.8864,
    longitude: 91.8807,
    value: "Decoriva,Office",
  },
  {
    district: "Rangpur",
    name: "Jahaj Company More, Rangpur",
    latitude: 25.746,
    longitude: 89.2514,
    value: "Decoriva,Office",
  },
  {
    district: "Mymensingh",
    name: "Town Hall Road, Mymensingh",
    latitude: 24.7471,
    longitude: 90.4203,
    value: "Decoriva,Office",
  },
  {
    district: "Cox's Bazar",
    name: "Kalatali Road, Cox's Bazar",
    latitude: 21.4272,
    longitude: 92.0058,
    value: "Decoriva,Office",
  },
];

const ServiceMap = () => {
  return (
    <section className="pb-24 bg-base-100 relative">
      <div className="container mx-auto px-6 mb-12">
        <SectionTitle
          heading="Our Presence"
          subHeading="Visit Our Studios"
          center={true}
        />
      </div>

      <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full w-full"
        >
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
            style={{ background: "#f0f0f0" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles-filter"
            />
            {locations.map((data) => (
              <Marker position={[data.latitude, data.longitude]}>
                <Popup className="font-sans">
                  <strong className="text-primary">{data.value}</strong> <br />
                  {data.name}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/*  Card with Animation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="absolute top-10 right-4 lg:right-20 z-40 max-w-sm w-full"
        >
          <div className="glass-panel p-8 rounded-2xl shadow-2xl text-base-content">
            <h3 className="text-2xl font-serif font-bold mb-6">Headquarters</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide opacity-60 mb-1">
                    Visit Us
                  </p>
                  <p className="leading-snug">
                    Level 4, Gulshan Avenue,
                    <br />
                    Dhaka 1212
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-content flex items-center justify-center shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide opacity-60 mb-1">
                    Call Us
                  </p>
                  <p className="leading-snug">+880 1700-123456</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <style>{`
                    .map-tiles-filter { filter: grayscale(100%) contrast(1.1); }
                    [data-theme="luxury-dark"] .map-tiles-filter { filter: grayscale(100%) invert(90%) hue-rotate(180deg) contrast(1.2); }
                `}</style>
      </div>
    </section>
  );
};
export default ServiceMap;
