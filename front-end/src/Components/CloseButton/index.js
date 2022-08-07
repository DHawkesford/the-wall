import closeIconNormal from './close_icon_normal.png';
import closeIconHover from './close_icon_hover.png';

const CloseButton = ({ handleClick, uniqueId }) => {
    function hover() {
        const element = document.getElementById(uniqueId)
        element.src = closeIconHover;
    }
      
    function unhover() {
        const element = document.getElementById(uniqueId)
        element.src = closeIconNormal;
    }

    return (
        <img src={closeIconNormal} id={uniqueId} className="close-icon" onClick={() => {handleClick()}} onMouseOver={hover} onMouseOut={unhover} alt="An uppercase letter X." />
    )
};

export default CloseButton;