import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";

const NavBar = ({ handleClick, handleChange, newImageURL }) => {
  return (
    <nav className="navbar">
      <input type="text" className="input" onChange={handleChange} value={newImageURL}/>
      <button className="submit" onClick={handleClick}>submit</button>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </nav>
  );
};

export default NavBar;
