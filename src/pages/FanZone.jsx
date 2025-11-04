import React, { useState, useEffect } from "react";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";

export default function FanZone() {
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const mutedGold = "#BFA76F";

  const galleryImages = [
    "https://i.ibb.co/TxNxL3VH/007ce5d8-2d13-4011-9cbd-eeda4b7c9d37.jpg",
    "https://i.ibb.co/C3KzP79N/M2-OW5-IFYWVLFVKD3-DOD57-ZOKFA.jpg",
    "https://i.ibb.co/yBbbpVhQ/download.jpg",
    "https://i.ibb.co/VW6NMD4X/Gr-A9-KZs-Xk-AAuwe-C.jpg",
    "https://i.ibb.co/MDRs8TDz/Whats-App-Image-2025-10-26-at-22-15-24.jpg",
    "https://i.ibb.co/KzNDcFsF/Whats-App-Image-2025-10-26-at-22-15-25.jpg",
    "https://i.ibb.co/JRPNxm4m/Whats-App-Image-2025-10-26-at-22-15-24-1.jpg",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BASE}/api/news`);
        const data = await res.json();
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title,
          link: item.link,
          img: item.imageFileName,
          likes: item.likes || 0,
        }));
        setNews(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch news:", err);
      }
    };

    fetchNews();

    // Auto slideshow
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (id) => {
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const openLightbox = (index) => {
    setCurrentSlide(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        background:
          "url('https://i.ibb.co/wFLGDxSs/Banner-1.png') center/cover no-repeat fixed",
        color: mutedGold,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.85)",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <header style={{ textAlign: "center", padding: "50px 20px" }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", margin: 0 }}>
            ⚽ Mbabane Highlanders Fan Zone
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#eee", marginTop: "10px" }}>
            The official hub for Highlanders supporters
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* News & Video */}
          <div>
            <div
              style={{
                backgroundColor: "rgba(191, 167, 111, 0.1)",
                padding: "20px",
                borderRadius: "20px",
                marginBottom: "40px",
              }}
            >
              <h2 style={{ marginBottom: "20px", fontSize: "1.4rem" }}>
                📰 Latest News
              </h2>
              {news.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#111",
                    marginBottom: "15px",
                    padding: "12px",
                    borderRadius: "15px",
                    width: "100%",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: mutedGold, textDecoration: "none" }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "8px",
                      }}
                    />
                    <h3 style={{ fontSize: "1.1rem", margin: "8px 0" }}>
                      {item.title}
                    </h3>
                  </a>
                  <button
                    onClick={() => handleLike(item.id)}
                    style={{
                      backgroundColor: mutedGold,
                      color: "#000",
                      padding: "6px 14px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    👍 Like ({item.likes})
                  </button>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#111",
                padding: "20px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              <h2
                style={{ fontSize: "1.4rem", marginBottom: "20px", color: mutedGold }}
              >
                🎥 Highlight Video
              </h2>
              <iframe
                width="100%"
                height="340"
                src="https://www.youtube.com/embed/DWdRhnpxRME"
                title="Mbabane Highlanders AM FC"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              ></iframe>
            </div>
          </div>

          {/* Gallery */}
          <div
            style={{
              padding: "15px",
              background: "black",
              borderRadius: "15px",
              border: `3px solid ${mutedGold}`,
              color: "white",
              fontFamily: "Arial, sans-serif",
              height: "fit-content",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: mutedGold, marginBottom: "10px" }}>🖼 Gallery</h2>
            <div
              style={{
                cursor: "pointer",
                borderRadius: "10px",
              }}
              onClick={() => openLightbox(currentSlide)}
            >
              <img
                src={galleryImages[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        {/* Lightbox overlay */}
        {lightboxOpen && (
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              style={{
                position: "absolute",
                left: "20px",
                fontSize: "2rem",
                color: mutedGold,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <img
              src={galleryImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              style={{
                position: "absolute",
                right: "20px",
                fontSize: "2rem",
                color: mutedGold,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              ›
            </button>
          </div>
        )}

        <hr style={{ borderColor: "#444", marginTop: "60px" }} />
        <footer style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>
          <img
            src="https://i.ibb.co/V01Z2MNC/Whats-App-Image-2025-09-05-at-17-26-07-1.jpg"
            alt="Mbabane Highlanders Logo"
            style={{
              display: "block",
              margin: "0 auto 15px auto",
              width: "120px",
              height: "120px",
              objectFit: "contain",
              borderRadius: "50%",
              border: `2px solid ${mutedGold}`,
              boxShadow: "0 0 10px rgba(191, 167, 111, 0.5)",
            }}
          />
          <p style={{ fontSize: "0.9rem" }}>
            © 2025 Mbabane Highlanders Fan Zone | All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
