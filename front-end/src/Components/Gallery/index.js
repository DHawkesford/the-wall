import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Favourites from './Favourites';
import Posts from './Posts';

const Gallery = ({ images, setImages, usersStars, setUsersStars, showModal, webSocket, favourites, setFavourites, posts, setPosts }) => {

  return (
    <Routes>
      <Route path="/favourites" element={
        <Favourites usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} favourites={favourites} setFavourites={setFavourites} />
      } />
      <Route path="/posts" element={
        <Posts usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} posts={posts} setPosts={setPosts}/>
      } />
      <Route path="/" element={
        <Home images={images} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} webSocket={webSocket} />
      } />
    </Routes>
  );
};

export default Gallery;
