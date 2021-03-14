import React, { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig)

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: ''
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email
      }
      setUser(signedInUser);
    })
    .catch(error => {
      alert('Something went wrong!!')
    })
  }

  //Sign out
  const handleSignOut = () => {
    console.log('clicked');
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: ''
      }
      setUser(signOutUser)
    })
    .catch(error => {})
  }

  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
    if(event.target.name === 'email'){
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isEmailValid);
    }
    else if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d/.test(event.target.value);
      console.log(isPasswordValid && passwordHasNumber);
    }
  }
  const handleSubmit = () => {

  }

  return (
    <div className="App">
      
      {
        user.isSignedIn && <div><p>Welcome, {user.name}</p>
        <p>Your email: {user.email}</p></div>
      }
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      {/* <button onClick={handleSignIn}>Sign in</button> */}

      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onBlur={handleBlur} placeholder="Write your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
