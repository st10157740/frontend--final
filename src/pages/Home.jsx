// src/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Hero images slideshow
  const heroImages = [
    "https://i.ibb.co/1GCVdgn6/mbabane-home-2.png",
    "https://i.ibb.co/mFVtTMnH/Whats-App-Image-2025-10-27-at-10-31-04.jpg",
  ];
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(heroInterval);
  }, [heroImages.length]);

  const sponsors = [
    {
      img: "https://i.ibb.co/Xx3qGhdP/zikhulise-group.png",
      link: "https://zikhulise.com/",
    },
    {
      img: "https://i.ibb.co/DfpCjqb7/Whats-App-Image-2025-10-03-at-10-09-35.jpg",
      link: "https://b2bhint.com/en/company/za/ewall-communications--K2014221338",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sponsorInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 5000);
    return () => clearInterval(sponsorInterval);
  }, [sponsors.length]);

  const features = [
    {
      icon: "🛡️",
      title: "Digital Membership",
      desc: "Secure digital membership cards with instant delivery",
      link: "/membership",
    },
    {
      icon: "👥",
      title: "Fan Zone",
      desc: "Exclusive content, polls, and community interaction",
      link: "/fanzone",
    },
    {
      icon: "📅",
      title: "Match Info",
      desc: "Real-time fixtures, results, and matchday information",
      link: "/fixture",
    },
    {
      icon: "🏆",
      title: "Official Store",
      desc: "Authentic merchandise and match tickets",
      link: "/shop",
    },
  ];

  const mutedGold = "#BFA76F";

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-center"
        style={{ height: "125vh" }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-2000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentHero * 100}%)` }}
          >
            {heroImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Hero ${index + 1}`}
                className="flex-shrink-0 w-full h-full object-cover brightness-110"
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Background Section (applies to everything below hero) */}
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url('https://i.ibb.co/wFLGDxSs/Banner-1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* CTA Section */}
        <section className="py-40 px-4 relative z-10">
          <div className="container mx-auto text-center max-w-3xl">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: mutedGold }}
            >
              Ready to Join the Digital Revolution?
            </h2>
            <p
              className="text-xl md:text-2xl mb-8"
              style={{ color: "#D1D5DB" }}
            >
              Become part of Eswatini's most forward-thinking football club.
              Get your digital membership today.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-6 flex-wrap">
              <button
                onClick={() => navigate("/membership")}
                className="bg-black text-black px-6 py-3 font-semibold rounded-md border-2 border-black transition"
                style={{
                  borderColor: mutedGold,
                  color: mutedGold,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mutedGold;
                  e.currentTarget.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "black";
                  e.currentTarget.style.color = mutedGold;
                }}
              >
                🛡️ Get Digital Membership
              </button>
              <button
                onClick={() => navigate("/about")}
                className="bg-black text-black px-6 py-3 font-semibold rounded-md border-2 border-black transition"
                style={{
                  borderColor: mutedGold,
                  color: mutedGold,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mutedGold;
                  e.currentTarget.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "black";
                  e.currentTarget.style.color = mutedGold;
                }}
              >
                ℹ️ About Us
              </button>
            </div>

            {/* Sponsors Slideshow */}
            <div className="mt-20">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: mutedGold }}
              >
                Sponsors
              </h2>
              <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg h-40 md:h-64">
                <div
                  className="flex transition-transform duration-2000 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {sponsors.map((sponsor, index) => (
                    <a
                      key={index}
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-full h-full"
                    >
                      <img
                        src={sponsor.img}
                        alt={`Sponsor ${index + 1}`}
                        className="w-full h-full object-contain p-4 bg-black/80"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 -mt-20">
          <div className="container mx-auto text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: mutedGold }}
            >
              Digital Football Experience
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#D1D5DB" }}
            >
              Modern technology meets traditional football passion. Experience
              the future of supporter engagement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.link)}
                className="p-6 text-center rounded-lg transition hover:border-2 cursor-pointer"
                style={{
                  backgroundColor: "#1F1F1F",
                  border: `2px solid rgba(191,167,111,0.2)`,
                }}
              >
                <div
                  style={{
                    color: mutedGold,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    color: mutedGold,
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#D1D5DB" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/90 text-center py-10 border-t border-gray-800">
          <img
            src="https://i.ibb.co/V01Z2MNC/Whats-App-Image-2025-09-05-at-17-26-07-1.jpg"
            alt="Mbabane Highlanders Logo"
            className="mx-auto mb-4 w-36 h-36 object-contain"
          />
          <p className="text-sm mt-2" style={{ color: mutedGold }}>
            © 2025 Mbabane Highlanders | Privacy
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
