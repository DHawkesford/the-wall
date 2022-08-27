import CloseButton from '../../CloseButton';
import zoomIn from './zoom_in_icon.png';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { useForm } from "react-hook-form";

const GalleryImage = ({ image, star, usersStars, showModal, setUsersStars, setImages }) => {
  const smallImageUrl = image.url.slice(0, image.url.indexOf('upload') + 7) + 'f_webp/c_scale,h_300/' + image.url.slice(image.url.indexOf('upload') + 7);
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [displayAltTextModal, setDisplayAltTextModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPending, setIsPending] = useState(false);

  async function getUsersStars() {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://the-wall-dan-blake.herokuapp.com`,
        scope: "read:current_user_stars",
      });

      const userStarsByIDURL = `https://the-wall-dan-blake.herokuapp.com/stars/${user.sub}`;

      const starsResponse = await fetch(userStarsByIDURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      const users_stars = await starsResponse.json();

      const starredimageids = [];

      for (let i = 0; i < users_stars.payload.length; i++ ) {
        starredimageids.push(users_stars.payload[i].imageid)
      }
      
      setUsersStars(starredimageids);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmitAltTextForm = async (data) => {
    setIsPending(true);

    const newAltText = { ...data };
    await fetch(`https://the-wall-dan-blake.herokuapp.com/images/${image.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAltText)
    });

    setImages((previousState) => {
      return previousState
      .map((item) => {
        return item.id !== image.id
        ? item
        : { ...image, alt: data.altText };
      })
      .sort((a, b) => b.stars - a.stars);
    });

    setTimeout(() => {
        setDisplayAltTextModal(false);
        setIsPending(false);
        document.getElementById(image.id).scrollIntoView({behavior: 'smooth'});
    }, 1000);
  }

  const onSubmitDeleteForm = async () => {
    setIsPending(true);

    await fetch(`https://the-wall-dan-blake.herokuapp.com/images/${image.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    setImages((previousState) => {
      return previousState
      .map((item) => {
        return item.id !== image.id
        ? item
        : null;
      })
      .sort((a, b) => b.stars - a.stars);
    });

    setTimeout(() => {
        setDisplayAltTextModal(false);
        setIsPending(false);
    }, 1000);
  }

  return( 
    <>
      <div className="GalleryImage" id={image.id}>
        <img className="zoomIn" src={zoomIn} onClick={() => {showModal(image)}} alt="A magnifying glass with a plus sign over the lens" />
        <img className="photo" src={smallImageUrl} alt={image.alt || 'No alt text available'} />
        {isAuthenticated ? (
          usersStars ? (
            <>
              {usersStars.includes(image.id) ? (
                <div className="starBarStarred">
                  <button className="starButtonStarred" onClick={() => {star(image.id)}} />
                  <p>{image.stars}</p>
                </div>
              ) : (
                <div className="starBarNotStarred">
                  <button className="starButtonNotStarred" onClick={() => {star(image.id)}} />
                  <p>{image.stars}</p>
                </div>
              )}
              <div className="posted-image-buttons">
                <button className="edit-button" onClick={() => {setDisplayAltTextModal(true)}}>
                  <span>Edit alt text</span>
                </button>
                <button className="delete-button" onClick={setDisplayDeleteModal(true)}>
                  <span>Delete post</span>
                </button>
              </div>
            </>
            ) : (
              <div className="starBarNotStarred">
                <button className="starButtonNotStarred" onClick={getUsersStars} />
                <p>{image.stars}</p>
              </div>
            )
          ) : (
            <div className="starBarNotStarred">
              <button className="starButtonNotStarred" onClick={loginWithRedirect} />
              <p>{image.stars}</p>
            </div>
          )
        }
      </div>
      {displayAltTextModal ? (
        <div className="modal-darken-background show-upload-form-modal">
          <form className="upload-form alt-text-form" onSubmit={handleSubmit(onSubmitAltTextForm)}>
              <div className="form-field">
                  <label htmlFor="alt-text-textarea">
                    Add alt text:
                    {isPending ? (
                      <CloseButton handleClick={() => setDisplayAltTextModal(false)} uniqueId="close-alt-text-modal" disabled={true} />
                    ) : (
                      <CloseButton handleClick={() => setDisplayAltTextModal(false)} uniqueId="close-alt-text-modal" />
                    )}
                  </label>
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
      ) : (
        null
      )}
      {displayDeleteModal ? (
        <div className="modal-darken-background show-upload-form-modal">
          <form className="upload-form delete-form" onSubmit={handleSubmit(onSubmitDeleteForm)}>
              <div className="form-field">
                  <label htmlFor="alt-text-textarea">
                    Are you sure you want to delete this post?
                    {isPending ? (
                      <CloseButton handleClick={() => setDisplayDeleteModal(false)} uniqueId="close-delete-modal" disabled={true} />
                    ) : (
                      <CloseButton handleClick={() => setDisplayDeleteModal(false)} uniqueId="close-delete-modal" />
                    )}
                  </label>
              </div>
              <div className="upload-form-button-wrapper">
                  {isPending ? (
                      <button className="upload-form-button-disabled" disabled>Delete post</button>
                  ) : (
                      <button className="upload-form-button">Delete post</button>
                  )}
              </div>
          </form>
        </div>
      ) : (
        null
      )}
    </>
  );
}

export default GalleryImage; 