import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Hours */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-3xl font-serif font-bold tracking-tighter"
            >
              Decoriva<span className="text-secondary">.</span>
            </Link>
            <p className="opacity-70 leading-relaxed">
              Crafting timeless environments for life's most celebrated moments.
            </p>

            {/* NEW: Working Hours */}
            <div className="flex items-start gap-3 opacity-80 bg-white/5 p-4 rounded-xl border border-white/10">
              <FaClock className="text-secondary mt-1" />
              <div className="text-sm">
                <p className="font-bold text-white">Opening Hours</p>
                <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#daa932] hover:border-secondary hover:text-white transition-all duration-300"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Explore</h4>
            <ul className="space-y-4 opacity-70">
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/services"
                  className="hover:text-secondary  transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/gallery"
                  className="hover:text-secondary  transition-colors"
                >
                  Portfolio Gallery
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/about"
                  className="hover:text-secondary  transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/contact"
                  className="hover:text-secondary  transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Services</h4>
            <ul className="space-y-4 opacity-70">
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/services"
                  className="hover:text-secondary transition-colors"
                >
                  Wedding Styling
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/services"
                  className="hover:text-secondary transition-colors"
                >
                  Interior Design
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/services"
                  className="hover:text-secondary transition-colors"
                >
                  Corporate Events
                </Link>
              </li>
              <li className="hover:translate-x-1 transition-all">
                <Link
                  to="/services"
                  className="hover:text-secondary transition-colors"
                >
                  Custom Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif">Newsletter</h4>
            <p className="opacity-70 mb-4">
              Subscribe for design trends and exclusive offers.
            </p>
            <div className="join w-full">
              <input
                className="input input-bordered join-item w-full bg-white text-black placeholder:text-gray-500 focus:outline-none"
                placeholder="Email address"
              />
              <button className="btn bg-[#daa932] join-item border-none text-white">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center opacity-50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Decoriva Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
