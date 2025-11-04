import { useState } from "react";
import axios from "axios";

const Membership = () => {
  const membershipData = {
    Supporter: {
      title: "Supporter Membership",
      description: "Annual membership with instant digital card",
      price: "E50 per year.",
    },
    Premium: {
      title: "Premium Membership",
      description: "Includes supporter benefits plus exclusive event access",
      price: "E100 per year.",
    },
    VIP: {
      title: "VIP Membership",
      description: "All benefits plus personal concierge and priority access",
      price: "E150 per year.",
    },
  };

  const [selectedTier, setSelectedTier] = useState("Supporter");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [file, setFile] = useState(null);

  const [memberData, setMemberData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Branch: "",
    MembershipTier: selectedTier,
  });

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "MembershipTier") {
    setSelectedTier(value);
  }

  setMemberData((prev) => ({ ...prev, [name]: value }));
};

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 5 * 1024 * 1024) {
      setFile(selected);
    } else {
      alert("File must be under 5MB.");
    }
  };

  const removeFile = () => setFile(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const formData = new FormData();
    Object.entries(memberData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (file) formData.append("ProofOfPayment", file);

    try {
      const res = await axios.post("https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net/api/Members", formData);
      const redirectUrl = res.data.redirectUrl;
        if (redirectUrl) {
          alert("Registration successful!");
          window.location.href = redirectUrl;
        } else {
          alert("Registration failed:", err);
        }
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="relative flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/wFLGDxSs/Banner-1.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Main content */}
      <div className="relative flex items-center justify-center flex-grow py-8 px-4 w-full">
        <div
          className="bg-black bg-opacity-95 border border-[#BFA76F] p-8 w-full max-w-3xl rounded-md shadow-lg"
          style={{ color: "#BFA76F" }}
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-2xl font-bold">Join Mbabane Highlanders AM</h1>
            <p className="text-xs text-center">
              Complete your registration to get your digital membership card
            </p>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Personal Information */}
            <p className="font-bold mb-2">Personal Information</p>
            <div className="flex flex-col mb-4">
              <label htmlFor="FullName" className="text-xs">
                Full Name *
              </label>
              <input
                type="text"
                name="FullName"
                value={memberData.FullName}
                onChange={handleInputChange}
                className="bg-black border border-[#BFA76F] p-2 rounded"
                style={{ color: "#BFA76F" }}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="Email" className="text-xs">
                Email Address *
              </label>
              <input
                type="email"
                name="Email"
                value={memberData.Email}
                onChange={handleInputChange}
                className="bg-black border border-[#BFA76F] p-2 rounded"
                style={{ color: "#BFA76F" }}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="PhoneNumber" className="text-xs">
                Phone Number *
              </label>
              <input
                type="text"
                name="PhoneNumber"
                value={memberData.PhoneNumber}
                onChange={handleInputChange}
                className="bg-black border border-[#BFA76F] p-2 rounded"
                style={{ color: "#BFA76F" }}
              />
            </div>

            <div className="flex flex-col mb-4">
  <label htmlFor="Branch" className="text-xs">
    Branch *
  </label>
  <select
    name="Branch"
    value={memberData.Branch}
    onChange={handleInputChange}
    className="bg-black border border-[#BFA76F] p-2 rounded"
    style={{ color: "#BFA76F" }}
    required
  >
    <option value="" disabled>
      Select a branch
    </option>
    <option value="Mbabane Branch">Mbabane Branch</option>
    <option value="Manzini Branch">Manzini Branch</option>
    <option value="Siteki Branch">Siteki Branch</option>
    <option value="Nhlangano Branch">Nhlangano Branch</option>
    <option value="Piggs Peak Branch">Piggs Peak Branch</option>
    <option value="Big Bend Branch">Big Bend Branch</option>
    <option value="Online Membership">Online Membership</option>
  </select>
</div>

            {/* Membership Tier */}
            <p className="font-bold mb-2">Select Membership</p>
            <div className="flex flex-col mb-4">
              <label htmlFor="MembershipTier" className="text-xs">
                Membership Tier *
              </label>
              <select
                name="MembershipTier"
                value={memberData.MembershipTier}
                onChange={handleInputChange}
                className="bg-black border border-[#BFA76F] p-2 rounded"
                style={{ color: "#BFA76F" }}
              >
                <option disabled>Select membership tier</option>
                <option value="Supporter">Supporter</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* Membership Info Boxes */}
            <div className="space-y-2 mb-4">
              {Object.entries(membershipData).map(([key, tier]) => (
                <div
                  key={key}
                  className="bg-black p-3 rounded shadow-sm border border-[#BFA76F]"
                  style={{ color: "#BFA76F" }}
                >
                  <h2 className="font-semibold text-sm">{tier.title}</h2>
                  <p className="text-xs">{tier.description}</p>
                  <p className="font-medium text-sm">{tier.price}</p>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div
              className="max-w-xl mx-auto bg-black border border-[#BFA76F] rounded-lg shadow-md p-4 mb-4"
              style={{ color: "#BFA76F" }}
            >
              <h2 className="text-lg font-bold mb-2">Payment Information</h2>
              <ul className="text-sm space-y-1">
                <li>
                  <strong>MTN MoMo:</strong> Send payment to:{" "}
                  <span className="font-medium">76839312</span>
                </li>
                <li>
                  <strong>Bank Transfer:</strong> Account:{" "}
                  <span className="font-medium">6317118911</span> (FNB)
                </li>
                <li>
                  <strong>Account Name:</strong>{" "}
                  <span className="font-medium">MBABANE HIGHLANDERS AM F</span>
                </li>
                <li>
                  <strong>EFT/Online Banking:</strong> Use reference:{" "}
                  <span className="font-medium">
                    Your name + membership tier
                  </span>
                </li>
              </ul>
            </div>

            {/* Proof of Payment */}
            <div
              className="max-w-xl mx-auto bg-black border border-[#BFA76F] rounded-lg shadow-md p-4 mb-4"
              style={{ color: "#BFA76F" }}
            >
              <h2 className="text-lg font-bold mb-2">Proof of Payment</h2>
              {!file ? (
                <label
                  htmlFor="paymentProof"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-[#BFA76F] rounded-md p-4 cursor-pointer hover:border-yellow-400 transition"
                >
                  <span className="text-sm">Click to upload proof of payment</span>
                  <span className="text-xs mt-1">JPEG, PNG, PDF (max 5MB)</span>
                  <input
                    type="file"
                    id="paymentProof"
                    name="ProofOfPayment"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-black border border-[#BFA76F] rounded-md p-2">
                  <p className="text-sm font-medium">{file.name}</p>
                  <button
                    onClick={removeFile}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label htmlFor="terms" className="text-sm">
                I accept the{" "}
                <a href="#" className="font-bold hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-bold hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <input
              type="submit"
              value="Submit Registration"
              className="bg-[#BFA76F] hover:bg-yellow-500 font-bold py-2 px-4 rounded shadow-md w-full cursor-pointer text-black"
            />
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative bg-black text-center py-10 border-t border-[#BFA76F]"
        style={{ color: "#BFA76F" }}
      >
        <img
          src="https://i.ibb.co/V01Z2MNC/Whats-App-Image-2025-09-05-at-17-26-07-1.jpg"
          alt="Mbabane Highlanders Logo"
          className="mx-auto mb-4 w-36 h-36 object-contain"
        />
        <p className="text-sm mt-2">© 2025 Mbabane Highlanders | Privacy</p>
      </footer>
    </div>
  );
};

export default Membership;
