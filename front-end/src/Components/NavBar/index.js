import HamburgerMenu from './HamburgerMenu';
import Information from './Information';
import photographer from './photographer.png';
import { useState } from 'react';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars, setDisplayUploadFormModal }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);

  return (
    <nav>
      <HamburgerMenu displayHamburgerMenu={displayHamburgerMenu} setDisplayHamburgerMenu={setDisplayHamburgerMenu} handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} setDisplayUploadFormModal={setDisplayUploadFormModal} />
      <p className="theme">
        <span>Today's theme is.. Nature!</span>
        <img src={photographer} className="theme-icon" alt="An illustration of a person with a camera on a strap around their neck." />
      </p>
      <Information setDisplayHamburgerMenu={setDisplayHamburgerMenu} />
    </nav>
  );
};

export default NavBar;
