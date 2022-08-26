import { Routes, Route } from "react-router-dom";
import Home from './Home';

const Gallery = ({ galleryImages, setImagesFn, usersStars, setUsersStars, showModal }) => {
  return (
    <Routes>
      <Route path="/favourites" element={<p>Favourites page</p>} />
      <Route path="/posts" element={<p>Posts</p>} />
      <Route path="/" element={
        <Home galleryImages={galleryImages} setImagesFn={setImagesFn} usersStars={usersStars} setUsersStars={setUsersStars} showModal={showModal} />
      }/>
      {/* <Route path="/" element={
        <div className="Gallery">
            {galleryImages.map((image, index) => <GalleryImage image={image} star={star} usersStars={usersStars} key={[image.id, index]} showModal={showModal} setUsersStars={setUsersStars} />)}
        </div>}
      /> */}
    </Routes>
  );
};

export default Gallery;
