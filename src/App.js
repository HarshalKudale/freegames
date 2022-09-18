
import './static/css/App.css';
import { useEffect, useState } from 'react';
import { getAmazonGames, getEpicGames, getSteamGames, getFreeGames,getUbisoftGames } from './components/GamesApi';
import Header from './components/Header';
import Banner from './components/Banner';
import Hero from './components/Hero';
function App() {
  // const [epicgames, setepicgames] = useState()
  // const [steamgames, setsteamgames] = useState()
  // const [amazongames, setamazongames] = useState()
  const [freeGames, setfreeGames] = useState([])
  const [loading, setloading] = useState(true)
  // useEffect(() => {
  //   // getEpicGames("US").then((data) => {
  //   //   setepicgames(data)
  //   //   console.log(data)
  //   // })
  //   // getSteamGames("US").then((data) => {
  //   //   setsteamgames(data)
  //   //   console.log(data)
  //   // })
  //   // getAmazonGames().then((data)=>{
  //   //   setamazongames(data)
  //   //   console.log(data)
  //   // })
  //   // getUbisoftGames().then((data)=>{
  //   //   console.log(data)
  //   // })
  //   // setloading(true)
  //   // getFreeGames().then(data => {
  //   //   console.log(data)
  //   //   setfreeGames(data);
  //   //   setloading(false)
  //   // })
  // }, [])

  return (
    <>
    <div className="App">
      <Header></Header>
      <Banner></Banner>
      <Hero></Hero>
    </div>
    </>
  );
}

export default App;
