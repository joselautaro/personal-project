import React from 'react'

export const Profile = (props) => {

  return (
    <div className='mt-5'>Nombre: {props.user && props.user.displayName}</div>

  )
}



