import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Menu,
  X,
  Home,
} from "lucide-react";

import { useState } from "react";

const AdminLayout = () => {
  const [open, setOpen] =
    useState(false);

  const navigate =
    useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f9fafb] text-black overflow-x-hidden">

      {/* MOBILE OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() =>
              setOpen(false)
            }
          />

          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-xl p-5 animate-slideIn overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">
                Admin Panel
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                <X size={22} />
              </button>
            </div>

            <button
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
              className="w-full mb-5 bg-black text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Homepage
            </button>

            <nav className="space-y-2">
              <AdminLink
                to="/admin"
                onClick={() =>
                  setOpen(false)
                }
                icon={
                  <LayoutDashboard size={18} />
                }
              >
                Dashboard
              </AdminLink>

              <AdminLink
                to="/admin/users"
                onClick={() =>
                  setOpen(false)
                }
                icon={<Users size={18} />}
              >
                Users
              </AdminLink>

              <AdminLink
                to="/admin/orders"
                onClick={() =>
                  setOpen(false)
                }
                icon={
                  <ShoppingCart size={18} />
                }
              >
                Orders
              </AdminLink>

              <AdminLink
                to="/admin/products"
                onClick={() =>
                  setOpen(false)
                }
                icon={
                  <Package size={18} />
                }
              >
                Products
              </AdminLink>
            </nav>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-64 border-r bg-white">

        <div className="p-6 border-b">
          <h2 className="font-semibold text-lg">
            Admin Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          <AdminLink
            to="/admin"
            icon={
              <LayoutDashboard size={18} />
            }
          >
            Dashboard
          </AdminLink>

          <AdminLink
            to="/admin/users"
            icon={<Users size={18} />}
          >
            Users
          </AdminLink>

          <AdminLink
            to="/admin/orders"
            icon={
              <ShoppingCart size={18} />
            }
          >
            Orders
          </AdminLink>

          <AdminLink
            to="/admin/products"
            icon={
              <Package size={18} />
            }
          >
            Products
          </AdminLink>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOPBAR */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40">

          <button
            onClick={() =>
              setOpen(true)
            }
          >
            <Menu size={24} />
          </button>

          <h1 className="font-semibold">
            Admin
          </h1>

          <button
            onClick={() =>
              navigate("/")
            }
            className="text-xs bg-black text-white px-3 py-2 rounded-lg"
          >
            Home
          </button>
        </div>

        {/* PAGE */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <style>
        {`
          .animate-slideIn {
            animation: slideIn 0.25s ease-out;
          }

          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const AdminLink = ({
  to,
  icon,
  children,
  onClick,
}) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
        isActive
          ? "bg-black text-white"
          : "hover:bg-gray-100 text-gray-700"
      }`
    }
  >
    {icon}
    {children}
  </NavLink>
);

export default AdminLayout;