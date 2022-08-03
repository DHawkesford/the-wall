import GalleryImageModal from '../GalleryImageModal';
import { useState } from 'react';
import zoomIn from './zoom_in_icon.svg';

const GalleryImage = ({ image, star, usersStars }) => {
  const [showModal, setShowModal] = useState(false);

  return( 
    <div className="GalleryImage">
      <a>
        <img className="zoomIn" src={zoomIn} alt="A magnifying glass with a plus sign over the lens" />
      </a>
      <img className="photo" src={image.url} alt="Nature photographs" />
      <div className="starBar">
        {/* <GalleryImageModal showModal={showModal} handleClose={() => setShowModal(false)}>
          <p>Test</p>
        </GalleryImageModal> */}
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