import { useAuth0 } from "@auth0/auth0-react";

const HamburgerMenuItem = ({ handleClick, imageSrc, imageAlt, itemText, redirectIfNotAuthenticated, className }) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    function handleClickOrRedirect () {
        if (redirectIfNotAuthenticated && !isAuthenticated) {
            loginWithRedirect()
        } else if (handleClick !== null) {
            handleClick();
        }
    }

    return (
        <div className={`hamburger-menu-item-wrapper ${className}`} onClick={handleClickOrRedirect} >
            <img src={imageSrc} alt={imageAlt} />
            <p>{itemText}</p>
        </div>
    )
}

export default HamburgerMenuItem;