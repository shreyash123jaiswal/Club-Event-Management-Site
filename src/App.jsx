import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./pages/DashboardHome";
import EventDetails from "./pages/EventDetails";

// Dashboard Sub Pages
import MyProfile from "./pages/MyProfile";
import ManageEvents from "./pages/ManageEvents";
import AllEvents from "./pages/AllEvents";
import ClubDetail from "./pages/ClubDetail";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ================= PROTECTED DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* Profile & Club */}
          <Route path="profile" element={<MyProfile />} />
          <Route path="club-detail" element={<ClubDetail />} />

          {/* Events */}
          <Route path="events/all" element={<AllEvents />} />
          <Route path="events/manage" element={<ManageEvents />} />

          {/* Dynamic Event Details */}
          <Route path="events/:id" element={<EventDetails />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;