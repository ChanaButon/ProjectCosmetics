// import React, { useEffect, useState } from 'react';
// import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

// const GoogleCalendarConnect = () => {
//   const supabase = useSupabaseClient();
//   const { session } = useSessionContext();
//   const [googleConnected, setGoogleConnected] = useState(false);

//   // Check if the user is already connected to Google Calendar
//   useEffect(() => {
//     console.log(session,googleConnected)
//     if (session!==null&& session.user) {
//       // Replace 'googleCalendarTable' with the name of your Supabase table
//       const { data, error } = supabase
//         .from('googleCalendarTable')
//         .select()
//         .eq('user_id', session.user.id)
//         .single();

//       if (data) {
//         setGoogleConnected(true);
//       }
//     }
//   }, [session]);

//   // Handle Google Sign-In
//   const handleGoogleSignIn = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         scopes: 'https://www.googleapis.com/auth/calendar',
//       },
//     });

//     if (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

//   return (
//     <div>
      
//         <div>
//           {googleConnected ? (
//             <p>You are connected to Google Calendar.</p>
//           ) : (
//             <button onClick={handleGoogleSignIn}>Connect to Google Calendar</button>
//           )}
//         </div>
      
//     </div>
//   );
// };

// // export default GoogleCalendarConnect;
// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';



// function BusinessOwnerCalendar() {
//   const appointmentData = [
//     {
//         "_id": "652b4181f7b0ea13c05a52e8",
//         "DateTime": "10/16/2023, 5:21:00 AM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "652c45f1f9d484cea9cde9da",
//         "DateTime": "10/16/2023, 5:21:00 AM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "65319e63c7a6d4e2e2dedabd",
//         "DateTime": "10/23/2023, 7:00:00 AM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "65319e1dc7a6d4e2e2deda8d",
//             "Name": "יהלה",
//             "FamilyName": "רועי",
//             "ID": "333240653",
//             "Password": "12345678",
//             "Mail": "yahalaroi13@gmail.com",
//             "Phone": "0547045594",
//             "UserType": "64f1aca42838b6acac126f3a",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "6534983788f8e94abe959357",
//         "DateTime": "10/29/2023, 5:00:00 PM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "6534988888f8e94abe9593b4",
//         "DateTime": "10/30/2023, 6:00:00 PM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "6534989688f8e94abe9593d7",
//         "DateTime": "10/30/2023, 6:00:00 PM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "653498fc88f8e94abe959441",
//         "DateTime": "10/29/2023, 5:00:00 PM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     },
//     {
//         "_id": "65349e1588f8e94abe9596d8",
//         "DateTime": "11/5/2023, 7:45:00 PM",
//         "TreatmantType": {
//             "_id": "6525dc86db773689c6683dc3",
//             "TreatmantName": "גבות/שפם",
//             "Price": 60,
//             "TreatmantTime": 30,
//             "__v": 0
//         },
//         "Customer": {
//             "_id": "6525dc46db773689c6683d7c",
//             "Name": "חנה",
//             "FamilyName": "בוטון",
//             "ID": "324151026",
//             "Password": "1234",
//             "Mail": "chanabuton@gmail.com",
//             "Phone": "0506715796",
//             "UserType": "64f1b0b2a21df4d97f005b02",
//             "__v": 0
//         },
//         "Status": true,
//         "__v": 0
//     }
//   ]
//   const [events, setEvents] = useState([ {
//     "_id": "65349e1588f8e94abe9596d8",
//     "DateTime": "11/5/2023, 7:45:00 PM",
//     "TreatmantType": {
//         "_id": "6525dc86db773689c6683dc3",
//         "TreatmantName": "גבות/שפם",
//         "Price": 60,
//         "TreatmantTime": 30,
//         "__v": 0
//     },
//     "Customer": {
//         "_id": "6525dc46db773689c6683d7c",
//         "Name": "חנה",
//         "FamilyName": "בוטון",
//         "ID": "324151026",
//         "Password": "1234",
//         "Mail": "chanabuton@gmail.com",
//         "Phone": "0506715796",
//         "UserType": "64f1b0b2a21df4d97f005b02",
//         "__v": 0
//     },
//     "Status": true,
//     "__v": 0
// }]);
//   const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);

//   const handleDatesSet = (info) => {
//     console.log(info.view && info.view.activeStart)
//     if (info.view && info.view.activeStart) {
//       const clickedDate = info.view.activeStart.toISOString().split('T')[0]; // Get the displayed date in ISO format
//       console.log(clickedDate)
//       const appointmentsForSelectedDate = appointmentData.filter(appointment => {
//         const appointmentDate = appointment.DateTime.split(',')[0];
//         console.log(new Date(appointmentDate) ,new Date(clickedDate))
//         return new Date(appointmentDate) > new Date(clickedDate);
//       });
//       console.log(appointmentsForSelectedDate)

//       setSelectedDateAppointments(appointmentsForSelectedDate);
//     }
//   };

//   useEffect(() => {
//     // You can fetch appointment data from an API or database and set it in the 'appointmentData' state.
//   }, []);

//   const renderEventContent = (eventInfo) => {
//     return (
//       <div className="event-queue-item">
//         <p>Appointment Time: {eventInfo.event.extendedProps.DateTime}</p>
//         <p>Treatment Type: {eventInfo.event.extendedProps.TreatmantType.TreatmantName}</p>
//         <p>Customer Name: {eventInfo.event.extendedProps.Customer.Name}</p>
//         {/* Include other appointment details as needed */}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridWeek"
//         events={events}
//         datesSet={handleDatesSet}
//         eventContent={renderEventContent} // Render event content with the customized function
//         eventDisplay="block" // Display events as blocks to create a queue-like appearance
//       />
//       {selectedDateAppointments.length > 0 && (
//         <div>
//           <h3>Appointments for Selected Date:</h3>
//           <ul>
//             {selectedDateAppointments.map(appointment => (
//               <li key={appointment._id}>
//                 <p>Appointment Time: {appointment.DateTime}</p>
//                 <p>Treatment Type: {appointment.TreatmantType.TreatmantName}</p>
//                 <p>Customer Name: {appointment.Customer.Name}</p>
//                 {/* Include other appointment details as needed */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BusinessOwnerCalendar;import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react'; // Import useState to manage the event detail visibility
import EventDetailModal from './eventDetailModal'; // Import your EventDetailModal component
//import appointments from './'

// import './tryCalendar.css'; // Import your custom CSS for styling




const BusinessOwnerCalendar = ({appointmentData}) => {
  const [eventDetail, setEventDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(appointmentData)
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
    const [hour, minute] = timeParts.slice(0, 2);
    const isPM = timePart[1].toLowerCase() === 'pm';
    const adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
  
    return new Date(year, month - 1, day, adjustedHour, minute);
  };
  // Convert the DateTime in appointmentData to FullCalendar-compatible format
  const events = appointmentData.map((appointment) => {
    console.log(appointment.DateTime)
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
  });
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