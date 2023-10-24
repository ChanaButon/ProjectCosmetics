
import React, { useState, useEffect } from 'react';
// import Details from "../clientComponent/Details";
// import Home from "../publicComponent/jsP/Home";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HomeClient from "../clientComponent/HomeClient";
import EditAppointmentForm from './EditAppointmentForm';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

const dummyAppointments = [
  {
    _id: '1',
    DateTime: new Date('2023-10-15T15:30:00.000Z'),
    TreatmentType: '6524811f043e683f3a9b1bd5',
    Customer: '6525dc46db773689c6683d7c',
    Status: true,
  },
  // Add more dummy appointments as needed
];




const ImageUploader = () => {
  const location = useLocation();
  const { value,tretment } = location.state || {};
  console.log(tretment)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [findQueue,setFindQueue] = useState([])
  
  const [ isEditing, setIsEditing] = useState(false);
 
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setIsEditing(true);
  };

  const handleSaveEdit = (editedAppointment) => {
    // Implement logic to save edited appointment data
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  function onDateChange(date) {
    setSelectedDate(date);
  }

  const filteredAppointments = dummyAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.DateTime);
    return (
      appointmentDate.getFullYear() === selectedDate.getFullYear() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getDate() === selectedDate.getDate()
    );
  });
 
const myQueue = async ()  => {
  
  const queuesPromises =value.QueueList.map(async (element) => {
    
  try{  
      const res = await axios.get(`http://localhost:3321/queue/getQueueById:${element}`)
      console.log(res.data)
      if(res.data){
        //const dataQueue=res.data
       // setFindQueue(...findQueue,dataQueue)
       // findQueue.push(dataQueue)
       return res.data[0]
    
      }}
    catch(error){
      console.error(error);
      alert("אירעה שגיאה");

    }
  
  } );
     let queueResult=await Promise.all(queuesPromises);
     console.log(queueResult)
     queueResult= queueResult.filter(appointment => Boolean(appointment))
     setFindQueue(queueResult)
  }






  function fileSelectedHandler(event) {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function fileUploadHandler() {
    // Replace the URL with your own endpoint
    const url = "https://example.com/upload";
    const formData = new FormData();
    formData.append("image", selectedFile);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle successful uploads
      })
      .catch((error) => {
        // Handle errors
      });


    }

    useEffect(() => {

      myQueue()
     
   // }
  }, []);

 useEffect(() => {
      
      console.log(findQueue)     
  }, [findQueue]);

  return (
    <div>
      <h1> ברוכים הבאים {value.Name} </h1>
      
      {/* <Calendar onChange={onDateChange} value={selectedDate} locale="en-US"/> */}
      <h2>Appointments for {selectedDate.toDateString()}:</h2>
      <ul>
        {filteredAppointments.map(appointment => (
          <li key={appointment._id}>
            DateTime: {appointment.DateTime.toLocaleString()}<br />
            TreatmentType: {appointment.TreatmentType}<br />
            Customer: {appointment.Customer}<br />
            Status: {appointment.Status.toString()}<br/>
            <button onClick={() => setEditingAppointment(appointment)}>Edit</button>
          </li>
        ))}
      </ul>
      
      <input type="file" onChange={fileSelectedHandler} />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" style={{ maxWidth: "10%" }} />
      )}
      {selectedFile && <button onClick={fileUploadHandler}>Upload</button>}

      {isEditing && (
        <EditAppointmentForm
          appointment={editingAppointment}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      <HomeClient />


    </div>
  );
};

export default ImageUploader
