import './App.css';
import stub from '../../data.js'
import { useState } from 'react';

function App() {
  const [images, setImages] = useState(stub.sort((a, b) => b.votes - a.votes));

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

  function voteImproved(idOfVotedItem) {
    setImages((previousState) => {
      return previousState.map((image) => {
        return image.id !== idOfVotedItem
          ? image
          : { ...image, votes: image.votes + 1 };
      }).sort((a, b) => b.votes - a.votes);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Gallery">
          {
            images.map((image, index) => 
            <div className="GalleryImage" key={[image.id, index]}>
              <img src={image.url} alt="Alt text" />
              <p>Votes: {image.votes}</p>
              <button onClick={() => {voteImproved(image.id)}}>Vote</button>
            </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
