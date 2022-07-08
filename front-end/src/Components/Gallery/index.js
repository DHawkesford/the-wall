import GalleryImage from "../GalleryImage";

const Gallery = ({ galleryImages, setImagesFn }) => {
  function vote(idOfVotedItem) {
    setImagesFn((previousState) => {
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
      {galleryImages.map((image, index) => <GalleryImage image={image} index={index} vote={vote} />)}
    </div>
  );
};

export default Gallery;
