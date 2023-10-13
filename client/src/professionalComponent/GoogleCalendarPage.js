import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleCalendarPage = () => {
  const [events, setEvents] = useState([]);

  const fetchGoogleCalendarEvents = async () => {
    try {
      // For testing purposes, you can fetch dummy events from a local JSON file
      const response = await axios.get('/dummy-events.json');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
    }
  };

  useEffect(() => {
    // Fetch Google Calendar events when the component mounts
    fetchGoogleCalendarEvents();
  }, []);

  return (
    <div>
      <h2>Google Calendar Events</h2>
      {/* Display Google Calendar events */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.summary} - {event.start.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleCalendarPage;
