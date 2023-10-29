import React, {  useState } from "react";
import { useNavigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
// import Login from '../../professionalComponent/Login'
// import Entrance from './Entrance'
// import axios from './axios'
// import './Home.css'


export default function Home() {

  const [visible, setVisible] = useState(true);
  const navigate=useNavigate()
  const loginCliant = () => {
       
    navigate("register")
    setVisible(false)

  }

  const loginOwner = () => {
        
    navigate("Login")
    setVisible(false)


    }

    const signUp = () => {
        
      navigate("SignUp")
      setVisible(false)
  
  
      }

 
  return (
    <>
       {visible ? <div>      
        <h1 className="fff">?פעם ראשונה שלך כאן </h1>
        <button onClick={loginCliant} className="button1">לחץ להרשמה</button>

        {/* <button className="myButton">Scroll to Top</button> */}

        <h1 className="fff">בעל עסק חדש כאן </h1>
        <button onClick={loginOwner} className="button1">לחץ להרשמה</button>
        
        
        <h1 className="fff">לכניסה למערכת </h1>
        <button onClick={signUp} className="button1">לחץ להתחברות</button>

        </div> : <div />}

    </>
  )
}


