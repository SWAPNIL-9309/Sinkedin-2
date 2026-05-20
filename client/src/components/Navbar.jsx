import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  let user = null;

  try {

    const storedUser = localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      user = JSON.parse(storedUser);
    }

  } catch (error) {

    console.log("Invalid user data in localStorage");

    localStorage.removeItem("user");
  }

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="bg-zinc-900 text-white p-5 flex flex-col md:flex-row justify-between items-center gap-4">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-purple-400"
      >
        SinkedIn
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-5">

        <Link
          to="/"
          className="hover:text-purple-400"
        >
          Home
        </Link>

        <Link
          to="/create"
          className="hover:text-purple-400"
        >
          Create
        </Link>

        <Link
          to="/profile"
          className="hover:text-purple-400"
        >
          Profile
        </Link>

        {/* Username */}
        {
          user && (

            <p className="text-purple-400">
              {user.username}
            </p>
          )
        }

        {/* Login / Logout */}
        {
          user ? (

            <button
              onClick={handleLogout}
              className="bg-purple-600 px-4 py-2 rounded"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="bg-purple-600 px-4 py-2 rounded"
            >
              Login
            </Link>
          )
        }

      </div>

    </div>
  );
}

export default Navbar;  