/* eslint-disable react/prop-types */

const UserFollowing = ({ followers = [] }) => {

    const validUserFollowers = Array.isArray(followers) ? followers : [];

  return (
    <div>
      <h3 className="text-xl font-semibold">Following</h3>
      <ul className="mt-2">
        {validUserFollowers.map((follow) => (
          <li key={follow.id} className="flex items-center mt-2">
            <img
              src={follow.profilePicture}
              alt="Following"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2">{follow.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFollowing;
