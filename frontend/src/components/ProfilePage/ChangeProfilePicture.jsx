/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { uploadPhoto } from "../../services/upload";
import { FaPencilAlt } from "react-icons/fa";
import { updateUserProfilePicture } from "../../services/users";

const ChangeProfilePicture = ({ user, setUser, isEditable, size = "100" }) => {
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0] && isEditable) {
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
    <div
      className="relative group"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <label htmlFor="profilePictureInput">
        <img
          src={user.pfp}
          className="rounded-full"
          alt="Profile"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
        {isEditable ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
            <FaPencilAlt
              className="text-white"
              style={{ width: `${size / 3}px`, height: `${size / 3}px` }}
            />
          </div>
        ) : null}
      </label>

      {isEditable ? (
        <input
          id="profilePictureInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      ) : null}
    </div>
  );
};

export default ChangeProfilePicture;
