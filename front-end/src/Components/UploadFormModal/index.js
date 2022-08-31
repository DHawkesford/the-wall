import CloseButton from '../CloseButton';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UploadFormModal = ({displayUploadFormModal, setDisplayUploadFormModal, setImages, usersStars, setUsersStars, favourites, setFavourites, posts, setPosts}) => {
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { user, isAuthenticated } = useAuth0();

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

        const newUpload = { ...data, url: url, userid: user.sub };

        const response = await fetch('https://the-wall-app1.herokuapp.com/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUpload)
        });
        const responseData = await response.json();
        const newImageId = responseData.payload[0].id;

        star(newImageId);

        setImages((previousState) => {
            return [...previousState, {...responseData.payload[0], stars: 1}]
            .sort((a, b) => b.stars - a.stars || b.id - a.id);
        });
        setPosts((previousState) => {
            return [...previousState, {...responseData.payload[0], stars: 1}]
            .sort((a, b) => b.stars - a.stars || b.id - a.id);
        });
        setFavourites((previousState) => {
            return [...previousState, {...responseData.payload[0], stars: 1}]
            .sort((a, b) => b.stars - a.stars || b.id - a.id);
        });

        setTimeout(() => {
            setDisplayUploadFormModal(false);
            setIsPending(false);
            document.getElementById(newImageId).scrollIntoView({behavior: 'smooth'});
        }, 1000);
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

    async function star(idOfStarredItem) {
        if (!isAuthenticated) return;
    
        // This next block toggles whether a user has starred the image with id idOfStarredItem
        if (usersStars.includes(idOfStarredItem)) {
          // Remove the image id from the list of starred image ids on the page (this will grey out the star button)
            setUsersStars(usersStars.filter(star => star !== idOfStarredItem));
          
          // Decrement the image's number of stars by 1 on the page
          setImages((previousState) => {
            return previousState
            .map((image) => {
              return image.id !== idOfStarredItem
              ? image
              : { ...image, stars: image.stars - 1 };
            })
              .sort((a, b) => b.stars - a.stars || b.id - a.id);
          });
          
          // Delete the (user_id, image_id) pair from the stars table
          await fetch(`https://the-wall-app1.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } else { // If the user has not starred this image yet
          // Add the image id to the list of starred image ids on the page (this will make the star button gold)
          
          setUsersStars([...usersStars, idOfStarredItem]);
          
          // Increment the image's number of stars by 1 on the page
          setImages((previousState) => {
            return previousState
            .map((image) => {
              return image.id !== idOfStarredItem
              ? image
              : { ...image, stars: image.stars + 1 };
            })
            .sort((a, b) => b.stars - a.stars || b.id - a.id);
          });
          
          // Insert the (user_id, image_id) pair into the stars table
          await fetch(`https://the-wall-app1.herokuapp.com/stars/${user.sub}/${idOfStarredItem}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
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