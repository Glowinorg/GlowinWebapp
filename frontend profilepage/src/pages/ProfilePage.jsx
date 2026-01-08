import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import Orders from "../components/Orders";
import Wishlist from "../components/Wishlist";
import Address from "../components/Address";
import Help from "../components/Help";
import { useState } from "react";

export default function ProfilePage() {
  const [section, setSection] = useState("profile");

  return (
    <>
      <Header />

      <section className="max-w-6xl mx-auto p-4 grid md:grid-cols-[280px_1fr] gap-6">
        <Sidebar active={section} setSection={setSection} />

        <div className="bg-white rounded-xl shadow-soft p-8">
          {section === "profile" && <Profile />}
          {section === "orders" && <Orders />}
          {section === "wishlist" && <Wishlist />}
          {section === "address" && <Address />}
          {section === "help" && <Help />}
        </div>
      </section>
    </>
  );
}
