export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("address");
    localStorage.removeItem("orders");

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

        {/* SPACE */}
        <div className="flex-grow"></div>

        {/* LOGOUT (shifted right, away from logo) */}
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
