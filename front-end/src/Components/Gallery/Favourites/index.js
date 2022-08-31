import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import GalleryImage from "../GalleryImage";

const Favourites = ({ usersStars, setUsersStars, showModal, webSocket, favourites, setFavourites }) => {
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function filterImagesByUsersStarred() {
      setIsLoading(true); 
      const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/users/${user.sub}/favourites`);
      const data = await response.json();
      setFavourites(data.payload);
      setIsLoading(false);
    }

    filterImagesByUsersStarred();
  }, [user, setFavourites]);

  async function star(idOfStarredItem) {
    if (!isAuthenticated) return;

    // This next block toggles whether a user has starred the image with id idOfStarredItem
    if (usersStars.includes(idOfStarredItem)) {
      // Remove the image id from the list of starred image ids on the page (this will grey out the star button)
      setUsersStars(usersStars.filter(star => star !== idOfStarredItem));
      
      // Decrement the image's number of stars by 1 on the page
      setFavourites((previousState) => {
        return previousState
        .map((image) => {
          return image.id !== idOfStarredItem
          ? image
          : { ...image, stars: image.stars - 1 };
        });
      });
      
      // Delete the (user_id, image_id) pair from the stars table
      await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      webSocket.send(JSON.stringify({
        id: idOfStarredItem,
        star: 'decrement'
      }));
    } else { // If the user has not starred this image yet
      // Add the image id to the list of starred image ids on the page (this will make the star button gold)
      setUsersStars([...usersStars, idOfStarredItem]);
      
      // Increment the image's number of stars by 1 on the page
      setFavourites((previousState) => {
        return previousState
        .map((image) => {
          return image.id !== idOfStarredItem
          ? image
          : { ...image, stars: image.stars + 1 };
        })
        .sort((a, b) => b.stars - a.stars || b.id - a.id);
      });
      
      // Insert the (user_id, image_id) pair into the stars table
      await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      webSocket.send(JSON.stringify({
        id: idOfStarredItem,
        star: 'increment'
      }));
    }
  }

  return (
    <div className="Gallery">
        {isLoading ? (
          <Loading />
          ) : (
            favourites.length === 0 ? (
              <p className="no-results">You have no starred posts currently.</p>
            ) : (
              favourites.map((image, index) => <GalleryImage image={image} star={star} usersStars={usersStars} key={[image.id, index]} showModal={showModal} setUsersStars={setUsersStars} />)
            )
        )}
    </div>
  );
};

export default Favourites;