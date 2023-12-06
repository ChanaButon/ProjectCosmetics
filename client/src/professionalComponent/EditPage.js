import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AddTreatmentModal from './AddTreatmentModal';


const EditForm = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [newTreatment, setNewTreatment] = useState('');
    const [editedWorkingDay, setEditedWorkingDay] = useState({});
    const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(null);
    const [editedTreatment, setEditedTreatment] = useState({});
    const [selectedNewTreatment, setSelectedNewTreatment] = useState(null);
    const [showTreatmentModal, setShowTreatmentModal] = useState(false);  
    const { value } = location.state || {};
    const [formData, setFormData] = useState(value || {});
const [dayList, setDayList] = useState([]);
const [dayWeekList, setDayWeekList] = useState([]);
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const statusOptions = ['true', 'false'];
const [TreatmantID, setTreatmantID] = useState([
  "גבות/שפם",
  "מניקור",
  "פדיקור",
  "טיפול פנים",
  "הלחמת ריסים"
]);

const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);

 // const [formData, setFormData] = useState(value);
  //const [dayList, setDayList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
 
  const [dayweekList, setDayweekList] = useState([]);
  //const [try,setTry]=useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const updatedTreatments = [...formData.TreatmantID];

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
  
   const handleAddTreatmentClick = () => {
    // Open the modal or dropdown to select a new treatment
    // For simplicity, let's assume you have a modal for this
    // and the selected treatment will be stored in selectedNewTreatment
    setShowAddTreatmentModal(true);
  };

  const handleAddTreatment = () => {
    // Check if a treatment is selected
    if (selectedNewTreatment) {
      // Add the selected treatment to the TreatmantID list
      setTreatmantID([...TreatmantID, selectedNewTreatment]);

      // Close the modal or reset the state
      setShowAddTreatmentModal(false);
      setSelectedNewTreatment(null);
      setNewTreatment(''); // Clear the newTreatment state
    }
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
      const treatmantIDs = value.TreatmantID.map((treatment) => treatment._id);

      const data1 = {
        _id: value._id,
         Name:value.Name,
         Addres:value.Addres,
        //  WorkingDay:deatailUserList.WorkingDay,
         //QueueList:response.data._id,
         TreatmantID:treatmantIDs,
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
    setEditedWorkingDay(deatailUserList[index]); // Initialize editedWorkingDay with the selected day
    setShowModal(true);
  };
 
  const handleEditTreatment = (index) => {
    setSelectedTreatmentIndex(index);
    setEditedTreatment({ ...formData.TreatmantID[index] }); // Initialize editedTreatment with the selected treatment
    setShowTreatmentModal(true);
  };
  
  
  const handleSaveTreatmentChanges = () => {
    // Update the TreatmantID list with the edited treatment
    setFormData((prevFormData) => {
      const updatedTreatments = [...prevFormData.TreatmantID];
      updatedTreatments[selectedTreatmentIndex] = editedTreatment;
      return { ...prevFormData, TreatmantID: updatedTreatments };
    });
  
    // Update the value prop with the edited treatments
    const updatedValue = { ...value };
    updatedValue.TreatmantID = [...formData.TreatmantID];
    updatedValue.TreatmantID[selectedTreatmentIndex] = editedTreatment;
  
    // Set the updated value prop
    location.state.value = updatedValue;
  
    setShowTreatmentModal(false); // Close the modal after saving changes
  };
  
  const handleDeleteTreatment = async (index) => {
    try {
      console.log(formData.TreatmantID[index]._id);
      
      // Send DELETE request to delete the treatment
      const response = await axios.delete(`http://localhost:3321/treatmant/deleteTreatmant/${formData.TreatmantID[index]._id}`);
  
      if (response.data) {
        console.log(response.data);
      } else {
        throw new Error('Error deleting the treatment.');
      }
    } catch (error) {
      console.error(error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      // Update the TreatmantID list by removing the treatment at the specified index
      setFormData((prevFormData) => {
        const updatedTreatments = [...prevFormData.TreatmantID];
        updatedTreatments.splice(index, 1);
        return { ...prevFormData, TreatmantID: updatedTreatments };
      });
  
      // Update the value prop by removing the treatment at the specified index
      const updatedValue = { ...value };
      updatedValue.TreatmantID = [...formData.TreatmantID];
      updatedValue.TreatmantID.splice(index, 1);
  
      // Set the updated value prop
      location.state.value = updatedValue;
      console.log(updatedValue, value);
    }
  };
  

  const handleSubmitTreatmant = async (e) => {
    e.preventDefault();
    console.log(value);
    value.TreatmantID.map(async (e)=>{
      const response = await axios.put('http://localhost:3321/treatmant/updateTreatmant', e);     
      console.log(response)
      if (response.data) {
        console.log(response.data);
        return response.data; // Assuming your server sends a success message back
      } else {
        throw new Error('Error updating the product.');
      }

    })
    
  };

  const handleSaveChanges = (index) => {
    // Update the deatailUserList with the edited day
    setDeatailUserList((prevUser) => {
      const updatedList = [...prevUser];
      updatedList[index] = editedWorkingDay;
      return updatedList;
    });

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
      <div>
        <label>טיפולים:</label>
        {value.TreatmantID.map((treatment, index) => (
          <div key={index}>
            {`טיפול: ${treatment.TreatmantName}, מחיר: ${treatment.Price}, זמן: ${treatment.TreatmantTime}`}
            <button onClick={() => handleEditTreatment(index)}>Edit</button>
            <button onClick={() => handleDeleteTreatment(index)}>Delete</button>

          </div>
        ))}
      </div>
      <button onClick={handleAddTreatmentClick} type="button">
          Add Treatment
        </button>
        <AddTreatmentModal
        isOpen={showAddTreatmentModal}
        onClose={() => setShowAddTreatmentModal(false)}
        onAddTreatment={handleAddTreatment}
        // Pass newTreatment and setNewTreatment to the modal
        newTreatment={newTreatment}
        setNewTreatment={setNewTreatment}
      />
        <br></br>
      <button onClick={handleSubmitTreatmant} type="submit">
        Save
      </button>
      {/* Modal for editing treatments */}
      <Modal
        isOpen={showTreatmentModal}
        onRequestClose={() => setShowTreatmentModal(false)}
        contentLabel="Edit Treatment"
      >
        <div>
          <h2>Edit Treatment</h2>
          {editedTreatment && (
            <>
              <label>Treatmant Name:</label>
              <input
                type="text"
                name="TreatmantName"
                value={editedTreatment.TreatmantName || ''}
                onChange={(e) =>
                  setEditedTreatment({
                    ...editedTreatment,
                    TreatmantName: e.target.value,
                  })
                }
              />
              <label>Price:</label>
              <input
                type="text"
                name="Price"
                value={editedTreatment.Price || ''}
                onChange={(e) =>
                  setEditedTreatment({
                    ...editedTreatment,
                    Price: e.target.value,
                  })
                }
              />
              <label>Treatmant Time:</label>
              <input
                type="text"
                name="TreatmantTime"
                value={editedTreatment.TreatmantTime || ''}
                onChange={(e) =>
                  setEditedTreatment({
                    ...editedTreatment,
                    TreatmantTime: e.target.value,
                  })
                }
              />
              <button onClick={handleSaveTreatmentChanges}>
                Save Changes
              </button>
            </>
          )}
        </div>
      </Modal>
      <br></br>
        <label>ימי עבודה:</label>
        {formatDaysForDisplayWithButtons(deatailUserList, handleDayButtonClick)}
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Edit Day"
        >
          <div>
            <h2>Edit Working Day</h2>
            {/* Display the working hours of the selected day in the modal */}
            {editedWorkingDay && (
              <>
                <p>{`Day: ${editedWorkingDay.Day}`}</p>
                <label>Start Time:</label>
                <input
                  type="time"
                  name="Start"
                  value={editedWorkingDay.Start || ''}
                  onChange={(e) =>
                    setEditedWorkingDay({
                      ...editedWorkingDay,
                      Start: e.target.value,
                    })
                    
                  }
                  
                />
                <label>End Time:</label>
                <input
                  type="time"
                  name="End"
                  value={editedWorkingDay.End || ''}
                  onChange={(e) =>
                    setEditedWorkingDay({
                      ...editedWorkingDay,
                      End: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleSaveChanges(selectedDayIndex)}>
                  Save Changes
                </button>
              </>
              
            )}
          </div>
        </Modal>
        
      </div>

      {/* Add more fields as needed */}
      <button  onClick={handleSubmit} type="submit">Save</button>
    </form>
  );
};


export default EditForm;
