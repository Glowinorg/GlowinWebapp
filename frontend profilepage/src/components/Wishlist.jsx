import { useEffect, useState } from "react";

export default function Wishlist() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setList(data);
  }, []);

  const saveWishlist = () => {
    if (!name || !price) return alert("Enter product & price");
    const updated = [...list, { name, price, note }];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setList(updated);
    setName(""); setPrice(""); setNote("");
  };

  const deleteItem = (i) => {
    const updated = list.filter((_, idx) => idx !== i);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setList(updated);
  };

  return (
    <>
      <h2 className="font-head text-2xl mb-6">Wishlist</h2>

      {!list.length && (
        <div className="border rounded-lg p-4 mb-4">Your wishlist is empty.</div>
      )}

      {list.map((w, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4">
          <strong>{w.name}</strong><br />
          ₹{w.price}<br />
          {w.note && <span className="text-gray-500">{w.note}</span>}
          <br />
          <button
            onClick={() => deleteItem(i)}
            className="mt-2 border border-red-600 text-red-600 px-4 py-1 rounded-full"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="border rounded-lg p-4 space-y-2">
        <input className="w-full border p-2 rounded" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Notes (optional)" value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={saveWishlist} className="bg-roseDark text-white px-6 py-2 rounded-full font-semibold">
          Add to Wishlist
        </button>
      </div>
    </>
  );
}
