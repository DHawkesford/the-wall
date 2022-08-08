import { useState, useEffect } from 'react';

const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal-darken-background show-image-modal" : "modal-darken-background hide-image-modal";
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: Change height back
  const modalImageResizedUrl = (imageUrl) => imageUrl.slice(0, imageUrl.indexOf('upload') + 7) + 'f_webp/c_scale,h_2800/' + imageUrl.slice(imageUrl.indexOf('upload') + 7);
  
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
          /* TODO: Change image here */
          <img className="image-modal-image" src="https://i.stack.imgur.com/SXuSR.png" alt="A speech bubble that says 'It's magick'." />
        )}
        {modalImage ? ( 
          /* TODO: Look at changing display here */
          <img className="image-modal-image" src={modalImageResizedUrl(modalImage.url)} onClick={() => {setDisplayModal(false);}} alt={modalImage.alt || 'No alt text available'} onLoad={() => setIsLoaded(true)} style={isLoaded ? {} : {display: 'none'}  } />
        ) : (
          null
        )}
      </section>
    </div>
  );
};

export default GalleryImageModal;