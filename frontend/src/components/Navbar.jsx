import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <div
      contentEditable={false}
      className="w-full h-16 bg-white border border-black flex items-end px-4 "
    >
      {/* Logo */}
      <Link to="/" className="flex items-end pb-2">
        <img alt="Logo" className="h-10" src={logo} />
      </Link>

      <div className="flex-grow flex justify-end items-end space-x-4 pb-2">
        {user ? (
          <>
            <Link to="/problems" className="text-black hover:text-blue-500">
              <div>Problems</div>
            </Link>
            <Link to="/profile" className="text-black hover:text-blue-500">
              <div>Profile</div>
            </Link>
            <button
              onClick={handleLogout}
              className="text-black hover:text-blue-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black hover:text-blue-500">
              <div>Login</div>
            </Link>
            <Link to="/signup" className="text-black hover:text-blue-500">
              <div>Signup</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
