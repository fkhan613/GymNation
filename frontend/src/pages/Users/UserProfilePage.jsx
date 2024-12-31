import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/users";
import ChangeProfilePicture from "../../components/ProfilePage/ChangeProfilePicture";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(
        JSON.parse(localStorage.getItem("user"))._id
      );
      setUser(userProfile);
    };
    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ChangeProfilePicture
            user={user}
            setUser={setUser}
            isEditable={false}
            size="90"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <button
              className="text-indigo-500 hover:text-indigo-900 transition-all"
              onClick={() => navigate("/dashboard/profile/edit")}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
          onClick={() => navigate("/dashboard/profile/create-post")}
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Post
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
