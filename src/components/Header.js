import React from 'react'
import logo from '../static/images/logo.png'

import '../static/css/header.css'

const Header = () => {
  return (
    <header data-role="Header" className="header">
    <img
      alt={"logo"}
      src={logo}
      className="header-image"
    />
    <div >
        <button className="header-text" onClick={()=>window.open("https://github.com/HarshalKudale", "_blank")}>About</button>
    </div>
  </header>
  )
}

export default Header