
import { useLocation } from 'react-router-dom';
import React ,{ useEffect, useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';



export default function NextPageDetails() {
  const location = useLocation();
  const { element } = location.state || {};
  const [visible, setVisible] = useState(true);
  const navigate=useNavigate();

  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  console.log(element)
  
  console.log(element.TreatmantType)

  const tretmentType=element.TreatmantType
 
  console.log(tretmentType)

  const checkIf12HoursPassed = (dateTimeString) => {

    const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    const parsedDate = new Date(dateTimeString); // Parse the DateTime string into a Date object
    console.log(parsedDate)
    const currentTime = new Date(); // Get the current time
    console.log(currentTime)
    

    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(parsedDate - currentTime); 
    
    console.log(timeDifference)
    console.log(twelveHoursInMilliseconds)
    // Compare if the time difference is greater than or equal to 12 hours
    return timeDifference >= twelveHoursInMilliseconds;
  };

  const Chat = () => {
        
    navigate("/Chat")
    setVisible(false)
  }




  const  deleteQueue = async () => 
  { 
    setIsDetailsVisible(false);
  try{

    const dateTimeString = element.DateTime; // Replace this with your actual DateTime string
    const is12HoursPassed = checkIf12HoursPassed(dateTimeString);

  if (is12HoursPassed){
      console.log('At least 12 hours have passed since the given time.');
      setIsDetailsVisible(false);

      if (element.Status){
        element.Status= false
      }
      console.log(element)
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
          <button  onClick={() =>Chat()} className="buttonChenge">שינוי תור</button>
          <button onClick={deleteQueue} className="buttonDelete">ביטול תור</button>
        </>
      ): (
        <div>
          <h1>פרטי התור בוטלו</h1>
          <button  onClick={() =>Chat()}   className="scheduleButton">לקביעת תור חדש</button>
        </div>
      )}
    
    </div>
  );
}






