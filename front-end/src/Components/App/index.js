import "./App.css";
import { useEffect, useState } from "react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/index";

function App() {
  const [images, setImages] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');

  function inputChange(e) {
    setNewImageURL(e.target.value);
  }

  function addImageToGallery() {
    const newImage = {
      id: Math.random() * 500,
      url: newImageURL,
      votes: 0
    }
    setImages([...images, newImage])
    setNewImageURL('');
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
        <Gallery galleryImages={images} setImagesFn={setImages} />
      </main>
    </div>
  );
}

export default App;
