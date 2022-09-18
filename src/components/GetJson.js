import React from 'react'
import { useState,useEffect } from 'react'
import { getFreeGames } from './GamesApi'
export default function GetJson() {
    const [freeGames, setfreeGames] = useState()
    useEffect(() => {
        getFreeGames().then(data => {
            console.log(data)
            setfreeGames(data);
          })
    }, [])
    
  return (
    <div>{JSON.stringify(freeGames)}</div>
  )
}
