import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";

export default function AddProductForm() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    color: "",
    price: "",
    imageFile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setProduct((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("Name", product.name);
      formData.append("Color", product.color);
      formData.append("Price", product.price);
      if (product.imageFile) {
        formData.append("ImageFile", product.imageFile);
      }

      console.log("Sending product payload:", formData);
      await axios.post(`${BASE}/api/products/add-product`, formData);
      alert("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Failed to add product:", err.response?.data || err);
      alert("Failed to add product. Check console.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-[#BFA76F] p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" encType="multipart/form-data">
        <div>
          <label className="block text-sm mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Color</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Product Image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-[#BFA76F] text-black font-bold px-4 py-2 rounded shadow"
          >
            ➕ Add Product
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded shadow"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}