import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("orders"));
    if (!data) {
      data = [
        { id: "GC1021", product: "Rose Glow Serum", amount: 1299, status: "Delivered" },
        { id: "GC1045", product: "Matte Lipstick", amount: 699, status: "Shipped" },
      ];
      localStorage.setItem("orders", JSON.stringify(data));
    }
    setOrders(data);
  }, []);

  return (
    <>
      <h2 className="font-head text-2xl mb-6">My Orders</h2>

      {!orders.length && (
        <div className="border rounded-lg p-4">No orders yet.</div>
      )}

      {orders.map(o => (
        <div key={o.id} className="border rounded-lg p-4 mb-4">
          <strong>Order #{o.id}</strong><br />
          {o.product}<br />
          ₹{o.amount}<br />
          <span className="text-roseDark font-semibold">{o.status}</span>
        </div>
      ))}
    </>
  );
}
