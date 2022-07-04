import './App.css';
import { useState } from 'react';

function App() {
  const [images, setImages] = useState([
    {
      id: 0,
      url: "https://i.imgur.com/MdxZj97.jpeg",
      votes: 1,
    },
    {
      id: 1,
      url: "https://i.imgur.com/DMclSEf.jpeg",
      votes: 1
    },
    {
      id: 2,
      url: "https://i.imgur.com/Bt5kkYN.jpeg",
      votes: 3
    }
  ].sort((a, b) => b.votes - a.votes));

  function vote(id) {
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        setImages([
          ...images.slice(0, i), 
          {
            ...images[i],
            votes: images[i].votes + 1
          },
          ...images.slice(i + 1)
        ].sort((a, b) => b.votes - a.votes))
      }
    }
    console.log(images);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Gallery">
          {
            images.map((image, index) => 
            <div className="GalleryImage" key={index}>
              <img src={image.url} alt="A forest" />
              <p>Votes: {image.votes}</p>
              <button onClick={() => {vote(image.id)}}>Vote</button>
            </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
