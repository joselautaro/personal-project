import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Post } from "../../Post/Post";

// Configura Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCYOIVZqI4KK0EIy9eZZ8gWt7j0tvlrt6E",
    authDomain: "qipa-project.firebaseapp.com",
    projectId: "qipa-project",
    storageBucket: "qipa-project.appspot.com",
    messagingSenderId: "1001885740223",
    appId: "1:1001885740223:web:275975aa14f64569a5aa0a",
    measurementId: "G-3XKHVC0R92"
};

firebase.initializeApp(firebaseConfig);


// Crea una instancia del proveedor de autenticación de Google
const provider = new firebase.auth.GoogleAuthProvider();

export const LoginWithGoogle = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Obtiene el objeto de autenticación de Firebase
  const [user, loading, error] = useAuthState(firebase.auth());

  // Maneja el evento de click en el botón de login con Google
  const handleLoginClick = () => {
    firebase.auth().signInWithRedirect(provider);
    setIsLoggedIn(true)
  };
  const handleLogoutClick = () => {
    firebase.auth().signOut();
    setIsLoggedIn(false)
  };

  // Si el usuario está autenticado, muestra un mensaje de bienvenida y el botón de logout
  if (user) {
    return (
      
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h5 className="text-center my-4">Te damos la bienvenida, {user.displayName}</h5>
        <button className="btn btn-danger mb-3" onClick={handleLogoutClick}>
          Cerrar sesión
        </button>
        
        <Post disabled={!isLoggedIn}/>
      </div>
    );
  }

  // Si el usuario está autenticado, muestra un mensaje de bienvenida
  if (user) {
    return <h3 className="text-center my-4">Te damos la bienvenida, {user.displayName}</h3>;
  }

  // Si el usuario no ha iniciado sesión aún, muestra el botón de login con Google
  return (

    <div className="d-flex justify-content-center align-items-center flex-column mt-3">
      {loading && <div className="m-5 ">Aguarde unos segundos...</div>}
      <button className="btn btn-danger mt-5" onClick={handleLoginClick}>
        <i className="bi bi-google"></i>Para usar esta aplicación, debe loguearse con google
      </button>
      
      {error && <div className="text-danger mt-3">Error: {error.message}</div>}
    </div>
  );
}
// _____________________________________________________________________



