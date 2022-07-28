import { useAuth0 } from "@auth0/auth0-react";
import GalleryImage from "../GalleryImage";

const Gallery = ({ galleryImages, setImagesFn, usersStars, setUsersStars }) => {
  const { user, isAuthenticated } = useAuth0();

  async function star(idOfStarredItem) {
    console.log(usersStars);

    if (!isAuthenticated) return;

    // This request toggles whether a user has starred an image 
    // This will try to insert the values (user_id, image_id) into the stars table, which contains all the (user_id, image_id) pairs where a user with a user id of user_id has starred an image with an image id of image_id
    // If the pair already exists, this means the user has already starred the image, leading to the 'if' code block below
    const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    
    // If the user has already starred this image
    if (data.payload.length === 0) {
      // Remove the image id from the list of starred image ids on the page (this will grey out the star button)
      setUsersStars(usersStars.filter(star => star !== idOfStarredItem));
      
      // Decrement the image's number of stars by 1 on the page
      setImagesFn((previousState) => {
        return previousState
          .map((image) => {
            return image.id !== idOfStarredItem
              ? image
              : { ...image, stars: image.stars - 1 };
          })
          .sort((a, b) => b.stars - a.stars);
      });

      // Delete the (user_id, image_id) pair from the stars table
      await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else { // If the user has not starred this image yet
      // Add the image id to the list of starred image ids on the page (this will make the star button gold)
      setUsersStars([...usersStars, idOfStarredItem]);

      // Increment the image's number of stars by 1 on the page
      setImagesFn((previousState) => {
        return previousState
          .map((image) => {
            return image.id !== idOfStarredItem
              ? image
              : { ...image, stars: image.stars + 1 };
          })
          .sort((a, b) => b.stars - a.stars);
      });
    }
  }

  return (
    <div className="Gallery">
      {galleryImages.map((image, index) => <GalleryImage image={image} star={star} usersStars={usersStars} key={[image.id, index]} />)}
    </div>
  );
};

export default Gallery;
