import HamburgerMenu from './HamburgerMenu';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  return (
    <nav className="navbar">
      <HamburgerMenu handleClick={handleClick} handleChange={handleChange} newImageURL={newImageURL} usersStars={usersStars} getUsersStars={getUsersStars} />
    </nav>
  );
};

export default NavBar;
