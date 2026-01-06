import { useEffect, useState } from "react";

export default function Address() {
  const [addr, setAddr] = useState({
    name: "", mobile: "", line: "", city: "", state: "", pincode: ""
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

      {addr.name && (
        <div className="border rounded-lg p-4 mb-4">
          <strong>{addr.name}</strong><br />
          {addr.line}<br />
          {addr.city}, {addr.state} - {addr.pincode}<br />
          📞 {addr.mobile}
        </div>
      )}

      <div className="border rounded-lg p-4 space-y-2">
        {Object.keys(addr).map(key => (
          <input
            key={key}
            className="w-full border p-2 rounded"
            placeholder={key.toUpperCase()}
            value={addr[key]}
            onChange={e => setAddr({ ...addr, [key]: e.target.value })}
          />
        ))}

        <button onClick={saveAddress} className="bg-roseDark text-white px-6 py-2 rounded-full font-semibold">
          Save Address
        </button>
      </div>
    </>
  );
}
