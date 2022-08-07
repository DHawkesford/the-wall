import zoomIn from './zoom_in_icon.svg';

const GalleryImage = ({ image, star, usersStars, showModal }) => {
  const smallImageUrl = image.url.slice(0, image.url.indexOf('upload') + 7) + 'c_scale,h_300/' + image.url.slice(image.url.indexOf('upload') + 7);

  return( 
    <div className="GalleryImage">
      <img className="zoomIn" src={zoomIn} onClick={() => {showModal(image)}} alt="A magnifying glass with a plus sign over the lens" />
      <img className="photo" src={smallImageUrl} alt={image.alt || 'No alt text available'} />
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