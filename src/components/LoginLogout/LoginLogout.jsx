import React from 'react'
import  {LoginWithGoogle}  from './LoginWithGoogle/LoginWithGoogle'
import { Link } from 'react-router-dom'
// import { LoginWithForm } from './LoginWithForm/LoginWithForm'

export const LoginLogout = () => {
  return (
    <>
        <div className="container">
            
        <LoginWithGoogle/>
        <button className='container btn btn-info mt-2'>
            <Link to='/loginwithform'>Ingresar con email</Link> 
        </button>        
        </div>
    </>
  )
}
