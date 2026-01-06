import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 ADDED: gender, age, location state
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  // 🔹 profile image state
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

  // ✅ save profile (same logic + age & location)
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

  // ✅ upload photo (UNCHANGED)
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
      <h2 className="font-head text-2xl mb-6">My Profile</h2>

      {/* PHOTO UPLOAD UI (UNCHANGED) */}
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

      {/* FORM (ONLY age & location added) */}
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

        {/* Gender */}
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

        {/* 🔹 ADDED: Age */}
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* 🔹 ADDED: Location */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Location (City, State)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="bg-roseDark text-white px-6 py-2 rounded-full font-semibold"
        >
          Save Profile
        </button>
      </div>
    </>
  );
}
