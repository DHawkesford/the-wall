const GalleryImage = ({ image, index, vote }) => {
    return( 
        <div className="GalleryImage" key={[image.id, index]}>
          <img src={image.url} alt="Nature photographs" />
          <div className="voteBar">
            <p>Votes: {image.votes}</p>
            <button onClick={() => {vote(image.id)}}>
              Vote
            </button>
          </div>
        </div>
    );
}

export default GalleryImage; 