const GalleryImageModal = ({ handleClose, showModal, children }) => {
  const showOrHideClassName = showModal ? "modal display-block" : "modal display-none";

  return (
    <div className={showOrHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default GalleryImageModal;