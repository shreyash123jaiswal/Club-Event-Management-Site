import React, { useState } from "react";

const facultyMembers = [
  {
    name: "Dr. K Shweta",
    designation: "Head of DSBS Department",
    email: "khcollege.edu",
    image: "https://imgs.search.brave.com/BOw4uNNuvI2twfj9gIbcWkJvsOSTbTEW7r1UvxJFUGw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzg3LzAyLzkx/LzM2MF9GXzQ4NzAy/OTE3MF80YU9aZTc1/MHQzYVFuTGtTN2Z4/T21yRkQ3SlE5VEpK/cC5qcGc",
  },
  {
    name: "Dr. Arun S",
    designation: "Faculty Advisor SRM ACM ",
    email: "as@college.edu",
    image: "https://imgs.search.brave.com/N3p1n1Im23F4b0_OUyfAVXPDzL3DILBuV3Y8BFXRyzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGltZXNub3do/aW5kaS5jb20vcGhv/dG8vbXNpZC0xMTMx/ODE1MjMvMTEzMTgx/NTIzLmpwZz90aHVt/YnNpemU9NjI1NDA",
  },
];

const coreTeam = [
  { role: "President", name: "Arjun" },
  { role: "Vice President", name: "Meera" },
  { role: "Treasurer", name: "Rahul" },
  { role: "WebMaster", name: "Sneha" },
  { role: "Secretary", name: "Karthik" },
];

const teams = {
  Corporate: {
    head: "Corporate Head - Aditya",
    lead: "Corporate Lead - Priya",
    members: ["Rohit", "Ananya", "Vikram"],
  },
  Creatives: {
    head: "Creative Head - Diya",
    lead: "Creative Lead - Varun",
    members: ["Ishita", "Nikhil", "Pooja"],
  },
  WebDev: {
    head: "WebDev Head - Sanjay",
    lead: "WebDev Lead - Kavya",
    members: ["Harish", "Ritika", "Akash"],
  },
  RnD: {
    head: "R&D Head - Manish",
    lead: "R&D Lead - Tania",
    members: ["Dev", "Krishna", "Arun"],
  },
};

const ClubDetail = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0C4A6E] p-6 text-white space-y-14">

      {/* Faculty Section */}
<div>
  <h2 className="text-3xl font-bold mb-6">Faculty Coordinators</h2>

  <div className="grid md:grid-cols-2 gap-8">
    {facultyMembers.map((faculty, index) => (
      <div
        key={index}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.25)] flex items-center gap-6 hover:scale-[1.02] transition-all duration-300"
      >
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xl font-bold">{faculty.name}</h3>
          <p className="text-blue-300">{faculty.designation}</p>
          <p className="mt-2 text-sm opacity-80">{faculty.email}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Core Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Core Team</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {coreTeam.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:bg-white/20 transition"
            >
              <p className="text-blue-300 text-sm">{member.role}</p>
              <p className="text-xl font-semibold">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Category Cards */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Our Teams</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {Object.keys(teams).map((team) => (
            <div
              key={team}
              onClick={() => setSelectedTeam(team)}
              className="cursor-pointer bg-gradient-to-r from-gray-900 p-6 rounded-2xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-center"
            >
              <h3 className="text-xl font-bold">{team} Team</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Team Details */}
      {selectedTeam && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <h2 className="text-2xl font-bold mb-4">
            {selectedTeam} Team Members
          </h2>

          <p className="text-blue-300 mb-2">
            {teams[selectedTeam].head}
          </p>
          <p className="text-blue-300 mb-4">
            {teams[selectedTeam].lead}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {teams[selectedTeam].members.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
              >
                {member}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetail;