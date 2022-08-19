import { useState, useEffect } from 'react';
import Loading from '../Loading';

const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal-darken-background show-image-modal" : "modal-darken-background hide-image-modal";
  const [isLoaded, setIsLoaded] = useState(false);

  // Uses the transform tool in Cloudinary to obtain a scaled version of the image for the modal, which is always 1200px in height
  const modalImageResizedUrl = (imageUrl) => imageUrl.slice(0, imageUrl.indexOf('upload') + 7) + 'f_webp/c_scale,h_1200/' + imageUrl.slice(imageUrl.indexOf('upload') + 7);
  
  // Closes the modal when clicking outside of it by setting the displayModal boolean to be false
  document.addEventListener(
    "click",
    (e) => {
      // Does not set displayModal to be false if the user is clicking on the zoom in icon (this would negate the effect of zooming in)
      if (!e.target.closest(".image-modal-image") && !e.target.closest('.zoomIn')) {
        setDisplayModal(false);
      }}
  )
  
  useEffect(() => {
    setIsLoaded(false);
  }, [modalImage])

  return (
    <div className={showOrHideClassName}>
      <section className="image-modal">
        {isLoaded ? (
          null
        ) : (
          <Loading />
        )}
        {modalImage ? ( 
          <img className="image-modal-image" src={modalImageResizedUrl(modalImage.url)} onClick={() => {setDisplayModal(false)}} alt={modalImage.alt || 'No alt text available'} onLoad={() => setIsLoaded(true)} style={isLoaded ? {} : {visibility: 'hidden'}} />
        ) : (
          null
        )}
      </section>
    </div>
  );
};

export default GalleryImageModal;