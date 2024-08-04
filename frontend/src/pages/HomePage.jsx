import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useTitle from "../hooks/useTitle";

const HomePage = () => {

  useTitle("Home | GymNation");

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

      if (!(decodedToken.exp > currentTime)) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Invalid token:", error);
    }
  }, [navigate]);

  return <div>HomePage</div>;
};

export default HomePage;
