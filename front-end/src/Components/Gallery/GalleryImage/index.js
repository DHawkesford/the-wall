import zoomIn from './zoom_in_icon.svg';

const GalleryImage = ({ image, star, usersStars, showModal }) => {
  return( 
    <div className="GalleryImage">
      <img className="zoomIn" src={zoomIn} onClick={() => {showModal(image.url)}} alt="A magnifying glass with a plus sign over the lens" />
      <img className="photo" src={image.url} alt="Nature photographs" />
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