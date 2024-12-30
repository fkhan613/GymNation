import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfilePicture,
} from "../../services/users";
import ChangeProfilePicture from "../../components/ProfilePage/ChangeProfilePicture";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(
        JSON.parse(localStorage.getItem("user"))._id
      );
      setUser(userProfile);
    };
    fetchData();
  }, []);


  const handleChangeProfilePicture = async (newProfilePictureUrl) => {
    console.log("FROM handleChangeProfilePicture", newProfilePictureUrl);
    const updatedUser = await updateUserProfilePicture(
      user._id,
      newProfilePictureUrl
    );
    setUser(updatedUser);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ChangeProfilePicture
            currentPfp={user.pfp}
            onChangeProfilePicture={handleChangeProfilePicture}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
