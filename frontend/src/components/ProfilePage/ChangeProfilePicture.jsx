/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateUserProfilePicture } from "../../services/users";

const ChangeProfilePicture = ({ user, setUser }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleChangeProfilePicture = async () => {
    if (newProfilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", newProfilePicture);

      try {
        const updatedUser = await updateUserProfilePicture(user.id, formData);
        setUser(updatedUser);
        setIsChanging(false);
      } catch (error) {
        console.error("Failed to update profile picture", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsChanging(true)}
        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 mt-2"
      >
        Change Profile Picture
      </button>
      {isChanging && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleChangeProfilePicture}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Change
            </button>
            <button
              onClick={() => setIsChanging(false)}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfilePicture;
