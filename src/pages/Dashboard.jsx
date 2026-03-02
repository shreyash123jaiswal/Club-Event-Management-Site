import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaUser, FaUsers, FaCalendarAlt, FaPlus, FaBullhorn,
  FaFolderOpen, FaChartBar, FaCog, FaSignOutAlt
} from "react-icons/fa";

const Dashboard = () => {
  const { loading, logout } = useAuth(); // make sure logout exists in AuthContext
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  const handleLogout = () => {
    if (logout) logout();  // optional (if you have logout in context)
    navigate("/admin-login");  // redirect to AdminLogin.jsx route
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-950 to-gray-900">

      {/* Sidebar */}
      <div className="w-[20%] bg-gray-950 backdrop-blur-xl 
                      border-r border-white/10
                      text-white p-6 flex flex-col justify-between">

        <div>
          <NavLink
            to="/dashboard"
            className="text-2xl font-bold mb-10 text-blue-400 block"
          >
            ACM Dashboard
          </NavLink>

          <div className="space-y-8">

            {/* Profile */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-3">Profile</h3>
              <ul className="space-y-3">
                <SidebarLink to="/dashboard/profile" icon={<FaUser />} label="My Profile" />
                <SidebarLink to="/dashboard/club-detail" icon={<FaUsers />} label="Club Details" />
              </ul>
            </div>

            {/* Events */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-3">Events</h3>
              <ul className="space-y-3">
                <SidebarLink to="/dashboard/events/all" icon={<FaCalendarAlt />} label="All Events" />
                <SidebarLink to="/dashboard/events/manage" icon={<FaPlus />} label="Manage Events" />
              </ul>
            </div>

            {/* Management */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-3">Management</h3>
              <ul className="space-y-3">
                <SidebarLink to="/dashboard" icon={<FaBullhorn />} label="Announcements" />
                <SidebarLink to="/dashboard" icon={<FaFolderOpen />} label="Gallery" />
                <SidebarLink to="/dashboard" icon={<FaChartBar />} label="Reports" />
              </ul>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-3">Settings</h3>
              <ul className="space-y-3">
                <SidebarLink to="/dashboard" icon={<FaCog />} label="Settings" />
              </ul>
            </div>

          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[80%] flex flex-col">

        <Navbar
          onSearch={setSearchTerm}
          onFilterType={setFilterType}
          onFilterStatus={setFilterStatus}
        />

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet context={{ searchTerm, filterType, filterStatus }} />
        </div>

      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300
      ${isActive
        ? "bg-blue-500/20 text-blue-400 shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white"}`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Dashboard;