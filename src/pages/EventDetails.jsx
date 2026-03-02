import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import {
  FaUsers,
  FaHandshake,
  FaFire,
  FaTrophy,
  FaChartPie,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaMicrochip,
  FaMoneyBillWave,
} from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setEvent({ id: snap.id, ...snap.data() });
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div className="p-8">Loading...</div>;

  // ================= ANALYTICS =================
  const registrationData = [
    { name: "Selected", value: event.pptSelected || 0 },
    {
      name: "Rejected",
      value: (event.totalRegistrations || 0) - (event.pptSelected || 0),
    },
  ];

  const COLORS = ["#22d3ee", "#a855f7"];

  const avgRating =
    event.reviews && event.reviews.length > 0
      ? (
          event.reviews.reduce((a, b) => a + b, 0) / event.reviews.length
        ).toFixed(1)
      : 0;

  const ratingCount = {
    "5 Star": event.reviews?.filter((r) => r === 5).length || 0,
    "4 Star": event.reviews?.filter((r) => r === 4).length || 0,
    "3 Star": event.reviews?.filter((r) => r === 3).length || 0,
    "2 Star": event.reviews?.filter((r) => r === 2).length || 0,
    "1 Star": event.reviews?.filter((r) => r === 1).length || 0,
  };

  const ratingData = Object.keys(ratingCount).map((key) => ({
    name: key,
    value: ratingCount[key],
  }));

  //const popularityScore = event.popularity || 0;

  return (
  <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen">
    {/* ================= TOP SECTION ================= */}
    <div className="grid md:grid-cols-3 gap-6 items-start">
      {/* LEFT SIDE - EVENT INFO */}
      <div className="md:col-span-2 bg-gray-800 p-6 rounded-2xl shadow-lg">
        {event.banner && (
          <img
            src={event.banner}
            alt={event.title}
            className="w-full max-h-48 object-cover rounded-xl mb-4"
          />
        )}

        <h1 className="text-2xl font-bold text-blue-400 mb-2 flex items-center gap-2">
          <FaMicrochip className="text-yellow-400" />
          {event.title}
        </h1>

        <p className="text-gray-300 mt-2">{event.description}</p>

        <div className="mt-4 space-y-2 text-gray-300">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" />
            <strong>Date:</strong> {event.date}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-400" />
            <strong>Location:</strong> {event.location}
          </p>

          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-purple-400" />
            <strong>Prize Pool:</strong> ₹{event.prizePool}
          </p>

          <p className="flex items-center gap-2">
            <FaUsers className="text-red-400" />
            <strong>Total Registrations:</strong> {event.totalRegistrations}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE PANEL */}
      <div className="space-y-4 self-start">
        {/* Event Type */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700">
          <h2 className="font-semibold text-md flex items-center gap-2 mb-2 text-white">
            <FaTag className="text-blue-400" />
            Event Type
          </h2>
          <p className="text-gray-300">{event.type || "Not Specified"}</p>
        </div>

        {/* Judges */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-md flex items-center gap-2 mb-2 text-indigo-400">
            <FaUsers />
            Judges
          </h2>

          {event.judges?.length > 0 ? (
            <ul className="space-y-1 text-gray-300 text-sm">
              {event.judges.map((judge, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xs" />
                  {judge}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No Judges Announced</p>
          )}
        </div>

        {/* Sponsors */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-md flex items-center gap-2 mb-2 text-green-400">
            <FaHandshake />
            Sponsors
          </h2>

          {event.sponsors?.length > 0 ? (
            <ul className="space-y-1 text-gray-300 text-sm">
              {event.sponsors.map((sponsor, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xs" />
                  {sponsor}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No Sponsors Added</p>
          )}
        </div>

        {/* First Prize */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-md flex items-center gap-2 mb-2 text-yellow-400">
            <FaTrophy />
            First Prize Winner
          </h2>
          <p className="text-gray-300">
            {event.firstprize?.trim() || "Not Announced"}
          </p>
        </div>

        {/* Popularity */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-md flex items-center gap-2 mb-2 text-orange-400">
            <FaFire />
            Popularity Score
          </h2>
          <p className="text-xl font-bold text-orange-300">
            {event.popularity || 0}
          </p>
        </div>
      </div>
    </div>

    {/* ================= FULL WIDTH CHARTS ================= */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* PIE CHART */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-blue-400">
          <FaChartPie />
          PPT Selection
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={registrationData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {registrationData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-yellow-400">
          <FaStar />
          Ratings Overview
        </h2>

        <p className="mb-3 text-gray-300 text-sm">
          Average Rating: <strong>{avgRating}</strong> / 5
        </p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={ratingData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
};

export default EventDetails;
