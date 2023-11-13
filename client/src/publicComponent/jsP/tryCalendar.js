
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react'; // Import useState to manage the event detail visibility
import EventDetailModal from './eventDetailModal'; // Import your EventDetailModal component
import { FaSpinner } from 'react-icons/fa';

import './tryCalendar.css'; // Import your custom CSS for styling




const BusinessOwnerCalendar = ({appointmentData}) => {
  const [eventDetail, setEventDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(appointmentData)
  let events=[]
  const handleEventClick = (eventClickInfo) => {
    // Display the event detail when an event is clicked
    setEventDetail(eventClickInfo.event);
    setIsOpen(true); // Open the modal
  };
   // Function to close the event detail
   const closeEventDetail = () => {
    setEventDetail(null);
    setIsOpen(false); // Close the modal

  };


  const parseDateTime = (dateTimeString) => {
    console.log(dateTimeString)
    const parts = dateTimeString.split(', ');
    const dateParts = parts[0].split('/').map((part) => parseInt(part));
    const timePart = parts[1].split(' ');
    const timeParts = timePart[0].split(':').map((part) => parseInt(part));
    const [month, day, year] = dateParts;
    console.log(year)
    const [hour, minute] = timeParts.slice(0, 2);
    const isPM = timePart[1].toLowerCase() === 'pm';
    const adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
  console.log(year)
    console.log(new Date(year, month - 1, day, adjustedHour, minute))
    return new Date(year, month - 1, day, adjustedHour, minute);
  };
  // Convert the DateTime in appointmentData to FullCalendar-compatible format
   events = appointmentData.map((appointment) => {
    console.log(appointmentData)
    if (appointment.Customer && appointment.Customer.Name) {
      const start = parseDateTime(appointment.DateTime);
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + appointment.TreatmantType.TreatmantTime);
      return {
        title: `${appointment.TreatmantType.TreatmantName} - ${appointment.Customer.Name}`,
        start,
        end,
        extendedProps: {
          phone: appointment.Customer.Phone,
        },
      };
    }
    return null; // Skip this event if Customer or Customer.Name is undefined
  }).filter((event) => event !== null); // Filter out null events

  console.log(events.length,appointmentData.length>0)

  if(events.length===0&&appointmentData.length>0){
    return (
      <div className="spinner">
        <FaSpinner className="icon" />
      </div>
    );
  }
  const renderEventContent = (eventInfo) => {
    return (
      <div className="appointment-event">
        <p className="title">{eventInfo.event.title}</p>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]} // Include both dayGrid and timeGrid plugins
        initialView="timeGridWeek" // Set the initial view to timeGridWeek (or other time-based view)
        events={events}
        eventContent={renderEventContent}
        eventDisplay="list-item" 
        headerToolbar={{
          start: "today prev next",
          center:"title",
          end: "dayGridMonth timeGridWeek timeGridDay", 
        }}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay", "timeGridWeek", "timeGridDay"]} 
        eventClick={handleEventClick}
      />
       <EventDetailModal
        isOpen={isOpen}
        event={eventDetail}
        onRequestClose={closeEventDetail}
      />
    </div>
  );
};


export default BusinessOwnerCalendar;