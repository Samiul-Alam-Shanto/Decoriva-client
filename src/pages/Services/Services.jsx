import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../../components/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaTag, FaDollarSign } from "react-icons/fa";

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("All");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100000,
    label: "All",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    document.title = "Decoriva | The Collection";
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 1. FETCH SERVICES
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["services", search, category, location, priceRange, currentPage],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`, {
        params: {
          search,
          category,
          location,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  // 2. FETCH LOCATIONS (DYNAMIC FROM BACKEND)
  const { data: uniqueLocations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/locations/category`
      );
      return ["All", ...res.data];
    },
  });

  const services = Array.isArray(data) ? data : data?.services || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const updateFilter = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const categories = ["All", "Wedding", "Home", "Office", "Birthday"];
  const prices = [
    { label: "Any Price", min: 0, max: 100000 },
    { label: "Budget (< $500)", min: 0, max: 500 },
    { label: "Standard ($500 - $2k)", min: 500, max: 2000 },
    { label: "Premium ($2k+)", min: 2000, max: 100000 },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-12">
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-8 mt-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content">
          The Collection
        </h1>
        <p className="text-base-content/60 mt-2">
          Curated packages for every occasion.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR (DESKTOP) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-full pl-10 bg-base-200 focus:bg-base-100 transition-all rounded-xl"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
              </form>

              {/* DYNAMIC LOCATION GROUP */}
              <div>
                <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-secondary text-sm" /> Location
                </h3>
                {/* Shows list from Backend */}
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {uniqueLocations.map((loc) => (
                    <li key={loc}>
                      <button
                        onClick={() => updateFilter(setLocation, loc)}
                        className={`text-sm transition-colors text-left w-full ${
                          location === loc
                            ? "text-primary font-bold translate-x-2"
                            : "text-base-content/70 hover:text-primary hover:translate-x-1"
                        } block transition-transform`}
                      >
                        {loc === "All" ? "Everywhere" : loc}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="divider my-2"></div>

              {/* CATEGORY GROUP */}
              <div>
                <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
                  <FaTag className="text-secondary text-sm" /> Category
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="radio radio-primary radio-xs"
                        checked={category === (cat === "All" ? "" : cat)}
                        onChange={() =>
                          updateFilter(setCategory, cat === "All" ? "" : cat)
                        }
                      />
                      <span
                        className={`text-sm group-hover:text-primary transition-colors ${
                          category === (cat === "All" ? "" : cat)
                            ? "font-bold text-base-content"
                            : "text-base-content/70"
                        }`}
                      >
                        {cat === "All" ? "All Categories" : cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="divider my-2"></div>

              {/* PRICE GROUP */}
              <div>
                <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
                  <FaDollarSign className="text-secondary text-sm" /> Budget
                </h3>
                <div className="flex flex-col gap-2">
                  {prices.map((p, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        className="radio radio-secondary radio-xs"
                        checked={priceRange.label === p.label}
                        onChange={() => updateFilter(setPriceRange, p)}
                      />
                      <span
                        className={`text-sm group-hover:text-primary transition-colors ${
                          priceRange.label === p.label
                            ? "font-bold text-base-content"
                            : "text-base-content/70"
                        }`}
                      >
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* TOP BAR (MOBILE) */}
          <div className="lg:hidden sticky top-[68px] z-30 bg-base-100/95 backdrop-blur-xl py-3 -mx-6 px-6 border-b border-base-content/5 shadow-sm space-y-3">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 h-10 rounded-full bg-base-200 text-sm"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Mobile Location Dropdown  */}
              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs"
                onChange={(e) => updateFilter(setLocation, e.target.value)}
                value={location}
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "Location" : loc}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs"
                onChange={(e) => updateFilter(setCategory, e.target.value)}
              >
                <option value="">Category</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              <select
                className="select select-bordered select-sm w-full rounded-lg text-xs"
                onChange={(e) => {
                  const p = prices[e.target.selectedIndex];
                  updateFilter(setPriceRange, p);
                }}
              >
                {prices.map((p, i) => (
                  <option key={i} value={i}>
                    {p.label.split(" ")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-base-200 rounded-4xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                  {services.length > 0 ? (
                    services.map((service, idx) => (
                      <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                      >
                        <ServiceCard service={service} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-content/20">
                      <h3 className="text-2xl font-serif text-base-content/50">
                        No collections found.
                      </h3>
                      <p className="text-base-content/40">
                        Try resetting your filters.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="btn btn-sm btn-outline mt-4"
                      >
                        Reset All
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {services.length > 0 && (
                  <div className="flex justify-center mt-16">
                    <div className="join shadow-sm border border-base-content/10 bg-base-100 rounded-full overflow-hidden">
                      <button
                        className="join-item btn btn-ghost px-6 hover:bg-base-200"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`join-item btn border-none ${
                            currentPage === i + 1
                              ? "bg-primary text-primary-content hover:bg-primary"
                              : "btn-ghost hover:bg-base-200"
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        className="join-item btn btn-ghost px-6 hover:bg-base-200"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
