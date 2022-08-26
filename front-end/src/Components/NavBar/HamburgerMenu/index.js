import CloseButton from '../../CloseButton';
import HamburgerMenuItem from "./HamburgerMenuItem";
import Profile from "../../Profile";
import hamburgerIcon from './hamburger_icon.svg';
import newPhotoIcon from './new_photo_icon.png';
import starIconGold from '../../Gallery/GalleryImage/star_icon_gold.svg';
import gitHubIcon from '../Information/github_icon.png';
import infoIcon from '../Information/info_icon.svg';
import loadingIcon from './loading_icon.png';
import postsIcon from './posts_icon.png';
import logoutIcon from './logout_icon.png';
import loginIcon from './login_icon.png';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ setDisplayHamburgerMenu, displayHamburgerMenu, setDisplayUploadFormModal, setImages, setAreImagesLoading, setDisplayInfo }) => {
    const hamburgerMenuClasses = displayHamburgerMenu ? "hamburger-menu show-hamburger-menu" : "hamburger-menu hide-hamburger-menu";
  
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

    // Closes the hamburger menu when clicking outside of it by setting the displayHamburgerMenu boolean to be false
    document.addEventListener(
        "click",
        (e) => {
        // Does not set displayHamburgerMenu to be false if the user is clicking on the hamburger icon or open menu button (this would negate the effect of opening the menu)
        if (!e.target.closest(".hamburger-menu") && !e.target.closest('.hamburger-icon') && !e.target.closest('.info-modal-open-menu-button')) {
            setDisplayHamburgerMenu(false);
        }}
    )

    async function filterImagesByUsersStarred() {
        setAreImagesLoading(true); 
        const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/users/${user.sub}/favourites`);
        const data = await response.json();
        setImages(data.payload);
        setAreImagesLoading(false);
    }

    async function filterImagesByUsersPosts() {
        setAreImagesLoading(true); 
        const response = await fetch(`https://the-wall-dan-blake.herokuapp.com/users/${user.sub}/posts`);
        const data = await response.json();
        setImages(data.payload);
        setAreImagesLoading(false);
    }

    async function refreshGallery() {
        setAreImagesLoading(true); 
        const response = await fetch('https://the-wall-dan-blake.herokuapp.com/images');
        const data = await response.json();
        setImages(data.payload);
        setAreImagesLoading(false);
    }

    function closeHamburgerAndOpenInfo() {
        setDisplayInfo(true);
        setDisplayHamburgerMenu(false);
    }
    
    return (
        <>
            <div className="hamburger-icon-wrapper">
                <img src={hamburgerIcon} className="hamburger-icon" onClick={() => {setDisplayHamburgerMenu(!displayHamburgerMenu)}} alt="A hamburger menu icon, which is three horizontal lines in a column." />
            </div>
            <div className={hamburgerMenuClasses}>
                <div className="hamburger-menu-header">
                    <Profile />
                    <CloseButton handleClick={() => setDisplayHamburgerMenu(false)} uniqueId="close-button-hamburger-menu" />
                </div>
                <div className="hamburger-menu-items">
                    <HamburgerMenuItem className="submit-button" handleClick={() => {
                        setDisplayUploadFormModal(true);
                        setDisplayHamburgerMenu(false)
                        }} imageSrc={newPhotoIcon} imageAlt="A simple square illustration of mountains under a clear sky. In the bottom-right corner there is a circle containing a plus sign." itemText="Submit a photo" redirectIfNotAuthenticated={true}/>
                    <HamburgerMenuItem className="load-button" handleClick={refreshGallery} imageSrc={loadingIcon} imageAlt="Two arrows as a circle, pointing towards each other." itemText="Refresh the gallery" redirectIfNotAuthenticated={false}/>
                    <Link className="text-link" to="/test">
                        <HamburgerMenuItem className="star-button" handleClick={null} imageSrc={starIconGold} imageAlt="A gold star." itemText="See your starred posts" redirectIfNotAuthenticated={true}/>
                    </Link>
                    <HamburgerMenuItem className="manage-button" handleClick={filterImagesByUsersPosts} imageSrc={postsIcon} imageAlt="An illustration of a stack of photo frames." itemText="Manage your posts" redirectIfNotAuthenticated={true}/>
                    <HamburgerMenuItem className="github-button" handleClick={() => {window.open("https://github.com/DHawkesford/the-wall", "_blank")}} imageSrc={gitHubIcon} imageAlt="The GitHub Invertocat logo, which is a cat silhouette." itemText="Check out the GitHub" redirectIfNotAuthenticated={false}/>
                    <HamburgerMenuItem className="info-button" handleClick={closeHamburgerAndOpenInfo} imageSrc={infoIcon} imageAlt="A circle containing the letter i in lower-case." itemText="See info" redirectIfNotAuthenticated={false}/>
                    {isAuthenticated ? (
                        <HamburgerMenuItem className="log-out-button" handleClick={() => logout({ returnTo: window.location.origin })} imageSrc={logoutIcon} imageAlt="A simple square illustration of mountains under a clear sky. In the bottom-right corner there is a circle containing a plus sign." itemText="Log out" redirectIfNotAuthenticated={false}/>
                    ) : (
                        <HamburgerMenuItem className="log-in-button" handleClick={() => loginWithRedirect()} imageSrc={loginIcon} imageAlt="A simple square illustration of mountains under a clear sky. In the bottom-right corner there is a circle containing a plus sign." itemText="Log in" redirectIfNotAuthenticated={false} />
                    )}
                </div>
            </div>
        </>
    )
}

export default HamburgerMenu;