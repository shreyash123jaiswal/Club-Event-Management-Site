import React from "react";

const MyProfile = () => {
  const admin = {
    name: "Shreyash",
    role: "Club Admin",
    email: "admin@gmail.com",
    phone: "+91 9876543210",
    department: "Computer Science",
    joined: "August 2025",
    status: "Active",
    lastLogin: "19 Feb 2026, 10:45 PM",
    position: "ACM Student Chapter WebDev Mmeber",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0C4A6E] rounded-3xl p-10 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.25)] overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-black to-indigo-800 p-6 flex justify-between items-center">
          {/* Left Side - Profile Info */}
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white shadow-lg overflow-hidden">
                <img
                  src="https://imgs.search.brave.com/oMoiwvCit93syvRAuv63XCz4t-42wiFlH7GhswSN54U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MDgzMDc4My9waG90/by9wb3NpdGl2ZS1o/YW5kc29tZS15b3Vu/Zy1pbmRpYW4tbWFu/LWhlYWQtc2hvdC1m/cm9udC1wb3J0cmFp/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9cThqTnVRV08z/NVcyLTdsdVh1TGRX/R1AyS0t3S3BkRVVp/VklDSkRqamt1OD0"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online Indicator */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>

            {/* Name & Position */}
            <div className="text-white">
              <h2 className="text-3xl font-bold">{admin.name}</h2>
              <p className="text-blue-200 text-lg">{admin.position}</p>
              <p className="text-sm mt-1 opacity-80">{admin.role}</p>
            </div>
          </div>

          {/* Right Side - Club Logo */}
          <div className="hidden md:flex items-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
              <img
                src="https://imgs.search.brave.com/trM7LQ0DoAc4-cJKFnn3EbNgn5jRXpCQHSTazPjBhlk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcm10/cmljaHkuYWNtLm9y/Zy9jbG9nby5qcGc" // 🔥 Put your club logo in public folder and change name
                alt="Club Logo"
                className="w-28 h-28 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className="space-y-4">
            <Detail label="Email" value={admin.email} />
            <Detail label="Phone" value={admin.phone} />
            <Detail label="Department" value={admin.department} />
            <Detail label="Joined" value={admin.joined} />
          </div>

          <div className="space-y-4">
            <Detail label="Status" value={admin.status} />
            <Detail label="Last Login" value={admin.lastLogin} />
            <Detail label="Role" value={admin.role} />
            <Detail label="Position" value={admin.position} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 pt-0 flex justify-end gap-4">
          <button className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
            Change Password
          </button>

          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md hover:bg-white/10 transition-all">
    <p className="text-sm text-blue-300">{label}</p>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);

export default MyProfile;
