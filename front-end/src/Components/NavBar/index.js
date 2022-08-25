import HamburgerMenu from './HamburgerMenu';
import Information from './Information';
import photographer_1 from './photographer_1.png';
import photographer_2 from './photographer_2.png';
import photographer_3 from './photographer_3.png';
import photographer_4 from './photographer_4.png';
import photographer_5 from './photographer_5.png';
import photographer_6 from './photographer_6.png';
import photographer_7 from './photographer_7.png';
import photographer_8 from './photographer_8.png';
import { useState } from 'react';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars, setDisplayUploadFormModal }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);
  const photographerIcons = [photographer_1, photographer_2, photographer_3, photographer_4, photographer_5, photographer_6, photographer_7, photographer_8];
  const [currentPhotographer, setCurrentPhotographer] = useState(photographerIcons[Math.floor(Math.random()*photographerIcons.length)]);

  function randomisePhotographer() {
    const temp = [...photographerIcons];
    const indexOfCurrentPhotographer = temp.indexOf(currentPhotographer);
    temp.splice(indexOfCurrentPhotographer, 1)
    setCurrentPhotographer(temp[Math.floor(Math.random()*(temp.length))])
  }

  return (
    <nav>
      <HamburgerMenu displayHamburgerMenu={displayHamburgerMenu} setDisplayHamburgerMenu={setDisplayHamburgerMenu} handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} setDisplayUploadFormModal={setDisplayUploadFormModal} />
      <p className="theme">
        <span>Today's theme is.. Nature!</span>
        <img src={currentPhotographer} key={currentPhotographer} className="theme-icon" onClick={randomisePhotographer} alt="An illustration of a person with a camera on a strap around their neck." title="Change the photographer!" />
      </p>
      <Information setDisplayHamburgerMenu={setDisplayHamburgerMenu} />
    </nav>
  );
};

export default NavBar;
