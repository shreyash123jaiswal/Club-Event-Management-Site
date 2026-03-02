import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(list);
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">All Events</h1>

      <div className="grid grid-cols-3 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            onClick={() => navigate(`/dashboard/events/${event.id}`)}
            className="bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            {event.banner && (
              <img
                src={event.banner}
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            )}

            <div className="p-4">
              <h3 className="font-bold text-lg text-blue-600">
                {event.title}
              </h3>
              <p className="text-gray-500 mt-2">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;