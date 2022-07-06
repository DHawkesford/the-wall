import "./App.css";
import GalleryImage from "../GalleryImage";
import NavBar from "../NavBar/index";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <GalleryImage />
      </header>
    </div>
  );
}

export default App;
