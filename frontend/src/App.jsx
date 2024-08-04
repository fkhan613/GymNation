import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function App() {

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

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<HomePage />} />
        <Route path="profile/:id" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;