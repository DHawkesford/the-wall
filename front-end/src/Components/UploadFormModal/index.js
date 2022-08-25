import CloseButton from '../CloseButton';
import { useForm } from "react-hook-form";
import { useState } from 'react';


const UploadFormModal = ({displayUploadFormModal, setDisplayUploadFormModal}) => {
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    let url = null;

    const uploadFormModalClasses = displayUploadFormModal ? "modal-darken-background show-upload-form-modal" : "modal-darken-background hide-upload-form-modal";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!image) {
            alert('An image is needed.');
            return;
        };

        setIsPending(true);

        await postImageToCloudinaryAndSetUrl();

        const newUpload = { ...data, url: url };
        
        await fetch('https://the-wall-dan-blake.herokuapp.com/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUpload)
        });

        alert('Upload successful!');
        window.location.reload(true);
        setIsPending(false);
    }

    function setImageAndShowOnPage(event) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImage(onLoadEvent.target.result);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    async function postImageToCloudinaryAndSetUrl() {
        const response = await fetch('https://api.cloudinary.com/v1_1/ddmilnqpc/image/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: image,
                upload_preset: 'gallery',
            }),
        });

        const data = await response.json();

        url = data.secure_url;
    }

    return (
        <div className={uploadFormModalClasses}>
            <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
                <p className="upload-form-modal-title">
                    Submit a photo
                    {isPending ? (
                        <CloseButton handleClick={() => setDisplayUploadFormModal(false)} uniqueId="close-upload-form-modal" disabled={true} />
                    ) : (
                        <CloseButton handleClick={() => setDisplayUploadFormModal(false)} uniqueId="close-upload-form-modal" />
                    )}
                </p>
                <div className="form-field upload-image">
                    <input id="url-input" onChange={setImageAndShowOnPage} type="file" name="file" accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"/>
                    <label htmlFor="url-input">Select image</label>
                    {image ? (
                        <img className="upload-form-image" src={image} alt="A preview of what you have selected to upload."/>
                    ) : (
                        <div className="upload-form-image-placeholder-wrapper">
                            <p className="upload-form-image-placeholder">A preview of what you have selected to upload will appear here.</p>
                        </div>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="alt-text-textarea">Add alt text:</label>
                    <textarea maxLength="140" rows="4" cols="35" id="alt-text-textarea" {...register("altText", { required: true })} />
                    {errors.altText && <span>This field is required</span>}
                </div>
                <div className="upload-form-button-wrapper">
                    {isPending ? (
                        <button className="upload-form-button-disabled" disabled>Submit</button>
                    ) : (
                        <button className="upload-form-button">Submit</button>
                    )}
                </div>
            </form>
        </div>
    )
};

export default UploadFormModal;