import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// Import your components here
import HomeClient from './clientComponent/HomeClient';
import Details from './clientComponent/Details';
import Login from './professionalComponent/Login';
import Register from './clientComponent/register';
import SignUp from './publicComponent/jsP/SignUp';
import MainPage from './publicComponent/jsP/MainPage';
import NextPageDetails from './clientComponent/NextPageDetails';
import OwnerPage from './professionalComponent/OwnerPage';
import Chat from './publicComponent/jsP/Chat';
import BusinessLogin from './professionalComponent/BusinessLogin';
import { Provider } from 'react-redux';
import store from './redux/store';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const supabase = createClient(
  "https://ijgctsmreooiifdarsua.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ2N0c21yZW9vaWlmZGFyc3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5MjQ3MzYsImV4cCI6MjAwMDUwMDczNn0.NrlO5In-BhoEJiNEWQDSZT-rZLtZGhYn5VaWZF9nwY8"
);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='HomeClient' element={<HomeClient />} />
              <Route path='Details' element={<Details />} />
              <Route path='/register' element={<Register />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/SignUp' element={<SignUp />} />
              <Route path='/SignUp/MainPage' element={<MainPage />} />
              <Route path='/register/MainPage' element={<MainPage />} />
              <Route path='/Login/BusinessLogin/MainPage' element={<MainPage />} />
              <Route path='NextPageDetails' element={<NextPageDetails />} />
              <Route path='/SignUp/MainPage/OwnerPage' element={<OwnerPage />} />
              <Route path='SignUp/MainPage/Chat' element={<Chat />} />
              <Route path='/Login/BusinessLogin' element={<BusinessLogin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </SessionContextProvider>
  </React.StrictMode>
);
reportWebVitals();
