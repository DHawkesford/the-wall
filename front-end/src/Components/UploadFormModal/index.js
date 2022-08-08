import CloseButton from '../CloseButton';
import { useForm } from "react-hook-form";
import { useState } from 'react';


const UploadFormModal = ({displayUploadFormModal, setDisplayUploadFormModal}) => {
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    // TODO: add a pending state for the image loading also
    // TODO: add check to make sure object is correct before console logging (sending to db eventually)
    
    let url = null;

    const uploadFormModalClasses = displayUploadFormModal ? "modal-darken-background show-upload-form-modal" : "modal-darken-background hide-upload-form-modal";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsPending(true);
        await postImageToCloudinaryAndSetUrl();
        console.log({ ...data, url: url });
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
                    <CloseButton handleClick={() => setDisplayUploadFormModal(false)} uniqueId="close-upload-form-modal" />
                </p>
                <div className="form-field upload-image">
                    <input id="url-input" onChange={setImageAndShowOnPage} type="file" name="file" />
                    <label htmlFor="url-input">Upload image</label>
                    <img className="upload-form-image" src={image} alt="A preview of what you have selected to upload."/>
                </div>
                <div className="form-field">
                    <label htmlFor="alt-text-textarea">Add alt text:</label>
                    <textarea maxlength="140" rows="4" cols="35" id="alt-text-textarea" {...register("altText", { required: true })} />
                    {errors.altText && <span>This field is required</span>}
                </div>
                <div className="upload-form-button-wrapper">
                    {isPending ? (
                        <button className="upload-form-button" disabled>Submit</button>
                    ) : (
                        <button className="upload-form-button">Submit</button>
                    )}
                </div>
            </form>
        </div>
    )
};

export default UploadFormModal;