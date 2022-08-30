import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Favourites from './Favourites';
import Posts from './Posts';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import webSocket from '../Socket';
import { useEffect } from 'react'; // add in useRef if changing back

const Gallery = ({ images, setImages, usersStars, setUsersStars, showModal }) => {
  // const webSocket = useRef(null);

  useEffect(() => {
    // webSocket.current = new W3CWebSocket("https://the-wall-dan-blake.herokuapp.com".replace(/^http/, 'ws'), 'broadcast-protocol');

    webSocket.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const messageData = JSON.parse(e.data)

        if (messageData.star === 'test') {
          console.log(messageData.payload);
        }

        if (messageData.star === 'increment') {
          setImages((previousState) => {
            return previousState.map((image) => {
              return image.id !== messageData.id
              ? image
              : { ...image, stars: image.stars + 1 };
            })
            .sort((a, b) => b.stars - a.stars)
          })
        } else if (messageData.star === 'decrement') {
          setImages((previousState) => {
            return previousState.map((image) => {
              return image.id !== messageData.id
              ? image
              : { ...image, stars: image.stars - 1 };
            })
            .sort((a, b) => b.stars - a.stars)
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
