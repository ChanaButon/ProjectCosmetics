import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';
import CalendarEvents from './CalendarEvents';

const GoogleApp = () => {
  const [accessToken, setAccessToken] = useState('');
  const [events, setEvents] = useState([]);

  const handleAuthSuccess = (accessToken) => {
    setAccessToken(accessToken);
    fetchCalendarEvents(accessToken);
  };

  const fetchCalendarEvents = async (accessToken) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvents(data.items);
      } else {
        throw new Error('Failed to fetch calendar events');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>      
            <GoogleAuth onAuthSuccess={handleAuthSuccess} />
            {accessToken && <CalendarEvents events={events} />}
          </div>
        );
      };
      
      export default App;
      
