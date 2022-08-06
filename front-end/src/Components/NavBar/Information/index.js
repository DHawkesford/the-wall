import infoIcon from './info_icon.svg';
import { useState } from 'react';

const Information = () => {
    const [displayInfo, setDisplayInfo] = useState(false);
    const infoClasses = displayInfo ? "modal-darken-background show-info-modal" : "modal-darken-background hide-info-modal";

    // Closes the info modal when clicking outside of it by setting the displayInfo boolean to be false
    document.addEventListener(
        "click",
        (e) => {
        // Does not set displayInfo to be false if the user is clicking on the info icon (this would negate the effect of opening the info)
        if (!e.target.closest(".info-modal") && !e.target.closest('.info-icon')) {
            setDisplayInfo(false);
        }}
    )

    return (
        <div className="info">
            <img src={infoIcon} className="info-icon" onClick={() => {setDisplayInfo(!displayInfo)}} alt="A circle containing the letter i in lower-case." />
            <span>The Wall</span>
            <div className={infoClasses}>
                <section className="info-modal">
                    <div>Hello</div>
                </section>
            </div>
        </div>
    )
};

export default Information;