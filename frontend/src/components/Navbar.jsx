import { Link } from "react-router-dom";
import logo from "../assets/gymnation-logo.png";

const Navbar = () => {
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
              to="/login"
              className="text-gray-700 hover:text-gray-950 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;