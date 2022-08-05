import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import hamburgerIcon from './hamburger_icon.svg';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <input type="text" className="input" onChange={handleChange} value={newImageURL}/>
      <button className="submit" onClick={handleClick}>submit</button>
      <LoginButton />
      <LogoutButton />
      <Profile />
      {isAuthenticated ? (
        <div>
          <button onClick={getUsersStars}>Get your stars</button>
          <p>
            {usersStars ? (
              usersStars.map(star => <>{star}, </>)
            ) : (
              "No user's stars defined"
            )}
          </p>
        </div>
        )
        : null
      }
      <img src={hamburgerIcon} alt="A hamburger menu icon, which is three horizontal lines in a column." />
    </nav>
  );
};

export default NavBar;
