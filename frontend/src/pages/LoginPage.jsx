import logo from "../assets/gymnation-logo.png";
import LoginForm from "../components/LoginPage/LoginForm";
import Header from "../components/LoginPage/Header";
import useTitle from "../hooks/useTitle";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  useTitle("Login | GymNation");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newAccount = params.get("register");
    if (newAccount === "success") {
      toast.success("Account created successfully.");

      // Clear the message from the URL
      params.delete("register");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 lg:bg-gray-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <img
        className="mx-auto h-20 scale-150 w-auto"
        src={logo}
        alt="GymNation Logo"
      />
      <Header />
      <div className="px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
