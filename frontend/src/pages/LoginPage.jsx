import logo from "../assets/gymnation-logo.png";
import LoginForm from "../components/LoginPage/LoginForm";
import Header from "../components/LoginPage/Header";
import useTitle from "../hooks/useTitle";

const LoginPage = () => {
  useTitle("Login | GymNation");

  //check if the user is already logged in
  if (localStorage.getItem("token")) {
    window.location.href = "/dashboard";
  } else {
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
  }
};

export default LoginPage;
