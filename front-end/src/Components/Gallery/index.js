import { useAuth0 } from "@auth0/auth0-react";
import GalleryImage from "../GalleryImage";

const Gallery = ({ galleryImages, setImagesFn, usersStars, setUsersStars }) => {
  const { user, isAuthenticated } = useAuth0();

  async function star(idOfStarredItem) {
    console.log(usersStars);

    if (isAuthenticated) {
      const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      
      // If the user has already starred this image, grey the button, decrement the stars, and update the database
      if (data.payload.length === 0) {
        setUsersStars(usersStars.filter(star => star !== idOfStarredItem));
        
        await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        setImagesFn((previousState) => {
          return previousState
            .map((image) => {
              return image.id !== idOfStarredItem
                ? image
                : { ...image, stars: image.stars - 1 };
            })
            .sort((a, b) => b.stars - a.stars);
        });

        return;
      }
      
      setImagesFn((previousState) => {
        return previousState
          .map((image) => {
            return image.id !== idOfStarredItem
              ? image
              : { ...image, stars: image.stars + 1 };
          })
          .sort((a, b) => b.stars - a.stars);
      });

      setUsersStars([...usersStars, idOfStarredItem]);
      
      await fetch(`https://the-wall-dan-blake.herokuapp.com/images/${idOfStarredItem}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
  }

  return (
    <div className="Gallery">
      {galleryImages.map((image, index) => <GalleryImage image={image} index={index} star={star} usersStars={usersStars} />)}
    </div>
  );
};

export default Gallery;
