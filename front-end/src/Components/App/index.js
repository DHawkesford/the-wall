import "./App.css";
import stub from "../../data.js";
import { useState } from "react";
import GalleryImage from "../GalleryImage";
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

  return (
    <div className="App">
      <header className="App-header">
        <NavBar handleClick={addImageToGallery} handleChange={inputChange} newImageURL={newImageURL} />
        <GalleryImage galleryImages={images} setImagesFn={setImages} />
      </header>
    </div>
  );
}

export default App;
