import { useState } from "react";
import InputField from "./InputField";
import SocialLogin from "./SocialLogin";

// eslint-disable-next-line react/prop-types
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-md shadow-slate-700 justify-center">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <InputField
            id="first-name"
            name="first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
          />
          <InputField
            id="last-name"
            name="last-name"
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
