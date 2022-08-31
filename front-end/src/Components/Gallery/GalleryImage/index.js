import zoomIn from './zoom_in_icon.png';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';

const PostedImage = ({ image, star, usersStars, showModal, setUsersStars }) => {
  const smallImageUrl = image.url.slice(0, image.url.indexOf('upload') + 7) + 'f_webp/c_scale,h_300/' + image.url.slice(image.url.indexOf('upload') + 7);
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [displayAltText, setDisplayAltText] = useState(false);
  const altTextModalClasses = displayAltText ? "alt-text-modal show-alt-text-modal" : "alt-text-modal hide-alt-text-modal";

  async function getUsersStars() {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://the-wall-app1.herokuapp.com`,
        scope: "read:current_user_stars",
      });

      const userStarsByIDURL = `https://the-wall-app1.herokuapp.com/stars/${user.sub}`;

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

  return( 
    <div className="GalleryImage" id={image.id}>
      {displayAltText ? (
        null
      ) : (
        <img className="zoomIn" src={zoomIn} onClick={() => {showModal(image)}} alt="A magnifying glass with a plus sign over the lens" />
      )}
      <img className="photo" src={smallImageUrl} alt={image.alt || 'No alt text available'} />
      <button className="toggle-alt-text" onClick={() => {setDisplayAltText(!displayAltText)}}>
        ALT
      </button>
      <div className={altTextModalClasses}>
        <div className="alt-text-wrapper">
          <span className="alt-text">{image.alt}</span>
        </div>
      </div>
      {isAuthenticated ? (
        usersStars ? (
          usersStars.includes(image.id) ? (
            <div className="starBarStarred">
              <button className="starButtonStarred" onClick={() => {star(image.id)}} />
              <p>{image.stars}</p>
            </div>
          ) : (
            <div className="starBarNotStarred">
              <button className="starButtonNotStarred" onClick={() => {star(image.id)}} />
              <p>{image.stars}</p>
            </div>
          )) : (
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
  );
}

export default PostedImage; 