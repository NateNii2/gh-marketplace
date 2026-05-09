import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/authApi";
import { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const submit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const data = await loginUser({
        email,
        password,
      });

      login(data);

      navigate(redirectTo);

    } catch (err) {

      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );

      /* =================================
         SHOW EXACT BACKEND ERROR
      ================================= */

      const backendMessage =
        err.response?.data?.message;

      if (
        backendMessage &&
        typeof backendMessage === "string"
      ) {

        setError(backendMessage);

      } else {

        setError(
          "Unable to login right now. Please try again."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-2xl">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="hidden lg:flex relative bg-black text-white p-12 flex-col justify-between overflow-hidden">

          {/* BACKGROUND IMAGE */}

          <div className="absolute inset-0">

            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop"
              alt="shopping"
              className="w-full h-full object-cover opacity-30"
            />

          </div>

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/10">

              <span>🛍️</span>

              <span>
                GH Marketplace
              </span>

            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight">

              Shop smarter
              <br />
              across Ghana

            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-md">

              Access top gadgets, gaming consoles,
              phones, accessories and more from trusted sellers.

            </p>

          </div>

          {/* CARDS */}

          <div className="relative z-10 grid grid-cols-2 gap-4">

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

              <div className="text-3xl">
                📱
              </div>

              <h3 className="mt-4 font-semibold">
                Latest Devices
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Smartphones, tablets and accessories
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

              <div className="text-3xl">
                🎮
              </div>

              <h3 className="mt-4 font-semibold">
                Gaming Gear
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                Consoles, games and gaming accessories
              </p>

            </div>

          </div>

        </div>

        {/* =================================
            RIGHT SIDE
        ================================= */}

        <div className="flex items-center justify-center p-8 md:p-14">

          <div className="w-full max-w-md">

            {/* HEADER */}

            <div className="mb-10">

              <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-3xl shadow-lg">

                🔐

              </div>

              <h2 className="mt-6 text-4xl font-bold text-gray-900">

                Welcome Back

              </h2>

              <p className="mt-3 text-gray-500">

                Login securely to continue shopping

              </p>

            </div>

            {/* ERROR */}

            {error && (

              <div className="mb-6 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm leading-relaxed">

                {error}

              </div>

            )}

            {/* FORM */}

            <form
              onSubmit={submit}
              className="space-y-6"
            >

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-gray-700">

                  Email Address

                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full mt-2 px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition"
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700">

                  Password

                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full mt-2 px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition"
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 transition font-semibold text-black disabled:opacity-60"
              >

                {loading
                  ? "Logging in..."
                  : "Login"}

              </button>

            </form>

            {/* REGISTER */}

            <div className="mt-8 text-center text-sm text-gray-600">

              Don't have an account?{" "}

              <button
                onClick={() =>
                  navigate("/register")
                }
                className="font-semibold text-black hover:underline"
              >

                Create one

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;