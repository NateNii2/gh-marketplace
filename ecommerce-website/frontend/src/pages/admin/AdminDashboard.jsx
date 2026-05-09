import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchDashboardStats } from "../../api/adminApi";
import { Users, Package, ShoppingBag } from "lucide-react";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetchDashboardStats(token)
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  const revenue = stats.revenue || {
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  };

  const bestSellers = stats.bestSellers || [];
  const salesByRegion = stats.salesByRegion || [];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-semibold">
        Welcome Back, Admin
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard icon={<Users />} title="Users" value={stats.users || 0} />

        <StatCard icon={<Package />} title="Products" value={stats.products || 0} />

        <StatCard icon={<ShoppingBag />} title="Orders" value={stats.orders || 0} />

        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-semibold">
            GHS {revenue.total}
          </h2>
          <p className="text-green-600 text-sm mt-2">
            +12.5%
          </p>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* REVENUE + BEST PRODUCT */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm space-y-6">

          <h2 className="text-lg font-semibold">Revenue</h2>

          <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6">

            {/* IMAGE PLACEHOLDER */}
            <div className="w-28 h-28 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-xs text-gray-400">Product</span>
            </div>

            {/* DETAILS */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold">
                {bestSellers[0]?.name || "No Data"}
              </h3>

              <p className="text-gray-500">
                {bestSellers[0]?.totalSold || 0} Sales
              </p>

              <button className="mt-3 px-5 py-2 bg-yellow-400 rounded-lg text-sm font-medium">
                View Details
              </button>
            </div>

          </div>
        </div>

        {/* SALES BY REGION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

          <h2 className="text-lg font-semibold">
            Sales by Region
          </h2>

          <div className="space-y-3">
            {salesByRegion.length === 0 && (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}

            {salesByRegion.map((r) => (
              <div
                key={r._id}
                className="flex justify-between text-sm"
              >
                <span>{r._id || "Unknown"}</span>
                <span>{r.revenue}</span>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-2 border rounded-lg text-sm">
            View Details
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BEST SELLING */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

          <h2 className="text-lg font-semibold">
            Best Selling Product
          </h2>

          {bestSellers.length === 0 ? (
            <p className="text-gray-500 text-sm">No sales yet</p>
          ) : (
            <div className="flex items-center gap-4">

              <div className="w-24 h-24 bg-gray-200 rounded-xl" />

              <div>
                <h3 className="font-medium">
                  {bestSellers[0].name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {bestSellers[0].totalSold} Sales
                </p>
              </div>

            </div>
          )}
        </div>

        {/* REGION SUMMARY */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

          <h2 className="text-lg font-semibold">
            Sales by Region
          </h2>

          {salesByRegion.map((r) => (
            <div key={r._id} className="flex justify-between text-sm">
              <span>{r._id}</span>
              <span>{r.revenue}</span>
            </div>
          ))}

          <button className="mt-4 px-4 py-2 bg-yellow-400 rounded-lg text-sm">
            View Details
          </button>
        </div>

      </div>

    </div>
  );
};

/* =========================
   STAT CARD
========================= */
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">

    <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
      {icon}
    </div>

    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>

  </div>
);

export default AdminDashboard;