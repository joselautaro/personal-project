import React from 'react'
import { Link } from 'react-router-dom'


export const NavBar = () => {
  return (
    <>
        <Link to='/'>Post</Link>
        <Link to='/profile'>My profile</Link>
    </>
  )
}
