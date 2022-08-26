import "./App.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/";
import GalleryImageModal from '../GalleryImageModal';
import UploadFormModal from '../UploadFormModal';
import Loading from "../Loading";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [images, setImages] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');
  const [usersStars, setUsersStars] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayUploadFormModal, setDisplayUploadFormModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [areImagesLoading, setAreImagesLoading] = useState(true);

  function inputChange(e) {
    setNewImageURL(e.target.value);
  }

  async function addImageToGallery() {
    // Update the page with the new image
    const newImage = {
      url: newImageURL,
      stars: 1
    }
    setImages([...images, newImage])

    // Clear the input field 
    setNewImageURL('');

    // Post the new image to the server
    await fetch('https://the-wall-dan-blake.herokuapp.com/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: newImageURL
      })
    })
  }

  function showModal(image) {
    setModalImage(image);
    setDisplayModal(true);
  }

  useEffect(() => {
    async function getImages() {
      const response = await fetch('https://the-wall-dan-blake.herokuapp.com/images');
      const data = await response.json();
      setImages(data.payload);
      setAreImagesLoading(false);
    }

    getImages();
  }, []);

  useEffect(() => {
    async function getUsersStars(currentuser) {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://the-wall-dan-blake.herokuapp.com`,
          scope: "read:current_user_stars",
        });

        const userStarsByIDURL = `https://the-wall-dan-blake.herokuapp.com/stars/${currentuser.sub}`;

        const starsResponse = await fetch(userStarsByIDURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        });

        const users_stars = await starsResponse.json();

        const starredImageIDs = [];

        for (let i = 0; i < users_stars.payload.length; i++ ) {
          starredImageIDs.push(users_stars.payload[i].imageid)
        }
        
        setUsersStars(starredImageIDs);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUsersStars(user);
  }, [user, getAccessTokenSilently])

  return (
    <div className="App">
      <NavBar handleClick={addImageToGallery} handleChange={inputChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={null} setDisplayUploadFormModal={setDisplayUploadFormModal} setImages={setImages} setAreImagesLoading={setAreImagesLoading} />
      <main>
        {areImagesLoading ? (
          <Loading />
        ) : (
          <Gallery galleryImages={images} setImagesFn={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} getUsersStars={null} />
        )}
      </main>
      <GalleryImageModal setDisplayModal={setDisplayModal} modalImage={modalImage} displayModal={displayModal} />
      <UploadFormModal displayUploadFormModal={displayUploadFormModal} setDisplayUploadFormModal={setDisplayUploadFormModal} />
    </div>
  );
}

export default App;
