import { useState } from "react";
import InputField from "./InputField";
import SocialLogin from "./SocialLogin";
import { register } from "../../services/users";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //validate inputs
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !username ||
        !confirmPassword
      ) {
        return toast.error("All fields are required");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      // eslint-disable-next-line no-unused-vars
      const user = await register(
        firstName,
        lastName,
        email,
        password,
        username
      );

      if(user){
        //return back to the login page with success message
          window.location.href = "/login?register=success";
      }

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-md shadow-slate-700 justify-center">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
          />
          <InputField
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
          />
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email address"}
          />
          <InputField
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={"Username"}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
          />

          <InputField
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            label={"Confirm Password"}
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default RegisterForm;
