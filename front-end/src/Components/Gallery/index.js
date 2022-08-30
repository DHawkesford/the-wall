import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Favourites from './Favourites';
import Posts from './Posts';
import webSocket from '../Socket';
import { useEffect } from 'react'; 

const Gallery = ({ images, setImages, usersStars, setUsersStars, showModal }) => {
  useEffect(() => {
    webSocket.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const messageData = JSON.parse(e.data)

        // if (messageData.star === 'test') {
        //   console.log(messageData.payload);
        //   setImages(messageData.payload);
        // }

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
  }, [setImages])

  return (
    <Routes>
      <Route path="/favourites" element={
        <Favourites images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} />
      } />
      <Route path="/posts" element={
        <Posts images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} />
      } />
      <Route path="/" element={
        <Home images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} />
      } />
    </Routes>
  );
};

export default Gallery;
