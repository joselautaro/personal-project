// import React from 'react'
// import { Link } from 'react-router-dom'


// export const NavBar = () => {
//   return (
//     <>
//         <Link to='/'>Post</Link>
//         <Link to='/profile'>My profile</Link>
//     </>
//   )
// }
import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';


export const NavBar = () => {


  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-expand-lg flex-row-reverse fixed-top">
      <div className="container-fluid">
        <Link to='/'>Logo</Link>
        <button className="navbar-toggler menu-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      Menu
    </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to='/profile'>Mi perfil</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}




