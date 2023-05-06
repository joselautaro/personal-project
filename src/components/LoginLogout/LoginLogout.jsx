import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginWithGoogle } from './LoginWithGoogle/LoginWithGoogle';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const auth = firebase.auth();

export const LoginLogout = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="container">
        <LoginWithGoogle />
        {/* {!user && (
          <button className='container btn btn-info mt-2'>
            <Link to='/loginwithform'>Ingresar con email</Link>
          </button>
        )} */}
      </div>
    </>
  );
};

