import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Stars() {
  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();
  const [usersStars, setUsersStars] = useState(null);

  // useEffect(() => {
  //   const getUsersStars = async () => {
  //     try {
  //       const accessToken = await getAccessTokenWithPopup({
  //         audience: `https://the-wall-dan-blake.herokuapp.com`,
  //         scope: "read:current_user_stars",
  //       });
  
  //       const userStarsByIDURL = `https://the-wall-dan-blake.herokuapp.com/stars/1`;
  
  //       const starsResponse = await fetch(userStarsByIDURL, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  
  //       const { users_stars } = await starsResponse.json();
        
  //       console.log(users_stars.payload);
  //       setUsersStars(users_stars.payload);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUsersStars();
  // }, [getAccessTokenWithPopup, user?.sub]);

  const getUsersStars = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://the-wall-dan-blake.herokuapp.com`,
        scope: "read:current_user_stars",
      });

      const userStarsByIDURL = `https://the-wall-dan-blake.herokuapp.com/stars/1`;

      const starsResponse = await fetch(userStarsByIDURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { users_stars } = await starsResponse.json();
      
      console.log(users_stars);
      setUsersStars(users_stars.payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    isAuthenticated && (
      <div>
        <button onClick={getUsersStars}>Get user's stars</button>
        {usersStars ? (
          usersStars.map(star => <p>{star.userID}, {star.imageID}</p>)
        ) : (
          "No user's stars defined"
        )}
      </div>
    )
  );
};

export default Stars;