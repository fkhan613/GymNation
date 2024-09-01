/* eslint-disable react/prop-types */
import Post from "./Post";

const UserPosts = ({ posts, onUpdatePost, onDeletePost }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Posts</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onUpdatePost={onUpdatePost}
            onDeletePost={onDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
