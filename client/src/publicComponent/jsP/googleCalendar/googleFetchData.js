import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';

// Load environment variables from .env file
require('dotenv').config();

const GoogleAuth = ({ onAuthSuccess }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await loadAuth2();
      await handleAuthChange();
    };

    initAuth();
  }, []);

  const loadAuth2 = () => {
    return new Promise((resolve, reject) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: process.env.CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  };

  const handleAuthChange = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    setIsSignedIn(auth.isSignedIn.get());

    auth.isSignedIn.listen((isSignedIn) => {
      setIsSignedIn(isSignedIn);
      if (isSignedIn) {
        onAuthSuccess(auth.currentUser.get().getAuthResponse().access_token);
      }
    });
  };

  const handleSignIn = () => {
    console.log("כניסה")
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      {isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;
