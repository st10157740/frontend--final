import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-black text-[#C1A85E] flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6 text-center">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <Link
        to="/shop"
        className="bg-[#C1A85E] text-black font-bold px-6 py-3 rounded hover:bg-[#e0c97a] transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}