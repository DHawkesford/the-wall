import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="profile">
      {isAuthenticated ? (
        <span>Hello, {user.nickname}</span>
      ) : <span>The Wall</span>
      }
    </div>
  );
};

export default Profile;