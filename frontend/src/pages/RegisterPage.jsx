import useTitle from "../hooks/useTitle";
import RegisterForm from "../components/RegisterPage/RegisterForm";
import Header from "../components/RegisterPage/Header";
import logo from "../assets/gymnation-logo.png";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  useTitle("Register | GymNation");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp > currentTime) {
          navigate("/dashboard");
        } else {
          console.log("Token has expired");
        }
      } catch (error) {
        console.log("Invalid token:", error);
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 lg:bg-gray-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <img
        className="mx-auto h-20 scale-150 w-auto"
        src={logo}
        alt="GymNation Logo"
      />

      <Header />
      <div className="px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
