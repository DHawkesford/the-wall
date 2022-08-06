import infoIcon from './info_icon.svg';
import hamburgerIconDark from './hamburger_icon_dark.svg';
import { useState } from 'react';

const Information = ({ setDisplayHamburgerMenu }) => {
    const [displayInfo, setDisplayInfo] = useState(false);
    const infoClasses = displayInfo ? "info-modal show-info-modal" : "info-modal hide-info-modal";

    // Closes the info modal when clicking outside of it by setting the displayInfo boolean to be false
    document.addEventListener(
        "click",
        (e) => {
        // Does not set displayInfo to be false if the user is clicking on the info icon (this would negate the effect of opening the info)
        if (!e.target.closest(".info-modal") && !e.target.closest('.info-icon')) {
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
                <img src={infoIcon} className="info-icon" onClick={() => {setDisplayInfo(!displayInfo)}} alt="A circle containing the letter i in lower-case." />
                <span>The Wall</span>
            </div>
            <div className={infoClasses}>
                <p className="info-modal-title">The Wall</p>
                <p>The purpose of The Wall is to help encourage you to keep active by giving you a fun goal to focus on during your walk, run, cycle, or any other activity you like that involves moving around your local surroundings.</p>
                <p>Each day, a new theme will appear at the top of the page. When you're out on your walk or other activity, try to find something in your local area that matches that day's theme. Submit your photo once home (mobile site coming soon..), and check out what other users have posted, and vote on your favourites!</p>
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