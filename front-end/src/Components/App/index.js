import "./App.css";
import stub from "../../data.js";
import { useEffect, useState } from "react";
import Gallery from "../Gallery";
import NavBar from "../NavBar/index";

function App() {
  const [images, setImages] = useState(stub.sort((a, b) => b.votes - a.votes));
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
      const data = await fetch('localhost:3000/images');
      const payload = await data.json();
      console.log(payload);
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
