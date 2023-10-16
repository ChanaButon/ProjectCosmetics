
import { useLocation } from 'react-router-dom';
import React ,{ useEffect, useState } from 'react'


export default function NextPageDetails() {
  const location = useLocation();
  const { element } = location.state || {};
  console.log(element)
  
  console.log(element.TreatmantType)

  const tretmentType=element.TreatmantType
 
  console.log(tretmentType)


  const  deleteQueue = () => 
  { 
    if (element.Status){
      element.Status= false

    }
    console.log(element)

  }




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
