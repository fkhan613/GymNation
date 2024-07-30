import logo from "../assets/gymnation-logo.png";
import LoginForm from "../components/LoginPage/LoginForm";
import Header from "../components/LoginPage/Header";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <img className="mx-auto h-36 w-auto" src={logo} alt="GymNation Logo" />
      <Header />
      <div className="px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
