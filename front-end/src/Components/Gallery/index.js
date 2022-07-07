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
      {galleryImages.map((image, index) => (
        <div className="GalleryImage" key={[image.id, index]}>
          <img src={image.url} alt="Nature photographs"></img>
          <div className="voteBar">
            <p>Votes: {image.votes}</p>
            <button
              onClick={() => {
                vote(image.id);
              }}
            >
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
