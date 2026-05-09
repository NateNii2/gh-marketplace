import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow text-center space-y-6">

        {/* ICON */}
        <div className="flex justify-center">
          <XCircle size={60} className="text-red-500" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-semibold text-red-500">
          Payment Failed
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm md:text-base">
          Something went wrong while processing your payment.
          Don’t worry — no money was deducted.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">

          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition"
          >
            Go Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default Failed;