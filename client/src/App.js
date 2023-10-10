import React from 'react';

import './App.css';
//import Details from './clientComponent/Details';
//import HomeClient from './clientComponent/HomeClient';
// import Register from './clientComponent/register';
// import HomeClient from './clientComponent/HomeClient';
import Logo from './publicComponent/jsP/Logo';
import { Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Mmm from './clientComponent/Mmm';
import { useState } from 'react';
// import Entrance from './publicComponent/jsP/Entrance';
import Home from './publicComponent/jsP/Home';
// import MainPage from './publicComponent/jsP/MainPage';
// import ImageUploader from './professionalComponent/OwnerPage'
// import Chat from './publicComponent/jsP/Chat';
// import Button111 from './publicComponent/jsP/Button111';
// import QuestionButtons from './publicComponent/jsP/Chat'
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

  // const [firstTime, setFirstTime] = useState(true)
  

  return (
    <div className="App">


      <H/>
      <Logo />
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
