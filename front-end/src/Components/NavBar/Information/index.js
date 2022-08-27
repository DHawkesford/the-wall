import infoIcon from './info_icon.svg';
import hamburgerIconDark from './hamburger_icon_dark.svg';
import githubIcon from './github_icon.png';
import favIcon from './favicon.png';
import CloseButton from '../../CloseButton';
import { Routes, Route, Link } from "react-router-dom";

const Information = ({ setDisplayHamburgerMenu, displayInfo, setDisplayInfo }) => {
    const infoClasses = displayInfo ? "info-modal show-info-modal" : "info-modal hide-info-modal";

    // Closes the info modal when clicking outside of it by setting the displayInfo boolean to be false
    document.addEventListener(
        "click",
        (e) => {
        // Does not set displayInfo to be false if the user is clicking on the info icon (this would negate the effect of opening the info)
        if (!e.target.closest(".info-modal") && !e.target.closest('.info-icon') && !e.target.closest(".info-button")) {
            setDisplayInfo(false);
        }}
    )

    function closeInfoAndOpenMenu() {
        setDisplayInfo(false);
        setDisplayHamburgerMenu(true);
    }

    return (
        <>
            <div className="info">
                <img src={infoIcon} className="info-icon" onClick={() => {setDisplayInfo(true)}} alt="A circle containing the letter i in lower-case." />
                <a href="https://github.com/DHawkesford/the-wall" className="github-icon" target="_blank" rel="noreferrer">
                    <img src={githubIcon} alt="The GitHub Invertocat logo, which is a cat silhouette." />
                </a>
                <Routes>
                    <Route path="*" element={
                        <Link to="/">
                            <img src={favIcon} className="logo" alt="The app's logo, a brick wall." />
                        </Link>
                    } />
                    <Route path="/" element={
                        <img src={favIcon} className="logo" onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}} alt="The app's logo, a brick wall." />
                    } />
                </Routes>
            </div>
            <div className={infoClasses}>
                <p className="info-modal-title">
                    The Wall
                    <CloseButton handleClick={() => setDisplayInfo(false)} uniqueId="close-button-info-modal" />
                </p>
                <p>The purpose of The Wall is to help encourage you to keep active by giving you a fun goal to focus on during your walk, run, cycle, or any other activity you like that involves moving around your local surroundings.</p>
                <p>Each day, a new theme will appear at the top of the page. When you're out on your walk or other activity, try to find something in your local area that matches that day's theme, and snap a photo of it. Submit your photo to the site (The Wall is adaptive for mobile, so you can even do this on the go!), check out what other users have posted, and vote on your favourites!</p>
                <div className="info-modal-open-menu-wrapper">
                    <p>Log in and upload your pictures using the menu at the top-left hand corner of the page:</p>
                    <button className="info-modal-open-menu-button" onClick={closeInfoAndOpenMenu}>
                        <img src={hamburgerIconDark} className="hamburger-icon" alt="A hamburger menu icon, which is three horizontal lines in a column." />
                        <span>Open menu</span>
                    </button>
                </div>
            </div>
        </>
    )
};

export default Information;