import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRocket,
  FaCircle,
  FaAward,
  FaStar,
} from "react-icons/fa";

const DashboardHome = () => {
  const [events, setEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const navigate = useNavigate();

  // ✅ Get search/filter from Dashboard
  const { searchTerm, filterType, filterStatus } = useOutletContext();

  // Fetch all events from Firestore
  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEvents(list);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Apply filters and categorize events
useEffect(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = [...events];

  // Search
  if (searchTerm) {
    filtered = filtered.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Type filter: only filter if a specific type is selected
  if (filterType && filterType !== "") {
    filtered = filtered.filter((event) => event.type === filterType);
  }

  // Status filter
  if (filterStatus && filterStatus !== "") {
    filtered = filtered.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (filterStatus === "Upcoming") return eventDate > today;
      if (filterStatus === "Completed") return eventDate < today;
      if (filterStatus === "Ongoing") return eventDate.getTime() === today.getTime();
      return true;
    });
  }

  // Categorize
  const ongoing = [];
  const upcoming = [];
  const past = [];

  filtered.forEach((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) ongoing.push(event);
    else if (eventDate > today) upcoming.push(event);
    else past.push(event);
  });

  setOngoingEvents(ongoing);
  setUpcomingEvents(upcoming);
  setPastEvents(past);
}, [events, searchTerm, filterType, filterStatus]);

  const EventCard = ({ event }) => {
  const avgRating =
    event.reviews?.length > 0
      ? (event.reviews.reduce((a, b) => a + b, 0) / event.reviews.length).toFixed(1)
      : "N/A";

  return (
    <div
      onClick={() => navigate(`/dashboard/events/${event.id}`)}
      className="group relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>

      {event.banner ? (
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-white/5 flex items-center justify-center text-gray-300">
          No Banner
        </div>
      )}

      <div className="p-5 space-y-2 text-white relative z-10">
        <h3 className="text-xl font-bold group-hover:text-blue-300 transition">
          {event.title}
        </h3>

        <p className="flex items-center gap-2 text-sm text-gray-300">
          <FaCalendarAlt className="text-blue-400" /> {event.date}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-300">
          <FaMapMarkerAlt className="text-red-400" /> {event.location}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-300">
          <FaAward className="text-yellow-400" /> ₹
          {event.prizePool || event.firstprize}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-300">
          <FaStar className="text-yellow-400" /> {avgRating} / 5
        </p>

        <p className="text-sm text-gray-400">
          Registrations: {event.totalRegistrations || 0}
        </p>
      </div>
    </div>
  );
};

  return (
  <div className="min-h-screen bg-transparent space-y-12 text-white">

    {/* Ongoing Events */}
    <Section title="Ongoing Events" color="text-green-400">
      {ongoingEvents.length > 0 ? (
        ongoingEvents.map((e) => <EventCard key={e.id} event={e} />)
      ) : (
        <EmptyState message="No ongoing events currently" />
      )}
    </Section>

    {/* Upcoming Events */}
    <Section title="Upcoming Events" color="text-blue-400">
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((e) => <EventCard key={e.id} event={e} />)
      ) : (
        <EmptyState message="No upcoming events available" />
      )}
    </Section>

    {/* Past Events */}
    <Section title="Past Events" color="text-gray-400">
      {pastEvents.length > 0 ? (
        pastEvents.map((e) => <EventCard key={e.id} event={e} />)
      ) : (
        <EmptyState message="No past events found" />
      )}
    </Section>

  </div>
);
};

export default DashboardHome;
const Section = ({ title, children, color }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
    <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${color}`}>
      <FaCircle className="text-sm" /> {title}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-gray-400 text-center py-10 col-span-full">
    {message}
  </div>
);