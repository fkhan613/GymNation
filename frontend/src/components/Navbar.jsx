import { Link } from "react-router-dom";
import logo from "../assets/gymnation-logo.png";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Link to="/">
              <img className="h-16 w-auto" src={logo} alt="GymNation Logo" />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4">
            <Link
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-100 text-sm "
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;