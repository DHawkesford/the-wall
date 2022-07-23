import "./App.css";
import { useEffect, useState } from "react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/";
import Stars from "../Stars/";

function App() {
  const [images, setImages] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');

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
        <Stars />
        <Gallery galleryImages={images} setImagesFn={setImages} />
      </main>
    </div>
  );
}

export default App;
