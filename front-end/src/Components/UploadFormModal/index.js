import CloseButton from '../CloseButton';
import { useForm } from "react-hook-form";
import UploadToCloudinary from '../UploadToCloudinary';
import React from "react";


const UploadFormModal = ({displayUploadFormModal, setDisplayUploadFormModal}) => {
    const uploadFormModalClasses = displayUploadFormModal ? "modal-darken-background show-upload-form-modal" : "modal-darken-background hide-upload-form-modal";

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={uploadFormModalClasses}>
            <section className="upload-form-modal">
                <p className="upload-form-modal-title">
                    Submit a photo
                    <CloseButton handleClick={() => setDisplayUploadFormModal(false)} uniqueId="close-upload-form-modal" />
                </p>
                <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
                    <UploadToCloudinary setValue={setValue} />
                    <div className="form-field">
                        <label>Add alt text:</label>
                        <input {...register("altText", { required: true })} />
                        {errors.altText && <span>This field is required</span>}
                    </div>
                    <div className="form-field">
                        <button>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
};

export default UploadFormModal;