import HamburgerMenu from './HamburgerMenu';
import Information from './Information';
import photographer_1 from './photographer_1.png';
import photographer_2 from './photographer_2.png';
import photographer_3 from './photographer_3.png';
import photographer_4 from './photographer_4.png';
import photographer_5 from './photographer_5.png';
import photographer_6 from './photographer_6.png';
import photographer_7 from './photographer_7.png';
import photographer_8 from './photographer_8.png';
import { useEffect, useState } from 'react';

const NavBar = ({ setDisplayUploadFormModal, setImages, setAreImagesLoading }) => {
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);
  const photographerIcons = [photographer_1, photographer_2, photographer_3, photographer_4, photographer_5, photographer_6, photographer_7, photographer_8];
  const [currentPhotographer, setCurrentPhotographer] = useState(photographerIcons[Math.floor(Math.random()*photographerIcons.length)]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [theme, setTheme] = useState('Loading...');

  useEffect(() => {
    async function getTheme() {
      const response = await fetch('https://the-wall-dan-blake.herokuapp.com/themes/today');
      const data = await response.json();
      setTheme(data.payload[0].theme);
    }

    getTheme();
  }, []); 

  function randomisePhotographer() {
    const temp = [...photographerIcons];
    const indexOfCurrentPhotographer = temp.indexOf(currentPhotographer);
    temp.splice(indexOfCurrentPhotographer, 1)
    setCurrentPhotographer(temp[Math.floor(Math.random()*(temp.length))])
  }

  return (
    <nav>
      <HamburgerMenu displayHamburgerMenu={displayHamburgerMenu} setDisplayHamburgerMenu={setDisplayHamburgerMenu} setDisplayUploadFormModal={setDisplayUploadFormModal} setImages={setImages} setAreImagesLoading={setAreImagesLoading} setDisplayInfo={setDisplayInfo} />
      <p className="theme">
        <span>Today's theme is.. {theme}!</span>
        {isFirstLoad ? (
          <img src={currentPhotographer} key={currentPhotographer} className="theme-icon-first-load" onClick={() => {randomisePhotographer(); setIsFirstLoad(false);}} alt="An illustration of a person with a camera on a strap around their neck." title="Change the photographer!" />
        ) : (
          <img src={currentPhotographer} key={currentPhotographer} className="theme-icon" onClick={randomisePhotographer} alt="An illustration of a person with a camera on a strap around their neck." title="Change the photographer!" />
        )}
      </p>
      <Information setDisplayHamburgerMenu={setDisplayHamburgerMenu} displayInfo={displayInfo} setDisplayInfo={setDisplayInfo} />
    </nav>
  );
};

export default NavBar;
