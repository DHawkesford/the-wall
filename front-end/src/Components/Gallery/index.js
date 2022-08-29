import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Favourites from './Favourites';
import Posts from './Posts';

const Gallery = ({ images, setImages, usersStars, setUsersStars, showModal, client }) => {
  return (
    <Routes>
      <Route path="/favourites" element={
        <Favourites images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      } />
      <Route path="/posts" element={
        <Posts images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      } />
      <Route path="/" element={
        <Home images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} client={client}/>
      } />
    </Routes>
  );
};

export default Gallery;
