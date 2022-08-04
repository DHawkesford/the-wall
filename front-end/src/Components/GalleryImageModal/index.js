const GalleryImageModal = ({ displayModal, setDisplayModal, modalImage }) => {
  const showOrHideClassName = displayModal ? "modal display-block" : "modal display-none";

  return (
    <div className={showOrHideClassName}>
      <section className="modal-main">
        <img src={modalImage} onClick={() => setDisplayModal(false)}/>
      </section>
    </div>
  );
};

export default GalleryImageModal;