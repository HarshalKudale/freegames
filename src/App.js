import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import {getEpicGames, getSteamGames} from './components/GamesApi';
function App() {
  const [epicgames, setepicgames] = useState()
  const [steamgames, setsteamgames] = useState()
  useEffect(() => {
    getEpicGames("US").then((data) => {
      setepicgames(data)
    })
    getSteamGames("US").then((data) => {
      setsteamgames(data)
    })

  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
