import zoomIn from './zoom_in_icon.png';
import { useAuth0 } from "@auth0/auth0-react";

const GalleryImage = ({ image, star, usersStars, showModal, getUsersStars }) => {
  const smallImageUrl = image.url.slice(0, image.url.indexOf('upload') + 7) + 'f_webp/c_scale,h_300/' + image.url.slice(image.url.indexOf('upload') + 7);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return( 
    <div className="GalleryImage">
      <img className="zoomIn" src={zoomIn} onClick={() => {showModal(image)}} alt="A magnifying glass with a plus sign over the lens" />
      <img className="photo" src={smallImageUrl} alt={image.alt || 'No alt text available'} />
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
        )}
    </div>
  );
}

export default GalleryImage; 