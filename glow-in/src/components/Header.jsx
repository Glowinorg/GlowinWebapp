import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  // 🔹 LOAD USER + LISTEN FOR PROFILE UPDATE
  useEffect(() => {
    const loadProfile = () => {
      const data = JSON.parse(localStorage.getItem("profile"));
      setUser(data);
    };

    loadProfile(); // initial load
    window.addEventListener("profileUpdated", loadProfile);

    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("address");
    localStorage.removeItem("orders");

    // ✅ RECOMMENDED LINE (IMPORTANT)
    window.dispatchEvent(new Event("profileUpdated"));

    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
      
      {/* 🔹 LEFT AREA (LOGOUT pushed right from logo) */}
      <div className="flex items-center w-full">
        
        {/* LOGO (far left) */}
        <h1 className="font-head text-3xl font-bold">
          Glow<span className="text-rose">&Co.</span>
        </h1>

        {/* 🔹 USER INFO (GUEST → NAME & EMAIL) */}
        <div className="ml-6 text-sm">
          <p className="font-semibold">
            {user?.name || "Guest"}
          </p>
          <p className="text-gray-500">
            {user?.email || "guest@glowin.com"}
          </p>
        </div>

        {/* SPACE */}
        <div className="flex-grow"></div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-roseDark border border-roseDark px-4 py-1.5 rounded-full hover:bg-roseDark hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* 🔹 RIGHT: HOME ICON */}
      <i
        className="fas fa-home cursor-pointer text-lg ml-6"
        onClick={() => (window.location.href = "/")}
      ></i>
    </header>
  );
}
