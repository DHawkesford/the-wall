import HamburgerMenu from './HamburgerMenu';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  return (
    <nav>
      <HamburgerMenu handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} />
      <p>Nature</p>
      <p>The Wall</p>
    </nav>
  );
};

export default NavBar;
