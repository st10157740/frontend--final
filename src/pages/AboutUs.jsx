// src/pages/AboutUs.jsx
import React, { useEffect } from "react";

export default function AboutUs() {
  const timelineEvents = [
    {
      year: "1952",
      title: "Founded",
      description:
        "Mbabane Highlanders F.C. was established in 1952 in Mbabane, the capital of Eswatini. Known as 'The Black Bull', the club was founded to unite local football enthusiasts and provide a structured platform for talented players. From the very beginning, the club fostered a sense of community pride, teamwork, and dedication, quickly becoming a symbol of resilience and ambition in Eswatini's football scene.",
    },
    {
      year: "1960s",
      title: "Early League Success",
      description:
        "During the 1960s, Highlanders began competing in national leagues and cup competitions, steadily establishing themselves as a dominant force. The club cultivated local talent, producing players who became household names, while fans flocked to matches, igniting a passionate supporter culture. This period laid the foundation for the club’s long-standing tradition of excellence.",
    },
    {
      year: "1970s - 1980s",
      title: "Golden Era",
      description:
        "The 1970s and 1980s are widely celebrated as the 'Golden Era' of Highlanders football. The club captured multiple league titles and domestic cups, demonstrating tactical brilliance, disciplined training, and unmatched team spirit. Legendary players emerged during this period, and the club’s influence extended beyond football, inspiring community pride and cultivating a rich sporting culture in Eswatini.",
    },
    {
      year: "1990s",
      title: "Community Engagement & Youth Development",
      description:
        "Recognizing the power of football to transform lives, Highlanders launched extensive community programs in the 1990s. Youth academies were established, offering training, mentorship, and educational support. The club organized local football festivals, skill workshops, and outreach initiatives, providing young players with opportunities to develop both on and off the field. These efforts solidified Highlanders’ reputation as a club dedicated to holistic development.",
    },
    {
      year: "2000s",
      title: "Regional Recognition & Competitive Expansion",
      description:
        "Highlanders expanded their presence beyond Eswatini, participating in regional tournaments and gaining recognition in Southern Africa. The club’s professionalism, disciplined approach, and strong team performances attracted attention from sponsors, fans, and aspiring footballers. Highlanders became a beacon of football excellence in the region, while continuing to nurture homegrown talent and maintain strong community ties.",
    },
    {
      year: "2025",
      title: "New Ownership & Future Legacy",
      description:
        "In 2025, South African businesswoman Shauwn 'MaMkhize' Mkhize took ownership of the club, ushering in a new era of professional management and strategic development. Under her leadership, Highlanders enhanced training facilities, strengthened youth and community programs, and reinforced their competitive edge in domestic leagues. The club continues to honor its rich heritage while innovating for the future, ensuring that 'The Black Bull' remains a symbol of pride, ambition, and excellence in Eswatini football.",
    },
  ];

  const backgroundImage = "https://i.ibb.co/wFLGDxSs/Banner-1.png"; // your background image
  const mutedGold = "#BFA76F";

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-slide");
    const handleScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-16 px-6 md:px-12 font-sans text-gray-900 min-h-screen bg-cover bg-center">
      {/* Background image with reduced brightness */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "brightness(50%)",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: mutedGold }}>
            About Mbabane Highlanders F.C.
          </h1>
          <p className="text-lg md:text-xl text-white font-bold drop-shadow-md">
            Mbabane Highlanders F.C., nicknamed 'The Black Bull', is one of Eswatini's most historic and successful football clubs. Since 1952, the club has built a legacy of sporting excellence, community engagement, and youth development. From legendary players to devoted fans, Highlanders continue to inspire passion, pride, and progress throughout Eswatini and beyond.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-amber-700 ml-12">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="mb-16 ml-12 relative fade-slide opacity-0 transform translate-x-[-50px] transition-all duration-700 delay-[50ms]"
            >
              <span className="absolute -left-12 flex items-center justify-center w-16 h-16 rounded-full bg-amber-700 text-white font-bold shadow-lg text-sm md:text-base">
                {event.year}
              </span>
              <h3 className="text-2xl font-bold mb-2 ml-4" style={{ color: mutedGold }}>
                {event.title}
              </h3>
              <p className="text-white font-bold text-base leading-relaxed ml-4 drop-shadow-md">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="bg-black text-center py-10 border-t border-gray-800 mt-20">
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

      {/* Inline CSS for scroll animation */}
      <style>
        {`
          .fade-slide {
            opacity: 0;
            transform: translateX(-50px);
          }
          .fade-slide.visible {
            opacity: 1;
            transform: translateX(0);
            transition: all 0.7s ease-out;
          }
        `}
      </style>
    </section>
  );
}
