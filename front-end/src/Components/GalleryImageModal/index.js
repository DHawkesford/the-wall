const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal display-block" : "modal display-none";

  return (
    <div className={showOrHideClassName}>
      <section className="modal-main">
        <img src={modalImage} />
      </section>
      <button type="button" onClick={() => setDisplayModal(false)}>
        Close
      </button>
    </div>
  );
};

export default GalleryImageModal;