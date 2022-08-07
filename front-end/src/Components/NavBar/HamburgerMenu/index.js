import LoginButton from "../../LoginButton";
import LogoutButton from "../../LogoutButton";
import CloseButton from '../../CloseButton';
import Profile from "../../Profile";
import hamburgerIcon from './hamburger_icon.svg';
import newPhotoIcon from './new_photo_icon.png';
import { useAuth0 } from "@auth0/auth0-react";

const HamburgerMenu = ({ handleClick, handleChange, newImageURL, usersStars, getUsersStars, setDisplayHamburgerMenu, displayHamburgerMenu }) => {
    const hamburgerMenuClasses = displayHamburgerMenu ? "hamburger-menu show-hamburger-menu" : "hamburger-menu hide-hamburger-menu";
  
    const { isAuthenticated } = useAuth0();

    // Closes the hamburger menu when clicking outside of it by setting the displayHamburgerMenu boolean to be false
    document.addEventListener(
        "click",
        (e) => {
        // Does not set displayHamburgerMenu to be false if the user is clicking on the hamburger icon or open menu button (this would negate the effect of opening the menu)
        if (!e.target.closest(".hamburger-menu") && !e.target.closest('.hamburger-icon') && !e.target.closest('.info-modal-open-menu-button')) {
            setDisplayHamburgerMenu(false);
        }}
    )

    return (
        <>
            <div className="hamburger-icon-wrapper">
                <img src={hamburgerIcon} className="hamburger-icon" onClick={() => {setDisplayHamburgerMenu(!displayHamburgerMenu)}} alt="A hamburger menu icon, which is three horizontal lines in a column." />
            </div>
            <div className={hamburgerMenuClasses}>
                <CloseButton handleClick={() => setDisplayHamburgerMenu(false)} uniqueId="close-button-hamburger-menu" />
                <div className="hamburger-links">
                    <a>
                        <img src={newPhotoIcon} className="hamburger-link-icon" alt="A simple square illustration of mountains under a clear sky. In the bottom-right corner there is a circle containing a plus sign." />
                        {/* <input type="text" className="input" onChange={handleChange} value={newImageURL} />
                        <button className="submit" onClick={handleClick}>submit</button> */}
                    </a>
                    <a>
                        <Profile />
                    </a>
                    <a>
                        {isAuthenticated ? (
                        <>
                            <button onClick={getUsersStars}>Get your stars</button>
                            <p>
                            {usersStars ? (
                                usersStars.map(star => <>{star}, </>)
                            ) : (
                                "No user's stars defined"
                            )}
                            </p>
                        </>
                        )
                        : null
                        }
                    </a>
                    <a>
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <LoginButton />
                        )}
                    </a>
                </div>
            </div>
        </>
    )
}

export default HamburgerMenu;