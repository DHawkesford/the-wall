import "./App.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/";
import GalleryImageModal from '../GalleryImageModal';
import UploadFormModal from '../UploadFormModal';
import Loading from "../Loading";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [images, setImages] = useState([]);
  const [usersStars, setUsersStars] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayUploadFormModal, setDisplayUploadFormModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [areImagesLoading, setAreImagesLoading] = useState(true);

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

    getUsersStars();
  }, [user, getAccessTokenSilently])

  return (
    <Router>
      <div className="App">
        <NavBar setDisplayUploadFormModal={setDisplayUploadFormModal} setImages={setImages} setAreImagesLoading={setAreImagesLoading} />
        <main>
          {areImagesLoading ? (
            <Loading />
          ) : (
            <Gallery galleryImages={images} setImagesFn={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
          )}
        </main>
        <GalleryImageModal setDisplayModal={setDisplayModal} modalImage={modalImage} displayModal={displayModal} />
        <UploadFormModal displayUploadFormModal={displayUploadFormModal} setDisplayUploadFormModal={setDisplayUploadFormModal} />
      </div>
    </Router>
  );
}

export default App;
