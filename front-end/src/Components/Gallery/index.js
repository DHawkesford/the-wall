import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Favourites from './Favourites';
import Posts from './Posts';

const Gallery = ({ galleryImages, setImages, usersStars, setUsersStars, showModal }) => {
  return (
    <Routes>
      <Route path="/favourites" element={
        <Favourites galleryImages={galleryImages} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      } />
      <Route path="/posts" element={
        <Posts galleryImages={galleryImages} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      } />
      <Route path="/" element={
        <Home galleryImages={galleryImages} setImages={setImages} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      } />
      {/* <Route path="/" element={
        <div className="Gallery">
            {galleryImages.map((image, index) => <GalleryImage image={image} star={star} usersStars={usersStars} key={[image.id, index]} showModal={showModal} setUsersStars={setUsersStars} />)}
        </div>}
      /> */}
    </Routes>
  );
};

export default Gallery;
