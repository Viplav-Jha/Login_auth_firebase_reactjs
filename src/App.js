import { useState } from 'react';
import './App.css';
import firebase from "./firebase"

function App() {
  const [user ,setUser] = useState()
  const [email ,setEmail] = useState()
  const [password ,setPassword] = useState()
  const [emailError ,setEmailError] = useState()
  const [passwordError ,setPasswordError] = useState()
  const [hasAccount ,sethasAccount] = useState(false)

  const handleLogin = () =>{
     firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .catch(err => {
       switch(err.code) {
         case "auth/invalide-email":
         case "auth/user-disable":
         case "auth/user-not-found":
           setEmailError(err.message);
           break;
           case "auth/wrong-password":
             setPasswordError(err.message);
             break;
 
       }

     })
  }
   
  const handleSignup =() =>{
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalide-email":
          setEmailError(err.message);
          break;
          case "auth/Weak-Password"
          setPasswordError(err.message);
          break

      }
    })
  }



  return (
    <div className="App">
      <h1>Hello world</h1>   
    </div>
  );
}

export default App;



