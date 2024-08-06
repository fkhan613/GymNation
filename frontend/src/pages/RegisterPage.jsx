import useTitle from "../hooks/useTitle";
import RegisterForm from "../components/RegisterPage/RegisterForm";
import Header from "../components/RegisterPage/Header";
import logo from "../assets/gymnation-logo.png";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  useTitle("Register | " + import.meta.env.VITE_APP_NAME);

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
      <motion.img
        className="mx-auto h-28 scale-150 w-auto hover:cursor-pointer"
        src={logo}
        alt="GymNation Logo"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Header />
      </motion.div>
      <motion.div
        className="px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default RegisterPage;
