import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AppLayout = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
    }

    try {
      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        navigate("/login");
      }
    } catch (error) {
      console.log("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
