import "./App.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/";
// import Stars from "../Stars/";

function App() {
  const [images, setImages] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');
  const { user, isAuthenticated, getAccessTokenWithPopup } = useAuth0();
  const [usersStars, setUsersStars] = useState(null);

  const getUsersStars = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
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

      const starredImageIDs = [];

      for (let i = 0; i < users_stars.payload.length; i++ ) {
        starredImageIDs.push(users_stars.payload[i].imageid)
      }
      setUsersStars(starredImageIDs);
    } catch (e) {
      console.log(e.message);
    }
  };

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

  useEffect(() => {
    async function getImages() {
      const response = await fetch('https://the-wall-dan-blake.herokuapp.com/images');
      const data = await response.json();
      setImages(data.payload);
    }

    getImages();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar handleClick={addImageToGallery} handleChange={inputChange} newImageURL={newImageURL} />
      </header>
      <main>
        {isAuthenticated
        ? (
        <div>
          <button onClick={getUsersStars}>Get your stars</button>
          <p>
            {usersStars ? (
              usersStars.map(star => <>{star.imageid}, </>)
            ) : (
              "No user's stars defined"
            )}
          </p>
        </div>
        )
        : null
        }
        <Gallery galleryImages={images} setImagesFn={setImages} usersStars={usersStars} setUsersStars={setUsersStars} />
      </main>
    </div>
  );
}

export default App;
