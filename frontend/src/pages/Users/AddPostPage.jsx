import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { uploadPhoto } from "../../services/upload";
import { createNewPost } from "../../services/post";

const AddPostPage = () => {
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();
  useTitle("Create a Post | " + import.meta.env.VITE_APP_NAME);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Upload all images
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const imageUrl = await uploadPhoto(file);
        return imageUrl;
      })
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleRemoveImage = (imageUrl) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
  };

  const handleTagInput = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      if (tagInput.trim() !== "") {
        setTags((prevTags) => [...prevTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const post = await createNewPost(userId, caption, images, tags);
      console.log(post);

      if (post) {
        toast.success("Post created successfully");
        navigate("/dashboard/profile");
      }

    } catch (error) {
      toast.error("Failed to create : ", error.message);
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
        className="m-6 p-6 shadow-lg max-w-2xl w-full shadow-gray-300 rounded-lg"
        action="#"
        method="POST"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-10 flex items-center justify-center flex-col ">
          <div className="mb-6 flex justify-start w-full">
            <button
              className="transition-all bg-gray-300 rounded-md px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 flex items-center gap-2"
              onClick={() => navigate("/dashboard/profile")}
            >
              <ArrowLeftIcon className="w-4 h-4 inline-block" />
              Back
            </button>
          </div>
        </div>

        <label
          htmlFor="caption"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Caption
        </label>
        <textarea
          id="caption"
          rows="3"
          maxLength={500}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 mb-8"
          placeholder="Write your thoughts here..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tags
        </label>
        <input
          type="text"
          id="tags"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 mb-8"
          placeholder="Enter tags and press space"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
        />

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
            >
              <span>{tag}</span>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveTag(tag)}
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <label
          htmlFor="images"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Upload Images
        </label>
        <div className="flex items-center justify-center w-full mb-8">
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PlusCircleIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Upload ${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(image)}
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircleIcon className="w-4 h-4 inline-block" />
          Create
        </button>
      </motion.form>
    </div>
  );
};

export default AddPostPage;
