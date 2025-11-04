// src/App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Membership from "./pages/Membership";
import FanZone from "./pages/FanZone";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Fixture from "./pages/Fixture";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import AddFixtureForm from "./pages/AddFixtureForm";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProductForm from "./pages/AddProductForm";
import AddNewsForm from "./pages/AddNewsForm";
import EditNewsForm from "./pages/EditNewsForm";
import EditFixtureForm from "./pages/EditFixtureForm";
import EditProductForm from "./pages/EditProductForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Crisp Chat Script (Loads once, bottom-left)
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "d87f1107-f03a-4757-8fc8-0fde13636fd6";

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    // Position Crisp bubble on the bottom-left
    window.$crisp.push(["config", "position:reverse", true]);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navigation />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/fanzone" element={<FanZone />} />
        <Route path="/shop" element={<Shop user={storedUser} />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/failed" element={<PaymentFailed />} />
        <Route path="/fixture" element={<Fixture />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/add-fixture" element={<AddFixtureForm />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/add-news" element={<AddNewsForm />} />
        <Route path="/edit-fixture/:id" element={<EditFixtureForm />} />
        <Route path="/edit-product/:id" element={<EditProductForm />} />
        <Route path="/edit-news/:id" element={<EditNewsForm />} />
      </Routes>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+26879313293"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
          cursor: "pointer",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "30px", height: "30px" }}
        />
      </a>
    </>
  );
}

export default App;
