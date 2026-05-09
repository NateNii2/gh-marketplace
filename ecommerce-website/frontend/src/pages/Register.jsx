import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      await registerUser({
        name,
        email,
        phone,
        password,
      });

      setMessage(
        "✅ OTP sent successfully"
      );

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { phone },
        });
      }, 1000);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT */}

        <div className="hidden lg:flex relative">

          <img
            src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1200&auto=format&fit=crop"
            alt="shopping"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 p-12 flex flex-col justify-end text-white">

            <h1 className="text-5xl font-bold">
              Join GH Marketplace
            </h1>

            <p className="mt-4 text-gray-200 text-lg">
              Buy phones, gadgets, accessories, perfumes and more.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-8 md:p-14 flex items-center">

          <div className="w-full max-w-md mx-auto">

            <h2 className="text-4xl font-bold">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Start shopping today
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
                className="w-full px-4 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="w-full px-4 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                className="w-full px-4 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="233XXXXXXXXX"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              <input
                type="password"
                className="w-full px-4 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button className="w-full py-4 bg-black text-white rounded-2xl hover:opacity-90 transition font-semibold">
                Create Account
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-600">

              Already have an account?{" "}

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="font-semibold text-black"
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}