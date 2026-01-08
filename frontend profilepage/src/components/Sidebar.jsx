import { useEffect, useState } from "react";

const items = [
  { id: "profile", icon: "fa-user", label: "Profile" },
  { id: "orders", icon: "fa-box", label: "Orders" },
  { id: "wishlist", icon: "fa-heart", label: "Wishlist" },
  { id: "address", icon: "fa-map-marker-alt", label: "Address" },
  { id: "help", icon: "fa-headset", label: "Help" },
];

export default function Sidebar({ active, setSection }) {
  const [name, setName] = useState("Guest");
  const [email, setEmail] = useState("guest@email.com");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadProfile = () => {
      const data = JSON.parse(localStorage.getItem("profile"));
      const img = localStorage.getItem("profileImage");

      if (data) {
        setName(data.name || "Guest");
        setEmail(data.email || "guest@email.com");
      }
      if (img) setImage(img);
    };

    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);

    return () => {
      window.removeEventListener("profileUpdated", loadProfile);
    };
  }, []);

  return (
    <aside className="bg-white rounded-xl shadow-soft p-6">
      {/* PROFILE INFO (UNCHANGED) */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-rose to-roseDark text-white flex items-center justify-center text-3xl font-head overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            name[0]?.toUpperCase()
          )}
        </div>

        <h3 className="mt-2 font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* MENU (UNCHANGED) */}
      {items.map((i) => (
        <div
          key={i.id}
          onClick={() => setSection(i.id)}
          className={`flex gap-3 p-3 rounded-lg cursor-pointer ${
            active === i.id ? "bg-pink-50" : "hover:bg-pink-50"
          }`}
        >
          <i className={`fas ${i.icon} text-roseDark`} />
          {i.label}
        </div>
      ))}
    </aside>
  );
}
