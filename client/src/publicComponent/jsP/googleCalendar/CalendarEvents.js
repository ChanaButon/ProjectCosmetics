import React from 'react';

const CalendarEvents = ({ events }) => {
  return (
    <div>
      <h2>Calendar Events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.summary}</h3>
          <p>{event.start.dateTime}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarEvents;
