import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import acmLogo from "../assets/acm-logo.webp"; // <-- Put your logo here

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 300);
    setTimeout(() => setShowTitle(true), 1000);
    setTimeout(() => setShowSubtitle(true), 1700);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0C4A6E] relative overflow-hidden">

      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col items-center justify-center text-white relative">

        {/* Logo */}
        <img
          src={acmLogo}
          alt="ACM Logo"
          className={`w-85 mb-6 transition-all duration-1000 transform ${
            showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        />

        {/* SRM ACM */}
        <h1
          className={`text-5xl font-bold tracking-wide transition-all duration-1000 transform ${
            showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Welcome to SRM ACM SIGKDD
        </h1>

        {/* Student Chapter */}
        <p
          className={`text-4xl mt-4 text-blue-200 transition-all duration-1000 transform ${
            showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Student Chapter
        </p>
      </div>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="w-1/2 flex items-center justify-center relative">

        {/* Glow Effects */}
        <div className="absolute w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[120px]"></div>

        <div className="w-[420px] bg-white/10 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(59,130,246,0.35)] relative">

          <div className="flex flex-col items-center mb-8 space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40">
              <FaUserShield className="text-white text-3xl" />
            </div>

            <h2 className="text-3xl font-bold text-white tracking-wide">
              Admin Login
            </h2>
          </div>

          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="email"
              placeholder="Admin Email"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full p-4 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-bold shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Secure Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
