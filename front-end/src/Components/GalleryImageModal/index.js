const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal show-modal" : "modal hide-modal";

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