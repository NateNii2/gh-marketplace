import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { verifyOtp } from "../api/authApi";

export default function VerifyOtpPage() {

  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const phone = location.state?.phone;

  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const data = await verifyOtp({
        phone,
        otp,
      });

      setMessage(
        "✅ Phone verified successfully"
      );

      login(data);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
          "OTP verification failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">

        {/* LEFT */}

        <div className="hidden md:flex bg-black text-white p-10 flex-col justify-between relative">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="otp"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="relative z-10">
            <h1 className="text-4xl font-bold">
              Verify Your Account
            </h1>

            <p className="mt-4 text-gray-300">
              Enter the OTP sent to your phone number.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-5 rounded-2xl">
            <p className="text-sm text-gray-200">
              Secure verification helps protect your account and orders.
            </p>
          </div>

        </div>

        {/* RIGHT */}

        <div className="p-8 md:p-12 flex items-center">

          <div className="w-full">

            <h2 className="text-3xl font-bold">
              OTP Verification
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Enter the code sent to {phone}
            </p>

            {message && (
              <div className="mb-5 p-4 rounded-xl bg-green-100 text-green-700 text-sm">
                {message}
              </div>
            )}

            <form
              onSubmit={submitHandler}
              className="space-y-5"
            >

              <input
                className="w-full px-4 py-4 border rounded-2xl text-center tracking-[10px] text-2xl outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                required
              />

              <button className="w-full py-4 bg-yellow-400 rounded-2xl font-semibold hover:bg-yellow-500 transition">
                Verify OTP
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}