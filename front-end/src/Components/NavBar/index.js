import HamburgerMenu from './HamburgerMenu';
import Information from './Information';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  return (
    <nav>
      <HamburgerMenu handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} />
      <p className="theme">Nature</p>
      <Information />
    </nav>
  );
};

export default NavBar;
