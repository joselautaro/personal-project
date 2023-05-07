// // import React from 'react'
// // import { Post } from './Post'
// // import { useContext } from 'react'
// // // import { db } from '../../firebase'
// // // import { collection } from 'firebase/firestore'
// // // import { PostsContext } from '../../context/PostsContext'
// // import { LoginLogout } from '../LoginLogout/LoginLogout'

// // export const MyPost = () => {

// //   // const { posts } = useContext(PostsContext)

  

// //   return (
// //     <div>
// //       <LoginLogout/>
// //       <Post />
// //     </div>
// //   )
// // }

// import { useState } from 'react';
// import { LoginLogout } from '../LoginLogout/LoginLogout';
// import { Post } from './Post';

// export const MyPost = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Aquí deberías implementar la lógica para iniciar sesión del usuario
//     setIsLoggedIn(true);
//   }

//   const handleLogout = () => {
//     // Aquí deberías implementar la lógica para cerrar sesión del usuario
//     setIsLoggedIn(false);
//   }

//   return (
//     <div>
//       <LoginLogout onLogin={handleLogin} onLogout={handleLogout} />
//       <Post disabled={!isLoggedIn} />
//     </div>
//   );
// }
// En este ejemplo, utilizamos el estado isLoggedIn para controlar si el usuario ha iniciado sesión o no. Luego, pasamos este estado como una propiedad al componente Post, donde lo utilizamos para deshabilitar el botón de publicar.

// También hemos agregado los métodos handleLogin y handleLogout para manejar el inicio y cierre de sesión del usuario. Estos métodos deben implementarse de acuerdo a la lógica de inicio y cierre de sesión de tu aplicación.
















