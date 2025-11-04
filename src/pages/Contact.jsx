import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [contactData, setContactData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    InquiryType: "",
    Subject: "",
    Message: "",
    IsResolved: false,
    CreatedAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = (e) => {
    e.preventDefault();

    axios
      .post("https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/api/Contacts", contactData)
      .then(() => {
        alert("Contact submitted successfully!");
        setContactData({
          FullName: "",
          Email: "",
          PhoneNumber: "",
          InquiryType: "",
          Subject: "",
          Message: "",
          IsResolved: false,
          CreatedAt: new Date().toISOString(),
        });
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("Failed to submit contact.");
      });
  };

  const mutedGold = "#BFA76F";

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/wFLGDxSs/Banner-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for background */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Center Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-12">
        <div className={`bg-black bg-opacity-95 border rounded-lg shadow-lg max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8`} style={{ borderColor: mutedGold }}>
          {/* Left Section: Contact Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: mutedGold }}>Get in Touch</h1>
            <p className="text-sm" style={{ color: mutedGold }}>
              Have questions about membership, need technical support, or want
              to learn more about Mbabane Highlanders AM? We're here to help!
            </p>

            {/* Email Us */}
            <div className="bg-black rounded-lg p-4 space-y-2" style={{ border: `1px solid ${mutedGold}` }}>
              <h2 className="text-lg font-semibold" style={{ color: mutedGold }}>📧 Email Us</h2>
              <p className="text-sm" style={{ color: mutedGold }}>
                Send us a message and we'll respond promptly
              </p>
              <p className="text-white text-sm">info@mbabane-highlanders.com</p>
              <p className="text-white text-sm">membership@mbabane-highlanders.com</p>
            </div>

            {/* Call Us */}
            <div className="bg-black rounded-lg p-4 space-y-2" style={{ border: `1px solid ${mutedGold}` }}>
              <h2 className="text-lg font-semibold" style={{ color: mutedGold }}>📞 Call Us</h2>
              <p className="text-sm" style={{ color: mutedGold }}>
                Speak directly with our team
              </p>
              <p className="text-white text-sm">+268 7931 3293</p>
             
            </div>

            {/* Visit Us */}
            <div className="bg-black rounded-lg p-4 space-y-2" style={{ border: `1px solid ${mutedGold}` }}>
              <h2 className="text-lg font-semibold" style={{ color: mutedGold }}>📍 Visit Us</h2>
              <p className="text-sm" style={{ color: mutedGold }}>Come to our headquarters</p>
              <p className="text-white text-sm">Mavuso Sports Centre</p>
              <p className="text-white text-sm">Mbabane, Eswatini</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.913392468094!2d31.138415415225193!3d-26.319732983491203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee4fd5c8c5b0e6d%3A0x981a06e3c112d84d!2sMavuso%20Sports%20Centre!5e0!3m2!1sen!2szw!4v1695738750000!5m2!1sen!2szw"
                width="100%"
                height="150"
                className="rounded"
                allowFullScreen=""
                loading="lazy"
                title="Mavuso Sports Centre Map"
              ></iframe>
            </div>

            {/* Office Hours */}
            <div className="bg-black rounded-lg p-4 space-y-2" style={{ border: `1px solid ${mutedGold}` }}>
              <h2 className="text-lg font-semibold" style={{ color: mutedGold }}>🕒 Office Hours</h2>
              <p className="text-sm" style={{ color: mutedGold }}>When you can reach us</p>
              <p className="text-white text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-white text-sm">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-white text-sm">Sunday: Closed</p>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: mutedGold }}>Send us a Message</h2>
            <p className="text-sm" style={{ color: mutedGold }}>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form onSubmit={submitContact} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Full Name *</label>
                <input
                  type="text"
                  name="FullName"
                  value={contactData.FullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email Address *</label>
                <input
                  type="email"
                  name="Email"
                  value={contactData.Email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  value={contactData.PhoneNumber}
                  onChange={handleChange}
                  placeholder="+268 XXXX XXXX"
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Inquiry Type *</label>
                <select
                  value={contactData.InquiryType}
                  name="InquiryType"
                  onChange={handleChange}
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                >
                  <option>Select inquiry type</option>
                  <option>Membership</option>
                  <option>Technical Support</option>
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Subject *</label>
                <input
                  type="text"
                  name="Subject"
                  placeholder="Brief subject line"
                  value={contactData.Subject}
                  onChange={handleChange}
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message *</label>
                <textarea
                  rows="4"
                  placeholder="Please provide details about your inquiry..."
                  name="Message"
                  value={contactData.Message}
                  onChange={handleChange}
                  className="w-full bg-black text-white px-4 py-2 rounded"
                  style={{ border: `1px solid ${mutedGold}` }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-black font-bold px-6 py-2 rounded hover:bg-[#E0C250] transition flex items-center gap-2"
                style={{ backgroundColor: mutedGold }}
              >
                📨 Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-center py-10 border-t border-gray-800">
        <img
          src="https://i.ibb.co/V01Z2MNC/Whats-App-Image-2025-09-05-at-17-26-07-1.jpg"
          alt="Mbabane Highlanders Logo"
          className="mx-auto mb-4 w-36 h-36 object-contain"
        />
        <p className="text-gray-500 text-sm mt-2">
          © 2025 Mbabane Highlanders | Privacy
        </p>
      </footer>
    </div>
  );
};

export default Contact;
