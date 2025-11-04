import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/";

export default function Shop({ user }) {
  const [products, setProducts] = useState([]);
  const [selectedTshirt, setSelectedTshirt] = useState({});
  const [viewProduct, setViewProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  user = localStorage.getItem("user");


  const tickets = [
    {
      id: 1,
      name: "Match Ticket",
      image: "https://i.ibb.co/XkXz5t8s/moja-ticket.jpg",
      link: "https://m.mojaticket.com/",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    console.log("User object:", user);
    console.log("User object in Shop:", user);
    console.log("User email in Shop:", JSON.parse(user).email);

    if (!user) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    const orderPayload = {
      customerFullName: fullName,
      customerEmail: JSON.parse(user).email,
      customerPhone: phone,
      shippingAddress: address,
  items: cart.map((item) => ({
    productId: item.id,
    color: item.color || "Black",
    size: item.size || "M",
    quantity: 1,
    unitPrice: item.price,
    lineTotal: item.price,
  })),
};

if (!fullName || !address) {
  alert("Please enter your full name and shipping address.");
  return;
}

    try {
      const res = await fetch(`${BASE}/api/orders/initiate-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const text = await res.text();
let data = {};

try {
  data = JSON.parse(text);
} catch (err) {
  console.error("❌ Failed to parse JSON:", text);
  alert("Checkout failed: Invalid response from server.");
  console.log("Checkout status:", res.status);
console.log("Raw response:", text);
  return;
}
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (err) {
      console.error("❌ Checkout error:", err);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-[#C1A85E] p-6"
      style={{
        backgroundImage: "url('https://i.ibb.co/wFLGDxSs/Banner-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login/Register */}
      <div className="flex justify-end mb-6">
        {!user ? (
          <span className="text-[#C1A85E] font-bold text-lg">
            <Link to="/login" className="hover:underline">Login</Link> /{" "}
            <Link to="/register" className="hover:underline">Register</Link>
          </span>
        ) : (
          <span className="text-[#C1A85E] font-bold text-lg">
            Welcome, {user.username}
          </span>
        )}
      </div>

      {/* Welcome & Featured */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-[#C1A85E] mb-4">
            Welcome to Mbabane Highlanders Store
          </h1>
          <p className="mb-6 text-lg lg:text-xl">
            Official T-shirts and Match Tickets. Add to your collection!
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://i.ibb.co/LD7dH2rf/Whats-App-Image-2025-10-26-at-23-35-39-3.jpg"
            alt="Featured T-shirt"
            className="w-full max-w-lg cursor-default animate-round-motion"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded shadow-md bg-white flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#C1A85E]">
                {t.name}
              </h2>
              <img
                src={t.imageUrl}
                alt={t.name}
                className="w-60 h-60 rounded cursor-default animate-round-motion"
              />
              <div className="mb-2 mt-2">
                <label className="mr-2 font-bold text-[#C1A85E]">Size:</label>
                <select
                  value={selectedTshirt[t.id] || "M"}
                  onChange={(e) =>
                    setSelectedTshirt({
                      ...selectedTshirt,
                      [t.id]: e.target.value,
                    })
                  }
                  className="bg-gray-200 text-black px-2 py-1 rounded"
                >
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
              <p className="mb-2 font-bold text-[#C1A85E]">Price: E{t.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setViewProduct({ ...t, size: selectedTshirt[t.id] || "M" })
                  }
                  className="border border-[#C1A85E] text-[#C1A85E] font-bold py-2 px-4 rounded hover:bg-[#C1A85E] hover:text-black transition"
                >
                  View Product
                </button>
                <button
                  onClick={() =>
                    addToCart({ ...t, size: selectedTshirt[t.id] || "M" })
                  }
                  className="border border-[#C1A85E] text-[#C1A85E] font-bold py-2 px-4 rounded hover:bg-[#C1A85E] hover:text-black transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded shadow-md bg-white flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#C1A85E]">
                Purchase your {ticket.name} here
              </h2>
              <a
                href={ticket.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={ticket.image}
                  alt={ticket.name}
                  className="w-60 h-60 object-contain rounded cursor-pointer animate-round-motion hover:opacity-80 transition"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Icon */}
      <div className="fixed bottom-32 right-8 z-50">
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="bg-[#C1A85E] text-black font-bold px-4 py-3 rounded-full shadow-lg"
        >
          🛒 {cart.length} items
        </button>
      </div>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-2 right-2 text-black font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#C1A85E]">Your Cart</h2>
            <div className="mb-4">
  <label className="block text-black font-semibold mb-1">Full Name</label>
  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full px-3 py-2 border rounded"
    placeholder="Enter your full name"
    required
  />
</div>
<div className="mb-4">
  <label className="block text-black font-semibold mb-1">Shipping Address</label>
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full px-3 py-2 border rounded"
    placeholder="Enter your shipping address"
    required
  />
</div>
<div className="mb-4">
  <label className="block text-black font-semibold mb-1">Phone Number (optional)</label>
  <input
    type="text"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full px-3 py-2 border rounded"
    placeholder="Enter your phone number"
  />
</div>
            {cart.length === 0 ? (
              <p className="text-black">Your cart is empty.</p>
            ) : (
              <>
                                <ul className="mb-4">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2 text-black"
                    >
                      <span>
                        {item.name} (Size: {item.size})
                      </span>
                      <div className="flex items-center gap-2">
                        <span>E{item.price}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-black mb-4">
                  Total: E{totalPrice}
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-[#C1A85E] text-black font-bold px-4 py-2 rounded w-full mb-2"
                >
                  Checkout via PayFast
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-gray-400 text-black font-bold px-4 py-2 rounded w-full"
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setViewProduct(null)}
              className="absolute top-2 right-2 text-black font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#C1A85E]">
              {viewProduct.name}
            </h2>
            <img
              src={viewProduct.imageUrl}
              alt={viewProduct.name}
              className="w-full h-72 object-contain rounded mb-4"
            />
            <p className="text-[#C1A85E] font-bold mb-2">
              Size: {viewProduct.size}
            </p>
            <p className="text-[#C1A85E] font-bold">
              Price: E{viewProduct.price}
            </p>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="relative bg-black text-center py-10 border-t border-gray-800 mt-12">
        <img
          src="https://i.ibb.co/V01Z2MNC/Whats-App-Image-2025-09-05-at-17-26-07-1.jpg"
          alt="Mbabane Highlanders Logo"
          className="mx-auto mb-4 w-36 h-36 object-contain"
        />
        <p className="text-gray-500 text-sm mt-2">
          © 2025 Mbabane Highlanders | Privacy
        </p>
      </footer>

      {/* Animations */}
      <style>{`
        *:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        @keyframes roundMotion {
          0% { transform: translate(0px, 0px); }
          25% { transform: translate(15px, -15px); }
          50% { transform: translate(0px, -30px); }
          75% { transform: translate(-15px, -15px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-round-motion {
          animation: roundMotion 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}