
import { useLocation } from 'react-router-dom';
import React ,{ useEffect, useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './NextPageDetail.css'

export default function NextPageDetails() {

  
  const location = useLocation();
  const { element } = location.state || {};
  console.log(element)
  const [visible, setVisible] = useState(true);
  const navigate=useNavigate();

  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  // console.log(element)
  
  // console.log(element.TreatmantType)

  const tretmentType=element.TreatmantType
 
  // console.log(tretmentType)
  const parseDateString = (dateTimeString) => {

  
    const parsedDate = moment(dateTimeString, 'DD/MM/YYYY, HH:mm:ss').toDate();
    return parsedDate;

  };


  const checkIf12HoursPassed = (dateTimeString) => {
    const currentDate = new Date();
    // const targetDateObject = new Date(dateTimeString);
    const parsedDate = parseDateString(dateTimeString);
    console.log(parsedDate)
    // Calculate the time difference in milliseconds
    const timeDifference = parsedDate - currentDate;
  
    // Convert milliseconds to hours
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    // Check if the difference is greater than 12 hours
    return hoursDifference > 12;
  };
  

  const Chat = () => {
    console.log(element)
    axios.get(`http://localhost:3321/User/findUserById/${element.Customer}`).then((res) => {
      console.log(res.data);
      const userSend = {"user":res.data.id};
      if (res.data.status === false) {

        alert("not found")
      }
      else {

        //עדכון לסטור
        console.log(userSend)
        navigate("/SignUp/MainPage",{state:{userSend}});
      }
    }
  ).catch ((err) => {
    console.log(err);
    alert("אירעה שגיאה")
  })
    setVisible(false)
  }




  const  deleteQueue = async () => 
  { 
    setIsDetailsVisible(false);
  try{

    const dateTimeString = element.DateTime; // Replace this with your actual DateTime string
    const is12HoursPassed = checkIf12HoursPassed(dateTimeString);
    console.log(is12HoursPassed)
  if (is12HoursPassed){
      console.log('At least 12 hours have passed since the given time.');
      setIsDetailsVisible(false);

   
      console.log("למחוקקקקקקקקקקקקקקקקקקקקקקקקקקקקקק")
      const idQueueFind = await axios.delete(`http://localhost:3321/queue/deleteQueueById:${element._id}`);
      if(idQueueFind.data){
       console.log(idQueueFind.data);
       return "התור נמחק בהצלחה" // Assuming your server sends a success message back
      }
      else {
       throw new Error('Error delet user to the queue.');
     }
    } 
     else {
      console.log('Less than 12 hours have passed since the given time.');
      alert('אי אפשר למחוק את התור כיוון שיש פחות מ - 12 שעות עד התור');
      setIsDetailsVisible(true); // Set back the visibility in case of an error
  
    }

    
   } catch (error) {
     console.error('Error delet user to the queue:', error);
     throw error;
   }
   

}


  return (
    <div className='colonterNextDetalis'>
      {isDetailsVisible ? (
        <>
          <h1>פרטי התור שלך</h1>
          <h2>שם הטיפול: {element.TreatmantType.TreatmantName}</h2>
          <h2>{element.TreatmantType.Price}: מחיר טיפול</h2>
          <h2>{element.TreatmantType.TreatmantTime}: זמן טיפול</h2>
          <h2>{element.DateTime}: שעה ותאריך</h2>
          {/* <button onClick={() => Chat()} className="buttonChenge">שינוי תור</button> */}
<button onClick={deleteQueue} className="buttonDelete">ביטול תור</button>
        </>
      ): (
        <div>
          <h1>פרטי התור בוטלו</h1>
          <button onClick={() => Chat()} className="scheduleButton">לקביעת תור חדש</button>
        </div>
      )}
    
    </div>
  );
}




