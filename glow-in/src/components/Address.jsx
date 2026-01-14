import { useEffect, useState } from "react";

export default function Address() {
  const [addr, setAddr] = useState({
    name: "",
    mobile: "",
    line: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("address"));
    if (saved) setAddr(saved);
  }, []);

  const saveAddress = () => {
    if (!addr.name || !addr.mobile || !addr.line) {
      alert("Please fill required fields");
      return;
    }
    localStorage.setItem("address", JSON.stringify(addr));
    alert("Address Saved");
  };

  return (
    <>
      <h2 className="font-head text-2xl mb-6">Saved Address</h2>

      {/* ✅ NYKAA-STYLE SAVED ADDRESS CARD */}
      {addr.name && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-rose-700">
                {addr.name}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {addr.line}
              </p>
              <p className="text-sm text-gray-700">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                📞 {addr.mobile}
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-rose-600 text-white font-semibold">
              Default
            </span>
          </div>
        </div>
      )}

      {/* ADDRESS FORM */}
      <div className="border rounded-2xl p-5 space-y-3">
        {Object.keys(addr).map((key) => (
          <input
            key={key}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder={key.toUpperCase()}
            value={addr[key]}
            onChange={(e) =>
              setAddr({ ...addr, [key]: e.target.value })
            }
          />
        ))}

        {/* ✅ NYKAA-STYLE SAVE ADDRESS BUTTON */}
        <button
          onClick={saveAddress}
          className="w-full mt-4 bg-gradient-to-r from-pink-600 to-rose-600 
                     text-white py-4 rounded-2xl font-semibold text-lg
                     shadow-lg hover:opacity-90 transition"
        >
          Save Address
        </button>
      </div>
    </>
  );
}
