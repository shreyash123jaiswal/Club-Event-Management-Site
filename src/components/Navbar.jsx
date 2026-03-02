import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaChevronDown, FaUserCircle } from "react-icons/fa";

const Navbar = ({ onSearch, onFilterType, onFilterStatus }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-gray-900/70 backdrop-blur-lg
                    border-b border-white/10
                    px-8 py-4 flex items-center justify-between">

      {/* Date */}
      <div className="text-gray-300 text-sm">
        {formattedDate}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 flex-1 mx-8">

        <div className="relative w-full max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-white/5 border border-white/10
                       rounded-full pl-12 pr-4 py-2
                       text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       backdrop-blur-lg transition"
          />
        </div>

        <FilterSelect onChange={onFilterType}>
          <option value="">All Types</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Webinar">Webinar</option>
          <option value="Meetup">Meetup</option>
        </FilterSelect>

        <FilterSelect onChange={onFilterStatus}>
          <option value="">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
        </FilterSelect>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 bg-white/5 px-4 py-2
                      rounded-full border border-white/10
                      hover:border-blue-500/40 transition">

        <FaUserCircle className="text-blue-400 text-3xl" />

        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">
            {user?.email}
          </span>
          <span className="text-gray-400 text-xs">
            {user?.role || "Admin"}
          </span>
        </div>
      </div>

    </div>
  );
};

const FilterSelect = ({ children, onChange }) => (
  <div className="relative">
    <select
      onChange={(e) => onChange && onChange(e.target.value)}
      className="appearance-none bg-white/5 border border-white/10
                 rounded-full px-4 py-2 pr-8 text-gray-300
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 backdrop-blur-lg transition"
    >
      {children}
    </select>
    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default Navbar;