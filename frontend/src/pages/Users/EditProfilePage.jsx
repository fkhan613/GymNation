import ChangeProfilePicture from "../../components/ProfilePage/ChangeProfilePicture";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { updateUserProfile } from "../../services/users";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useTitle("Edit Profile | " + import.meta.env.VITE_APP_NAME);

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = localStorage.getItem("user");
      if (userProfile) {
        const parsedUserProfile = JSON.parse(userProfile);
        setUser(parsedUserProfile);
        setFirstName(parsedUserProfile.firstName);
        setLastName(parsedUserProfile.lastName);
        setUsername(parsedUserProfile.username);
        setEmail(parsedUserProfile.email);
        setBio(parsedUserProfile.bio);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const updates = {
      firstName,
      lastName,
      username,
      email,
      bio,
    };

    if (password) {
      updates.password = password;
    }

    try {
      const updatedUser = await updateUserProfile(updates);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <PulseLoader color="#2563EB" className=" mt-24" size={15} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.form
        className="m-6 p-6 shadow-lg max-w-2xl w-full shadow-gray-400 rounded-lg"
        action="#"
        method="POST"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 flex items-center justify-center flex-col ">
          <div className="mb-6 flex justify-start w-full">
            <button
              className="transition-all bg-blue-gray-200 rounded-md px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-gray-600 flex items-center gap-2"
              onClick={() => navigate("/dashboard/profile")}
            >
              <ArrowLeftIcon className="w-4 h-4 inline-block" />
              Back
            </button>
          </div>
          <ChangeProfilePicture
            user={user}
            setUser={setUser}
            isEditable={true}
            size="150"
          />

          <div className="font-semibold text-2xl mt-5">{user.username}</div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="John"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Doe"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Flowbite"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="john.doe@username.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="•••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="•••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Bio
        </label>
        <textarea
          id="message"
          rows="4"
          maxLength={500}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 mb-8"
          placeholder="Write your thoughts here..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex items-center justify-center gap-2 transition-all"
          onClick={handleSubmit}
        >
          <FaSave className="w-4 h-4 inline-block" />
          Save
        </button>
      </motion.form>
    </div>
  );
};

export default EditProfilePage;
