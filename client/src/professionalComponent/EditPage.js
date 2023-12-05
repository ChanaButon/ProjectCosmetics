import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const EditForm = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const { value } = location.state || {};
    const [formData, setFormData] = useState(value || {});
const [dayList, setDayList] = useState([]);
const [dayWeekList, setDayWeekList] = useState([]);

 // const [formData, setFormData] = useState(value);
  //const [dayList, setDayList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
 
  const [dayweekList, setDayweekList] = useState([]);
  //const [try,setTry]=useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);


  console.log(value)


  const fetchData = async () => {
    try {
      // const response = await fetch('http://localhost:3321/product/getProducts');
      // if (response.ok) {
      //   const data = await response.json();
      //   const foundUser = data.find(a => a._id === userid);
      //   setUser(foundUser)
        if (value) {
          const dayPromises = value.WorkingDay.map(async (b) => {
            const dayResponse = await axios.get(`http://localhost:3321/timeDay/findDayById:${b}`);
            console.log(dayResponse.data)
            setDayWeekList(dayResponse.data)
             return dayResponse.data;
          });
          const dayResults = await Promise.all(dayPromises);
          setDayList(dayResults);

          const dayWeekPromises = dayResults.map(async (elemnt) => {
            const dayWeekResponse = await axios.get(`http://localhost:3321/days/findDayWeekById:${elemnt.id.Day}`);
           
           // console.log(dayWeekData)
           console.log(dayWeekResponse.data)
            return dayWeekResponse.data;
            
          });
          const dayWeekResults = await Promise.all(dayWeekPromises);
          setDayweekList(dayWeekResults);
          console.log(dayWeekResults)
        }
       else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.log(dayList)
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(dayList)
    console.log(dayweekList)

  }, []);


  const updateDetail = () => {
   const connectedList = [];  // Declare connectedList here
  dayweekList.forEach(dayweekItem => {
    const correspondingDay = dayList.find(dayItem => dayItem.id.Day === dayweekItem.id._id);
    console.log(dayweekItem);
    if (correspondingDay) {
      console.log(connectedList);
      connectedList.push({
        ...correspondingDay.id,
        "Day": dayweekItem.id.DayName
      });
    }
  });
     setDeatailUserList(connectedList);
    // setDeatailUserList((prevUser) => ({ ...prevUser, WorkingDay: connectedList, ...value }));

   };
  
 

  useEffect(() => {
    if (dayweekList.length > 0) {
      //fetchData();
      updateDetail();

    }
    if(deatailUserList.length!==0){
      setIsDataLoaded(true);
      console.log(deatailUserList)
      console.log("yessssssssssssssssss")
    }
  }, [dayweekList]);


  

  const UpdateProduct = async (value) => {
    try {

      const data1 = {
        _id: value._id,
         Name:value.Name,
         Addres:value.Addres,
         WorkingDay:deatailUserList.WorkingDay,
         //QueueList:response.data._id,
       };
       console.log(data1)
      const response = await axios.put('http://localhost:3321/product/updateProductById', data1);
      console.log(value)
     
      console.log(response)
      if (response.data) {
        console.log(response.data);
        return response.data; // Assuming your server sends a success message back
      } else {
        throw new Error('Error updating the product.');
      }
    } catch (error) {
      console.error(error);
      alert("אירעה שגיאה");
    }
  }




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('mioo');
    UpdateProduct(formData);
  };
    // onSave(formData);
  

  const handleExitClick = () => {
    navigate(-1); // Navigate to the main page
  };
  const formatDaysForDisplay = (workingDays) => {
    return workingDays.map(day => `${day.Day}: ${day.Start} - ${day.End}`).join(', ');
  };

  const formatDaysForDisplayWithButtons = (workingDays, handleDayButtonClick) => {
    return workingDays.map((day, index) => (
      <div key={index}>
        {`${day.Day}: ${day.Start} - ${day.End}`}
        <button onClick={() => handleDayButtonClick(index)}>Edit</button>
      </div>
    ));
  };
 



  // Add this function to handle the day button click
  const handleDayButtonClick = (index) => {
    setSelectedDayIndex(index);
    setShowModal(true);
  };
  const handleSaveChanges = () => {
    // Add logic to save changes made in the modal
    // For example, update the state, send a request to the server, etc.
    console.log('Changes saved!');
    setShowModal(false); // Close the modal after saving changes
  };
  
 
 

  return (
    <form onSubmit={handleSubmit}>
      <div>

      <button className="exit-button" onClick={handleExitClick}>
      X
    </button>
        <label>שם:</label>
        <input type="text" name="Name" value={formData.Name|| ''} onChange={handleChange} required />
      </div>
      <div>
        <label>משפחה:</label>
        <input type="text" name="Family" value={formData.Family|| ''} onChange={handleChange} required />
      </div>
      <div>
        <label>כתובת:</label>
        <input type="text" name="Addres" value={formData.Addres || ''}  onChange={handleChange} required />
      </div>
      <div>
        <label>תיאור:</label>
        <input type="text" name="Describe" value={formData.Describe || ''} onChange={handleChange} required />

      </div>
      <div>
      <label>ימי עבודה:</label>
      {/* <input
        type="text"
        name="WorkingDay"
       
        value={formatDaysForDisplay(deatailUserList) || ''}
        onChange={handleChange}
        required
      /> */}
      <label>ימי עבודה:</label>
      {formatDaysForDisplayWithButtons(deatailUserList, handleDayButtonClick)}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Edit Day"
      >
        {/* Your modal content */}
        {/* Include the necessary inputs for editing hours */}
        <button onClick={() => handleSaveChanges(selectedDayIndex)}>Save Changes</button>
      </Modal>
    </div>
    
      {/* Add more fields as needed */}
      <button  onClick={handleSubmit} type="submit">Save</button>
    </form>
  );
};


export default EditForm;
