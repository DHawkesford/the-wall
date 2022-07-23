import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Stars() {
  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();
  const [usersStars, setUsersStars] = useState(null);

  const getUsersStars = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://the-wall-dan-blake.herokuapp.com`,
        scope: "read:current_user_stars",
      });

      const userStarsByIDURL = `https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}`;

      const starsResponse = await fetch(userStarsByIDURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      const users_stars = await starsResponse.json();
      
      setUsersStars(users_stars.payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    isAuthenticated && (
      <div>
        <button onClick={getUsersStars}>Get your stars</button>
        <p>
          {usersStars ? (
            usersStars.map(star => <>{star.imageid}, </>)
          ) : (
            "No user's stars defined"
          )}
        </p>
      </div>
    )
  );
};

export default Stars;