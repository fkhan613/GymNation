import { useState, useEffect } from "react";
import {
  getUserProfile,
  getUserPosts,
  getUserFollowers,
  getUserFollowing,
  updateUserProfilePicture,
} from "../../services/users";
import {
  createNewPost,
  updatePostById,
  deletePostById,
} from "../../services/post";
import UserPosts from "../../components/ProfilePage/UserPosts";
import UserFollowers from "../../components/ProfilePage/UserFollowers";
import UserFollowing from "../../components/ProfilePage/UserFollowing";
import AddPostButton from "../../components/ProfilePage/AddPostButton";
import ChangeProfilePicture from "../../components/ProfilePage/ChangeProfilePicture";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getUserProfile(
        JSON.parse(localStorage.getItem("user"))._id
      );
      setUser(userProfile);
      const userPosts = await getUserPosts(userProfile._id);
      setPosts(userPosts);
      const userFollowers = await getUserFollowers(userProfile._id);
      setFollowers(userFollowers);
      const userFollowing = await getUserFollowing(userProfile._id);
      setFollowing(userFollowing);
    };
    fetchData();
  }, []);

  const handleAddPost = async (caption, image, tags) => {
    const newPost = await createNewPost(user.id, caption, image, tags);
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = async (id, caption, image, tags) => {
    const updatedPost = await updatePostById(id, user.id, caption, image, tags);
    setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
  };

  const handleDeletePost = async (id) => {
    await deletePostById(id, user.id);
    setPosts(posts.filter((post) => post.id !== id));
  };

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
        <AddPostButton onAddPost={handleAddPost} />
      </div>
      <div className="mt-4">
        <UserPosts
          posts={posts}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <UserFollowers followers={followers} />
        <UserFollowing following={following} />
      </div>
    </div>
  );
};

export default UserProfilePage;
