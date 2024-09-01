/* eslint-disable react/prop-types */
import { useState } from "react";

const Post = ({ post, onUpdatePost, onDeletePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [image, setImage] = useState(post.image);
  const [tags, setTags] = useState(post.tags);

  const handleUpdate = () => {
    onUpdatePost(post.id, caption, image, tags);
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <img src={post.image} alt="Post" className="w-full h-auto" />
          <p>{post.caption}</p>
          <p>{post.tags.join(", ")}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDeletePost(post.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
