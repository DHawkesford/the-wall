import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import hamburgerIcon from './hamburger_icon.svg';
import { useState } from 'react';

const NavBar = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);
  const hamburgerMenuClasses = displayHamburgerMenu ? "hamburger-menu show-hamburger-menu" : "hamburger-menu hide-hamburger-menu";

  const { isAuthenticated } = useAuth0();

  // Closes the hamburger menu when clicking outside of it by setting the displayHamburgerMenu boolean to be false
  document.addEventListener(
    "click",
    (e) => {
      // Does not set displayHamburgerMenu to be false if the user is clicking on the hamburger icon (this would negate the effect of opening the menu)
      if (!e.target.closest(".hamburger-menu") && !e.target.closest('.hamburger-icon')) {
        setDisplayHamburgerMenu(false);
      }
    }
  )

  return (
    <nav className="navbar">
      <img src={hamburgerIcon} className="hamburger-icon" onClick={() => {setDisplayHamburgerMenu(!displayHamburgerMenu)}} alt="A hamburger menu icon, which is three horizontal lines in a column." />
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
