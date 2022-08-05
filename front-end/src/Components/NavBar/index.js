import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import hamburgerIcon from './hamburger_icon.svg';
import { useState } from 'react';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);
  const hamburgerMenuClasses = displayHamburgerMenu ? "hamburgerMenu show-hamburger-menu" : "hamburgerMenu hide-hamburger-menu";

  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <img src={hamburgerIcon} onClick={() => {setDisplayHamburgerMenu(!displayHamburgerMenu)}} alt="A hamburger menu icon, which is three horizontal lines in a column." />
      <div className={hamburgerMenuClasses}>
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
      </div>
    </nav>
  );
};

export default NavBar;
