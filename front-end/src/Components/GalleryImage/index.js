import { useState } from "react";
import stub from "../../data.js";

const GalleryImage = () => {
  const [images, setImages] = useState(stub.sort((a, b) => b.votes - a.votes));

  function vote(idOfVotedItem) {
    setImages((previousState) => {
      return previousState
        .map((image) => {
          return image.id !== idOfVotedItem
            ? image
            : { ...image, votes: image.votes + 1 };
        })
        .sort((a, b) => b.votes - a.votes);
    });
  }

  return (
    <div className="Gallery">
      {images.map((image, index) => (
        <div className="GalleryImage" key={[image.id, index]}>
          <img src={image.url} alt="Nature photographs" />
          <p>Votes: {image.votes}</p>
          <button
            onClick={() => {
              vote(image.id);
            }}
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default GalleryImage;
