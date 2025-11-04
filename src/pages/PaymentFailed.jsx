import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-black text-[#C1A85E] flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Failed</h1>
      <p className="text-lg mb-6 text-center">
        Something went wrong with your payment. Please try again or contact support if the issue persists.
      </p>
      <Link
        to="/shop"
        className="bg-[#C1A85E] text-black font-bold px-6 py-3 rounded hover:bg-[#e0c97a] transition"
      >
        Return to Shop
      </Link>
    </div>
  );
}