import HamburgerMenu from './HamburgerMenu';
import Information from './Information';
import { useState } from 'react';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);

  return (
    <nav>
      <HamburgerMenu displayHamburgerMenu={displayHamburgerMenu} setDisplayHamburgerMenu={setDisplayHamburgerMenu} handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} />
      <p className="theme">Nature</p>
      <Information setDisplayHamburgerMenu={setDisplayHamburgerMenu} />
    </nav>
  );
};

export default NavBar;
