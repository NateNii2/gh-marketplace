import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Search, MoreVertical } from "lucide-react";

const AdminUsers = () => {

  const { token } = useAuth();

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState(null);

  const [activeMenu, setActiveMenu] = useState(null);

  const [search, setSearch] = useState("");

  const showMessage = (text, type = "success") => {

    setMessage({ text, type });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  /* ==================================================
     ROLE CHECK
  ================================================== */

  const isUserAdmin = (user) =>
    user.isAdmin === true ||
    user.role === "admin";

  /* ==================================================
     LOAD USERS
  ================================================== */

  const loadUsers = async () => {

    try {

      const res = await axios.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch {

      showMessage(
        "Failed to load users",
        "error"
      );
    }
  };

  useEffect(() => {

    if (token) {
      loadUsers();
    }

  }, [token]);

  /* ==================================================
     TOGGLE ADMIN
  ================================================== */

  const toggleAdmin = async (user) => {

    const currentlyAdmin =
      isUserAdmin(user);

    try {

      await axios.put(
        `/admin/users/${user._id}`,
        {
          isAdmin: !currentlyAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? {
                ...u,
                isAdmin: !currentlyAdmin,
                role: !currentlyAdmin
                  ? "admin"
                  : "user",
              }
            : u
        )
      );

      showMessage("Role updated");

    } catch {

      showMessage(
        "Update failed",
        "error"
      );
    }
  };

  /* ==================================================
     DELETE USER
  ================================================== */

  const deleteUser = async (id) => {

    if (
      !window.confirm(
        "Delete this user?"
      )
    ) {
      return;
    }

    try {

      await axios.delete(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.filter(
          (u) => u._id !== id
        )
      );

      showMessage("User deleted");

    } catch {

      showMessage(
        "Delete failed",
        "error"
      );
    }
  };

  /* ==================================================
     SEARCH
  ================================================== */

  const filteredUsers =
    users.filter((u) => {

      const q =
        search.toLowerCase();

      return (
        u.name
          ?.toLowerCase()
          .includes(q) ||
        u.email
          ?.toLowerCase()
          .includes(q)
      );
    });

  /* ==================================================
     UI
  ================================================== */

  return (

    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-6 overflow-visible">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl md:text-3xl font-semibold">
          Users
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage customers and admins
        </p>

      </div>

      {/* MESSAGE */}

      {message && (

        <div
          className={`p-3 rounded-xl text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>

      )}

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between md:items-center">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center text-lg">

            👥

          </div>

          <div>

            <p className="font-semibold">
              {users.length.toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">
              Total Users
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="flex items-center gap-3 w-full md:w-auto">

          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 w-full md:w-80">

            <Search
              size={16}
              className="text-gray-400"
            />

            <input
              placeholder="Search users..."
              className="bg-transparent outline-none px-2 w-full text-sm"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </div>

      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="bg-white rounded-2xl shadow-sm overflow-visible">

        {/* TABS */}

        <div className="flex gap-6 px-6 pt-4 border-b text-sm">

          <button className="border-b-2 border-yellow-500 pb-2 font-medium">

            All Users

          </button>

          <button className="text-gray-500">

            Admins

          </button>

          <button className="text-gray-500">

            Customers

          </button>

        </div>

        {/* TABLE HEADER */}

        <div className="hidden md:grid grid-cols-4 px-6 py-4 border-b text-sm text-gray-500">

          <span>User</span>

          <span>Email</span>

          <span>Role</span>

          <span className="text-right">
            Actions
          </span>

        </div>

        {/* USERS */}

        <div className="overflow-visible">

          {filteredUsers.map((user, index) => {

            const admin =
              isUserAdmin(user);

            const isLastItems =
              index >=
              filteredUsers.length - 2;

            return (

              <div
                key={user._id}
                className="grid md:grid-cols-4 gap-4 px-6 py-4 border-b items-center relative overflow-visible"
              >

                {/* USER */}

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-semibold">

                    {user.name
                      ?.charAt(0)
                      ?.toUpperCase()}

                  </div>

                  <div>

                    <p className="font-medium">
                      {user.name}
                    </p>

                    <span
                      className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                        admin
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {admin
                        ? "Admin"
                        : "Customer"}

                    </span>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="text-sm text-gray-600 break-all">

                  {user.email}

                </div>

                {/* ROLE */}

                <div className="text-sm font-medium">

                  {admin
                    ? "Admin"
                    : "Customer"}

                </div>

                {/* ACTIONS */}

                <div className="flex justify-end relative overflow-visible">

                  <button
                    onClick={() =>
                      setActiveMenu(
                        activeMenu ===
                          user._id
                          ? null
                          : user._id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >

                    <MoreVertical size={18} />

                  </button>

                  {activeMenu ===
                    user._id && (

                    <div
                      className={`absolute right-0 w-52 bg-white border rounded-2xl shadow-2xl z-[9999] py-2 ${
                        isLastItems
                          ? "bottom-12"
                          : "top-12"
                      }`}
                    >

                      <button
                        onClick={() => {

                          toggleAdmin(
                            user
                          );

                          setActiveMenu(
                            null
                          );
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition"
                      >

                        {admin
                          ? "Demote to Customer"
                          : "Promote to Admin"}

                      </button>

                      <button
                        onClick={() => {

                          deleteUser(
                            user._id
                          );

                          setActiveMenu(
                            null
                          );
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                      >

                        Delete User

                      </button>

                    </div>

                  )}

                </div>

              </div>
            );
          })}

        </div>

        {/* EMPTY */}

        {filteredUsers.length ===
          0 && (

          <div className="p-10 text-center text-gray-500">

            No users found

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminUsers;