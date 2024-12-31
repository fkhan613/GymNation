/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { uploadPhoto } from "../../services/upload";
import { FaPencilAlt } from "react-icons/fa";
import { updateUserProfilePicture } from "../../services/users";

const ChangeProfilePicture = ({ user, setUser }) => {
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const result = await uploadPhoto(e.target.files[0]);
      if (result) {
        handleChangeProfilePicture(result);
      } else {
        toast.error("Error uploading profile picture");
      }
    }
  };

  const handleChangeProfilePicture = async (newProfilePictureUrl) => {
    console.log("FROM handleChangeProfilePicture", newProfilePictureUrl);
    const updatedUser = await updateUserProfilePicture(
      user._id,
      newProfilePictureUrl
    );
    setUser(updatedUser);
  };

  return (
    <div className="relative group hover:cursor-pointer">
      <label htmlFor="profilePictureInput">
        <img
          src={user.pfp}
          className="w-24 h-24 rounded-full cursor-pointer"
          alt="Profile"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaPencilAlt className="text-white" />
        </div>
      </label>
      <input
        id="profilePictureInput"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ChangeProfilePicture;
