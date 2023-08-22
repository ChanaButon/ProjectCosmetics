import React from 'react';

import './App.css';
import Details from './clientComponent/Details';
import HomeClient from './clientComponent/HomeClient';
import Register from './clientComponent/register';
// import HomeClient from './clientComponent/HomeClient';
import Logo from './publicComponent/jsP/Logo';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import Mmm from './clientComponent/Mmm';
import { useState } from 'react';
import Entrance from './publicComponent/jsP/Entrance';
import Home from './publicComponent/jsP/Home';
import MainPage from './publicComponent/jsP/MainPage';
import ImageUploader from './professionalComponent/OwnerPage'
import Chat from './publicComponent/jsP/Chat';
import Button111 from './publicComponent/jsP/Button111';
import QuestionButtons from './publicComponent/jsP/Chat'
import H from './publicComponent/jsP/googleCalendar/googleCalnedar';
// import Register1 from './clientComponent/register1'
// import App1 from './publicComponent/jsP/googleCalendar/googleCalnedar';
// import Try from './publicComponent/jsP/Try'; 
// import Ch from './publicComponent/jsP/ch';
// import { Button } from 'bootstrap';
// import DatePicker from './publicComponent/jsP/date';
// import getCalendarEvents from './publicComponent/jsP/googleCalendar/googleCalnedar';
// import Calendar from './publicComponent/jsP/googleCalendar/tryGoogleCalendar';

function App() {

  const [firstTime, setFirstTime] = useState(true)
  // const [Home1, setHome1] = useState(true)

  return (
    <div className="App">


      <H/>
      {/* <Register1/> */}
      <Logo />
      <Home />

      {/* <App1 /> */}
      {/* <getCalendarEvents/> */}
      {/* <Calendar/> */}
      {/* <Try/> */}
      {/* <Ch/> */}
      {/* <DatePicker /> */}
      {/* <Button111/> */}
      {/* {firstTime ? <Entrance setFirstTime={setFirstTime} /> : " "} */}

      {/* {Home1 ? <Home setHome1={setHome1} /> : "null" } */}

      {/* <Chat/> */}

      {/* <ImageUploader/>  */}
      <Outlet />
      {/* <QuestionButtons/> */}

      {/* <MainPage/> */}



      {/* <nav>
        <Link to="Login">Login</Link>
      </nav>
      <nav>
        <Link to="HomeClient">HomeClient</Link>
      </nav> */}

      {/* <Login/> */}
      <br />
      {/* <HomeClient/> */}
      <br />
      {/* <Check/> */}

      {/* <Example/> */}



      {/* <Mmm/> */}
    </div>
  );
}

export default App;
