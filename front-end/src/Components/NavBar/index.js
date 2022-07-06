const NavBar = ({ handleClick, handleChange, newImageURL }) => {
  return (
    <nav className="navbar">
      <input type="text" className="input" onChange={handleChange} value={newImageURL}/>
      <button className="submit" onClick={handleClick}>submit</button>
    </nav>
  );
};

export default NavBar;
