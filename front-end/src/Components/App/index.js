import "./App.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/";
import GalleryImageModal from '../GalleryImageModal';
import UploadFormModal from '../UploadFormModal';
import Loading from "../Loading";
import { BrowserRouter as Router } from "react-router-dom";
import webSocket from '../Socket';

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [usersStars, setUsersStars] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayUploadFormModal, setDisplayUploadFormModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [areImagesLoading, setAreImagesLoading] = useState(true);
  const [theme, setTheme] = useState('Loading...');
  const [time, setTime] = useState(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const newTime = (minutes % 2 === 1 && seconds > 50) ? (
      `< 10 seconds`
      ) : (
      `${(minutes + 1) % 2}:${seconds > 50 ? 0 : ''}${59 - seconds}`
    );
    return newTime;
  });

  function showModal(image) {
    setModalImage(image);
    setDisplayModal(true);
  }

  useEffect(() => {
    async function getImages() {
      const response = await fetch('https://the-wall-dan-blake.herokuapp.com/images/today');
      const data = await response.json();
      setImages(data.payload);
      setAreImagesLoading(false);
    }

    getImages();
  }, []);

  useEffect(() => {
    webSocket.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const messageData = JSON.parse(e.data)

        if (messageData.type === 'themeChange') {
          // console.log(messageData);
          setTheme(messageData.payload.themeData[0].theme);
          setImages(messageData.payload.imageData);
          
          const now = new Date();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();

          const newTime = (minutes % 2 === 1 && seconds > 50) ? (
            `< 10 seconds`
            ) : (
            `${(minutes + 1) % 2}:${seconds >= 50 ? 0 : ''}${59 - seconds}`
          );
          setTime(newTime);
        }

        if (messageData.star === 'increment') {
          setImages((previousState) => {
            return previousState.map((image) => {
              return image.id !== messageData.id
              ? image
              : { ...image, stars: image.stars + 1 };
            })
            .sort((a, b) => b.stars - a.stars || b.id - a.id)
          })
        } else if (messageData.star === 'decrement') {
          setImages((previousState) => {
            return previousState.map((image) => {
              return image.id !== messageData.id
              ? image
              : { ...image, stars: image.stars - 1 };
            })
            .sort((a, b) => b.stars - a.stars || b.id - a.id)
          })
        }
      }
    }
  }, [])
  
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
        <NavBar setDisplayUploadFormModal={setDisplayUploadFormModal} setImages={setImages} setAreImagesLoading={setAreImagesLoading} theme={theme} setTheme={setTheme} time={time} setTime={setTime} />
        <main>
            <Loading />
          {areImagesLoading ? (
            <Loading />
          ) : (
            <Gallery images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} favourites={favourites} setFavourites={setFavourites} posts={posts} setPosts={setPosts} />
          )}
        </main>
        <GalleryImageModal setDisplayModal={setDisplayModal} modalImage={modalImage} displayModal={displayModal} />
        <UploadFormModal displayUploadFormModal={displayUploadFormModal} setDisplayUploadFormModal={setDisplayUploadFormModal} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} favourites={favourites} setFavourites={setFavourites} posts={posts} setPosts={setPosts} />
      </div>
    </Router>
  );
}

export default App;
