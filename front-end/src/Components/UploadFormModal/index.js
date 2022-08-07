import CloseButton from '../CloseButton';

const UploadFormModal = ({displayUploadFormModal, setDisplayUploadFormModal}) => {
    const uploadFormModalClasses = displayUploadFormModal ? "upload-form-modal show-upload-form-modal" : "upload-form-modal hide-upload-form-modal";

    return (
        <div className={uploadFormModalClasses}>
            <p className="upload-form-modal-title">
                Upload
                <CloseButton handleClick={() => setDisplayUploadFormModal(false)} uniqueId="close-upload-form-modal" />
            </p>
            <p>Each day, a new theme will appear at the top of the page. When you're out on your walk or other activity, try to find something in your local area that matches that day's theme, and snap a photo of it. Submit your photo once home (mobile site coming soon..), and check out what other users have posted, and vote on your favourites!</p>
        </div>
    )
};

export default UploadFormModal;