/* eslint-disable react/prop-types */
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const AddPostButton = ({ onAddPost }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const handleAdd = () => {
    onAddPost(caption, image, tags);
    setIsAdding(false);
    setCaption("");
    setImage("");
    setTags("");
  };

  return (
    <div>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
      >
        <PlusCircleIcon className="w-5 h-5" />
        Add Post
      </button>
      {isAdding && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-start gap-2 mt-5">
              <button
                onClick={handleAdd}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded flex items-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 text-white p-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPostButton;
