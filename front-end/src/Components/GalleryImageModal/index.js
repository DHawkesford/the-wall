const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal show-modal" : "modal hide-modal";

  return (
    <div className={showOrHideClassName}>
      <section className="modal-main">
        <img src={modalImage.url} onClick={() => setDisplayModal(false)} alt={modalImage.alt || 'No alt text available'}/>
      </section>
    </div>
  );
};

export default GalleryImageModal;