  const GalleryImage = ({ image, star, usersStars }) => {
    return( 
        <div className="GalleryImage">
          <img src={image.url} alt="Nature photographs" />
          <div className="starBar">
            <p>Stars: {image.stars}</p>
            {usersStars 
            ?
              usersStars.includes(image.id)
              ? <button className="starButtonStarred" onClick={() => {star(image.id)}} />
              : <button className="starButtonNotStarred" onClick={() => {star(image.id)}} />
            : null
            }
          </div>
        </div>
    );
}

export default GalleryImage; 