import { useState } from 'react';

const ScrollToTop = () => {
  const [display, setDisplay] = useState(false);
  const showOrHideClassName = display ? "show-scroll-to-top" : "hide-scroll-to-top";

  document.addEventListener(
    "scroll",
    (e) => {
      if (window.scrollY === 0) {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    }
  )

  return (
    <button className={`scroll-to-top ${showOrHideClassName}`} onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}></button>
  );
};

export default ScrollToTop;