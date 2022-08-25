import closeIconNormal from './close_icon_normal.png';
import closeIconHover from './close_icon_hover.png';

const CloseButton = ({ handleClick, uniqueId, disabled }) => {
    function hover() {
        const element = document.getElementById(uniqueId)
        element.src = closeIconHover;
    }
      
    function unhover() {
        const element = document.getElementById(uniqueId)
        element.src = closeIconNormal;
    }

    return (
        disabled ? (
            <img src={closeIconNormal} id={uniqueId} className="close-icon-disabled" alt="An uppercase letter X." />
        ) : (
            <img src={closeIconNormal} id={uniqueId} className="close-icon" onClick={() => {handleClick()}} onMouseOver={hover} onMouseOut={unhover} alt="An uppercase letter X." />
        )
    )
};

export default CloseButton;