import closeIconNormal from './close_icon_normal.png';
import closeIconHover from './close_icon_hover.png';

const CloseButton = ({ handleClick }) => {
    function hover() {
        const element = document.getElementsByClassName('close-icon')
        element[0].src = closeIconHover;
    }
      
    function unhover() {
        const element = document.getElementsByClassName('close-icon')
        element[0].src = closeIconNormal;
    }

    return (
        <img src={closeIconNormal} className="close-icon" onClick={() => {handleClick()}} onMouseOver={hover} onMouseOut={unhover} alt="An uppercase letter X." />
    )
};

export default CloseButton;