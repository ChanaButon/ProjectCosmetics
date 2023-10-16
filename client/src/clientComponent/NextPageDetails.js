
import { useLocation } from 'react-router-dom';
import React ,{ useEffect, useState } from 'react'
import axios from 'axios' 


export default function NextPageDetails() {
  const location = useLocation();
  const { element } = location.state || {};
  console.log(element)
  
  console.log(element.TreatmantType)

  const tretmentType=element.TreatmantType
 
  console.log(tretmentType)


  const  deleteQueue = async () => 
  { 
  try{
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

 } catch (error) {
   console.error('Error delet user to the queue:', error);
   throw error;
 }
};




 




  return (
    <div className='colonterNextDetalis'>
      <h1>פרטי התור שלך</h1>
      <h2 >   שם הטיפול: {tretmentType.TreatmantName}  </h2>
      <h2 > {tretmentType.Price       }     :מחיר טיפול</h2>
      <h2 > {tretmentType.TreatmantTime}    : זמן טיפול</h2>
      <h2 > {element.DateTime}              :שעה ותאריך</h2>
      <button  className="buttonChenge" >שינוי תור
</button>
<button  onClick={deleteQueue} className="buttonDelete" >ביטול תור
</button>
      
      
    


   </div>

  )
}

