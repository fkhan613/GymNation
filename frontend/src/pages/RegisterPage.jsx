import useTitle from "../hooks/useTitle";
import RegisterForm from "../components/RegisterPage/RegisterForm";
import Header from "../components/RegisterPage/Header";
import logo from "../assets/gymnation-logo.png";

const RegisterPage = () => {
  useTitle("Register | GymNation");
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
