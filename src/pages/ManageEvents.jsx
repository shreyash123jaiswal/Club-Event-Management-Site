import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("view");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();
  const editFormRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    location: "",
    description: "",
    prizePool: "",
    sponsors: "",
    judges: "",
    banner: "",
  });

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(list);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= ADD EVENT =================
  const handleAdd = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "events"), {
      ...formData,
      prizePool: Number(formData.prizePool),
      totalRegistrations: 0,
      sponsors: formData.sponsors
        ? formData.sponsors.split(",").map((s) => s.trim())
        : [],
      judges: formData.judges
        ? formData.judges.split(",").map((j) => j.trim())
        : [],
      certificates: [],
      createdAt: new Date(),
    });

    alert("Event Added Successfully ✅");

    navigate("/dashboard"); // 🔥 Redirect
  };

  // ================= DELETE EVENT =================
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "events", id));
    alert("Event Deleted ❌");
    fetchEvents();
  };

  // ================= UPDATE EVENT =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedEvent) return;

    await updateDoc(doc(db, "events", selectedEvent.id), {
      title: formData.title,
      type: formData.type,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      prizePool: Number(formData.prizePool),
      sponsors: formData.sponsors
        ? formData.sponsors.split(",").map((s) => s.trim())
        : [],
      judges: formData.judges
        ? formData.judges.split(",").map((j) => j.trim())
        : [],
      banner: formData.banner,
    });

    alert("Event Updated Successfully ✏");

    navigate("/dashboard");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-6 text-center">
        Manage Events
      </h2>

      {/* ================= TOP BUTTONS ================= */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        <button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-lg"
        >
          <FaPlus /> Add Event
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg"
        >
          <FaEdit /> Edit Event
        </button>

        <button
          onClick={() => setActiveTab("delete")}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg"
        >
          <FaTrash /> Delete Event
        </button>
      </div>

      {/* ================= ADD EVENT ================= */}
      {activeTab === "add" && (
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Title"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Webinar">Webinar</option>
              <option value="Meetup">Meetup</option>
            </select>

            <input
              type="date"
              name="date"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              name="location"
              placeholder="Location"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="prizePool"
              placeholder="Prize Pool"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg w-full mt-4"
            onChange={handleChange}
            required
          />

          <input
            name="sponsors"
            placeholder="Sponsors (comma separated)"
            className="border p-3 rounded-lg w-full mt-4"
            onChange={handleChange}
          />

          <input
            name="judges"
            placeholder="Judges (comma separated)"
            className="border p-3 rounded-lg w-full mt-4"
            onChange={handleChange}
          />

          <input
            name="banner"
            placeholder="Banner Image URL"
            className="border p-3 rounded-lg w-full mt-4"
            onChange={handleChange}
          />

          <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg w-full">
            Add Event
          </button>
        </form>
      )}

      {/* ================= EDIT EVENT ================= */}
{activeTab === "edit" && (
  <div className="w-full max-w-4xl flex flex-col items-center">
    {events.length === 0 ? (
      <p className="text-white text-lg">No events found.</p>
    ) : (
      events.map((eventItem) => (
        <div
          key={eventItem.id}
          className="bg-white p-4 rounded-xl shadow-md mb-4 w-full flex justify-between items-center"
        >
          {/* Event Details */}
          <div>
            <h3 className="font-bold text-lg">{eventItem.title}</h3>
            <p className="text-gray-500 text-sm">{eventItem.type || "Not Specified"}</p>
            <p className="text-gray-500 text-sm">{eventItem.date || "No Date"}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => {
              setSelectedEvent(eventItem);

              setFormData({
                title: eventItem.title || "",
                type: eventItem.type || "",
                date: eventItem.date || "",
                location: eventItem.location || "",
                description: eventItem.description || "",
                prizePool: eventItem.prizePool || "",
                sponsors: eventItem.sponsors?.join(", ") || "",
                judges: eventItem.judges?.join(", ") || "",
                banner: eventItem.banner || "",
              });

              setTimeout(() => {
                editFormRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            <FaEdit /> Edit
          </button>
        </div>
      ))
    )}

    {selectedEvent && (
      <form
        ref={editFormRef}
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-md mt-6 w-full"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        >
          <option value="">Select Event Type</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Webinar">Webinar</option>
          <option value="Meetup">Meetup</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          type="number"
          name="prizePool"
          value={formData.prizePool}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          name="sponsors"
          value={formData.sponsors}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          name="judges"
          value={formData.judges}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <input
          name="banner"
          value={formData.banner}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-3"
        />

        <button className="bg-gray-900 text-white px-6 py-3 rounded-lg w-full">
          Update Event
        </button>
      </form>
    )}
  </div>
)}
      {/* ================= DELETE EVENT ================= */}
{activeTab === "delete" && (
  <div className="w-full max-w-4xl flex flex-col items-center">
    {events.length === 0 ? (
      <p className="text-white text-lg">No events found.</p>
    ) : (
      events.map((eventItem) => (
        <div
          key={eventItem.id}
          className="bg-white p-4 rounded-xl shadow-md mb-4 w-full flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{eventItem.title}</h3>
            <p className="text-gray-500 text-sm">{eventItem.type}</p>
            <p className="text-gray-500 text-sm">{eventItem.date}</p>
          </div>

          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete "${eventItem.title}"?`
                )
              ) {
                handleDelete(eventItem.id);
              }
            }}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            <FaTrash /> Delete
          </button>
        </div>
      ))
    )}
  </div>
)}
    </div>
  );
};

export default ManageEvents;