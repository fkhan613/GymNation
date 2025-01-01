import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/users";
import ChangeProfilePicture from "../../components/ProfilePage/ChangeProfilePicture";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { motion } from "framer-motion";
import useTitle from "../../hooks/useTitle";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useTitle(
    `${JSON.parse(localStorage.getItem("user")).username} | ` +
      import.meta.env.VITE_APP_NAME
  );

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(
        JSON.parse(localStorage.getItem("user"))._id
      );
      setUser(userProfile);
      setLoading(false);
    };
    fetchData();
    
  }, []);

  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <PulseLoader color="#2563EB" className=" mt-24" size={15} />
      </div>
    );
  }


  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center">
          <ChangeProfilePicture
            user={user}
            setUser={setUser}
            isEditable={false}
            size="90"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold py-2">{user.username}</h2>
            <div className="flex flex-wrap gap-4">
              <button
                className="transition-all bg-gray-300 rounded-md px-2 py-1 text-sm font-semibold text-black shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 flex items-center gap-2"
                onClick={() => navigate("/dashboard/profile/edit")}
              >
                <PencilIcon className="w-5 h-5" />
                Edit Profile
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2 transition-all"
                onClick={() => navigate("/dashboard/profile/create-post")}
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
