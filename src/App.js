import { useEffect, useState } from 'react';
import Login from'./Login'
import './App.css';
import firebase from "./firebase"

function App() {
  const [user ,setUser] = useState()
  const [email ,setEmail] = useState()
  const [password ,setPassword] = useState()
  const [emailError ,setEmailError] = useState()
  const [passwordError ,setPasswordError] = useState()
  const [hasAccount ,sethasAccount] = useState(false)
  
  const clearInput =()=>{
    setEmail('');
    setPassword('');
  }

  const clearErrors =() =>{
    setEmailError('');
    setPasswordError('');
  }


  const handleLogin = () =>{
    clearErrors();
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
    clearErrors();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalide-email":
          setEmailError(err.message);
          break;
          case "auth/Weak-Password":
          setPasswordError(err.message);
          break;

      }
    })
  }

  const handleLogout =() =>{
    firebase.auth().signOut();
  };

  const authListener =() =>{
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        clearInput();
        setUser(user);
      }else{
        setUser("");
      }
    });
  };
   
  useEffect(()=>{
    authListener();
  },[])



  return (
    <div className="App">
      <h1>Hello </h1>
 <Login 
     email={email} 
     setEmail={setEmail}
     password={password}
     handleLogin={handleLogin}
     handleSignup={handleSignup}
     hasAccount={hasAccount}
     sethasAccount={sethasAccount}
     emailError={emailError}
     passwordError={passwordError}
   />   
    </div>
  );
}

export default App;



