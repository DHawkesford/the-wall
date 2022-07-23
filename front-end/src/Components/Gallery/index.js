import { useAuth0 } from "@auth0/auth0-react";
import GalleryImage from "../GalleryImage";

const Gallery = ({ galleryImages, setImagesFn }) => {
  const { user, isAuthenticated } = useAuth0();

  async function vote(idOfVotedItem) {
    if (isAuthenticated) {
      const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}/${idOfVotedItem}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      
      if (data.payload.length === 0) {
        console.log("You have already starred this image.");
        return;
      }
      
      setImagesFn((previousState) => {
        return previousState
          .map((image) => {
            return image.id !== idOfVotedItem
              ? image
              : { ...image, votes: image.votes + 1 };
          })
          .sort((a, b) => b.votes - a.votes);
      });
      
      await fetch(`https://the-wall-dan-blake.herokuapp.com/images/${idOfVotedItem}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
  }

  return (
    <div className="Gallery">
      {galleryImages.map((image, index) => <GalleryImage image={image} index={index} vote={vote} />)}
    </div>
  );
};

export default Gallery;
