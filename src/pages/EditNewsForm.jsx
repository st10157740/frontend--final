import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";

export default function EditNewsForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [news, setNews] = useState({
    title: "",
    link: "",
    imageFile: null,
    existingImage: ""
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${BASE}/api/news/${id}`);
        setNews({
          title: res.data.title,
          link: res.data.link,
          imageFile: null,
          existingImage: res.data.imageFileName
        });
      } catch (err) {
        console.error("❌ Failed to fetch news:", err.response?.data || err);
        alert("Failed to load news item.");
        navigate("/admin");
      }
    };

    fetchNews();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNews((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setNews((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("Title", news.title);
      formData.append("Link", news.link);
      if (news.imageFile) {
        formData.append("ImageFile", news.imageFile);
      }

      await axios.put(`${BASE}/api/news/update/${id}`, formData);
      alert("News updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Failed to update news:", err.response?.data || err);
      alert("Failed to update news. Check console.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-[#BFA76F] p-6">
      <h1 className="text-2xl font-bold mb-4">Edit News Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" encType="multipart/form-data">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={news.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Link</label>
          <input
            type="url"
            name="link"
            value={news.link}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#1A1F3A] text-[#BFA76F] border border-[#BFA76F]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Current Image</label>
          {news.existingImage ? (
            <img src={news.existingImage} alt="Current" className="h-20 rounded shadow" />
          ) : (
            <span className="italic text-gray-400">No image uploaded</span>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Replace Image</label>
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
            ✏️ Update News
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