import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* Layout */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Pages */
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import VerifyOtpPage from "./pages/VerifyOtpPage";

/* Admin */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";

/* Guards */
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

let pageTitle = "GH Marketplace";

if (location.pathname.startsWith("/products")) {
  pageTitle = "Products | GH Marketplace";
}

if (location.pathname.startsWith("/cart")) {
  pageTitle = "Cart | GH Marketplace";
}

if (location.pathname.startsWith("/checkout")) {
  pageTitle = "Checkout | GH Marketplace";
}

if (location.pathname.startsWith("/admin")) {
  pageTitle = "Admin Dashboard";
}
export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");



  return (
    <>
  <Helmet>
    <title>{pageTitle}</title>
  </Helmet>
      
    <div className="min-h-screen flex flex-col">
      {/* User Navbar */}
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute ? "flex-1 px-4 md:px-8 py-6 bg-white text-black" : "flex-1"}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          {/* Cart & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Account */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>

          {/* Payment */}
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* User Footer */}
      {!isAdminRoute && <Footer />}
    </div>
    </>
  );
}
