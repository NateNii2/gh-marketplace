import { useState } from "react";
import axios from "../../api/axios";

const NewsletterCTA = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubscribe = async () => {
    if (!phone.trim()) {
      setMessage("Enter a phone number");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/newsletter/subscribe", { phone });

      setMessage(data.message);
      setPhone("");

    } catch (err) {
      console.error(err);
      setMessage("Subscription failed");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 mt-16 md:mt-24">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl p-6 md:p-14 text-center text-white">

        <h2 className="text-xl md:text-3xl font-semibold">
          Get Updates via SMS
        </h2>

        <p className="mt-2 opacity-90 text-sm md:text-base max-w-xl mx-auto">
          Get notified instantly about price drops, flash deals, new products,
          and restocks.
        </p>

        {/* INPUT */}
        <div className="mt-6 flex justify-center">
          <div className="flex flex-col sm:flex-row bg-white rounded-xl sm:rounded-full overflow-hidden w-full max-w-lg">

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="flex-1 px-5 py-3 text-black outline-none text-sm"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-yellow-400 px-6 py-3 text-sm font-medium hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-sm">{message}</p>
        )}

        <p className="mt-4 text-xs md:text-sm opacity-80">
          You’ll receive updates every 2 weeks. No spam.
        </p>

      </div>
    </section>
  );
};

export default NewsletterCTA;