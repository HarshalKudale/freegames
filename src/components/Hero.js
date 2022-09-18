import React from 'react'
import { useEffect, useState } from 'react';
import GameView from './GameView'
import '../static/css/hero.css'
import {getFreeGames} from './GamesApi'
const Hero = (props) => {
    const [freeGames, setfreeGames] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
      setloading(true)
      getFreeGames().then(data => {
        console.log(data)
        setfreeGames(data);
        setloading(false)
      })
    }, [])
  return (
    <div className="hero-container">
        {!loading && freeGames.length>0 && freeGames.map((game,index)=>{

            return (<GameView game={game}></GameView>)
        })}
        {loading && <div className="hero-loading"><div className="spinner"></div>  CRAWLING FREE GAMES FOR YOU</div>}
    </div>
  )
}

export default Hero