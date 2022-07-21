import GalleryImage from "../GalleryImage";

const Gallery = ({ galleryImages, setImagesFn }) => {
  async function vote(idOfVotedItem) {
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
    });
  }

  return (
    <div className="Gallery">
      {galleryImages.map((image, index) => <GalleryImage image={image} index={index} vote={vote} />)}
    </div>
  );
};

export default Gallery;
