import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setGender(data.gender || "");
      setAge(data.age || "");
      setLocation(data.location || "");
    }

    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) setImage(savedImg);
  }, []);

  const saveProfile = () => {
    if (!name || !email || !gender || !age || !location)
      return alert("Fill all fields");

    localStorage.setItem(
      "profile",
      JSON.stringify({ name, email, gender, age, location })
    );

    window.dispatchEvent(new Event("profileUpdated"));
    alert("Profile Saved");
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
      window.dispatchEvent(new Event("profileUpdated"));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* TOP USER INFO */}
      {name && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200">
          <p className="text-lg font-semibold text-rose-700">
            Hello, {name} 👋
          </p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      )}

      <h2 className="font-head text-2xl mb-6">My Profile</h2>

      {/* PHOTO UPLOAD */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-gray-500">
              {name ? name[0].toUpperCase() : "G"}
            </span>
          )}
        </div>

        <label className="mt-3 cursor-pointer text-blue-600 font-medium">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={uploadPhoto}
          />
        </label>
      </div>

      {/* FORM */}
      <div className="border rounded-lg p-4 space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Location (City, State)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* ✅ SINGLE SAVE BUTTON (NYKAA STYLE – BOTTOM) */}
      <div className="mt-10">
        <button
          onClick={saveProfile}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 
                     text-white py-4 rounded-2xl font-semibold text-lg
                     shadow-lg hover:opacity-90 transition"
        >
          Save Profile
        </button>
      </div>
    </>
  );
}
