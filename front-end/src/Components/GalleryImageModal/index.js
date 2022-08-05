const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal show-modal" : "modal hide-modal";
  
  // Closes the modal when clicking outside of it by setting the displayModal boolean to be false
  document.addEventListener(
    "click",
    (e) => {
      // Does not set displayModal to be false if the user is clicking on the zoom in icon (this would negate the effect of zooming in)
      if (!e.target.closest(".modal-main") && !e.target.closest('.zoomIn')) {
        setDisplayModal(false);
      }}
  )
  
  return (
    <div className={showOrHideClassName}>
      <section className="modal-main">
        {modalImage
        ? <img src={modalImage.url} onClick={() => setDisplayModal(false)} alt={modalImage.alt || 'No alt text available'}/>
        : null
        }
      </section>
    </div>
  );
};

export default GalleryImageModal;