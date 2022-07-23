const GalleryImage = ({ image, index, star }) => {
    return( 
        <div className="GalleryImage" key={[image.id, index]}>
          <img src={image.url} alt="Nature photographs" />
          <div className="starBar">
            <p>Stars: {image.stars}</p>
            <button onClick={() => {star(image.id)}}>
              Star
            </button>
          </div>
        </div>
    );
}

export default GalleryImage; 