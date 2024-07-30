import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create your account
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w">
      Or
      <Link
        to="/login"
        className="ml-1 font-medium text-blue-600 hover:text-blue-500"
      >
        log into your account
      </Link>
    </p>
  </div>
);

export default Header;
