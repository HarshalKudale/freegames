import React from 'react'

import PropTypes from 'prop-types'

import '../static/css/gameview.css'

const GameView = ({game}) => {
  function gameType(type){
    if(type === "Game" ||type === "BASE_GAME" || type === "freegame" )
    {
        return "GAME"
    }
    else return "DLC";
  }
  return (
    <div className="main-container">
      <div className="game-details">
          <img
            alt={"thumbnail"}
            src={game.thumbnail}
            className="game-thumbnail-image"
          />
        <div className="game-title">
          <h1 className="game-title-text">{game.title}</h1>
        </div>
      </div>
      <div className="game-offer">
        <div className="game-offer-period-type">
          <h1 className="game-offer-platform">{game.platform}</h1>
        </div>
        <div className="game-offer-claim">
          <button className="game-offer-claim-button" onClick={()=>window.open(game.url, "_blank")}>CLAIM {gameType(game.type)}</button>
        </div>
      </div>
    </div>
  )
}


export default GameView
