import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTreatmentModal from './AddTreatmentModal';

import VacationDaysModal from './VacationDaysModal';

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
  const [showVacationDaysModal, setShowVacationDaysModal] = useState(false);

 // const [formData, setFormData] = useState(value);
  //const [dayList, setDayList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dayweekList, setDayweekList] = useState([]);
  const [holidayList, setHolidayList] = useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);


  console.log(value)
  console.log(editedWorkingDay)
  console.log(deatailUserList)

  const fetchData = async () => {
    try {
      if (value) {
        const dayPromises = value.WorkingDay.map(async (b) => {
          const dayResponse = await axios.get(`http://localhost:3321/timeDay/findDayById:${b}`);
          setDayWeekList(dayResponse.data);
          return dayResponse.data;
        });
        const dayResults = await Promise.all(dayPromises);
        setDayList(dayResults);

        const dayWeekPromises = dayResults.map(async (elemnt) => {
          console.log(elemnt.id.Day)
          const dayWeekResponse = await axios.get(`http://localhost:3321/days/findDayWeekById:${elemnt.id.Day}`);
          console.log(dayWeekResponse.data);
          return dayWeekResponse.data;
        });
        const dayWeekResults = await Promise.all(dayWeekPromises);
        setDayweekList(dayWeekResults);
        console.log(dayWeekResults);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.log(dayList);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(dayList);
    console.log(dayweekList);
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
  console.log(connectedList)
     setDeatailUserList(connectedList);
    // setDeatailUserList((prevUser) => ({ ...prevUser, WorkingDay: connectedList, ...value }));

   };
  
   const handleAddTreatmentClick = () => {
    // Open the modal or dropdown to select a new treatment
    // For simplicity, let's assume you have a modal for this
    // and the selected treatment will be stored in selectedNewTreatment
    setShowAddTreatmentModal(true);
  };
  const handleAddTreatment = async (newTreatment) => {   
    // Close the modal or reset the state
    setShowAddTreatmentModal(false);
    setSelectedNewTreatment(null);
    setNewTreatment(''); // Clear the newTreatment state
  
    try {
      const response = await axios.post('http://localhost:3321/treatmant/newTreatmant', newTreatment);     
      console.log(response);
  
      const updatedFormData = {
        ...formData,
        TreatmantID: [...formData.TreatmantID, response.data],
      };
      value.TreatmantID.push(response.data)
      setFormData(updatedFormData);
      console.log(updatedFormData);
  
      if (response.data) {
        console.log(response.data);
        return response.data; // Assuming your server sends a success message back
      } else {
        throw new Error('Error updating the product.');
      }
    } catch (error) {
      console.error(error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  
  
 

  useEffect(() => {
    if (dayweekList.length > 0) {
      updateDetail();
    }
    if (deatailUserList.length !== 0) {
      setIsDataLoaded(true);
      console.log(deatailUserList);
      console.log('yessssssssssssssssss');
    }
  }, [dayweekList]);

  const UpdateProduct = async (value) => {
    try {
      console.log(value)
      const treatmantIDs = formData.TreatmantID.map((treatment) => treatment._id);
      const workingId = deatailUserList.map((e)=>e._id)
      console.log(deatailUserList)
      const data1 = {
        _id: value._id,
         Name:value.Name,
         Addres:value.Addres,
         WorkingDay:workingId,
         HoliDay:holidayList,
         //QueueList:response.data._id,
         TreatmantID:treatmantIDs
       };
       console.log(data1)
      const response = await axios.put('http://localhost:3321/product/updateProductById', data1);
      console.log(value);
      console.log(response);
      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error('Error updating the product.');
      }
    } catch (error) {
      console.error(error);
      alert('אירעה שגיאה');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateProduct(formData);
  };

  const handleExitClick = () => {
    navigate(-1);
  };

  const handleDayDeleteButtonClick = async (index) => {
    try {
      console.log(deatailUserList)
      const dayId = deatailUserList[index]._id; // Assuming day ID is available in deatailUserList
      const response = await axios.delete(`http://localhost:3321/timeDay/deleteTimeDay${dayId}`);
      console.log(response.data)
  
      if (response.data) {
        console.log(response.data);
      } else {
        throw new Error('Error deleting the day.');
      }
    } catch (error) {
      console.error(error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      // Update the deatailUserList by removing the day at the specified index
      setDeatailUserList((prevUser) => {
        const updatedList = [...prevUser];
        console.log(updatedList)
        updatedList.splice(index, 1);
        console.log(updatedList)
        return updatedList;
      });
    }
  };

  const formatDaysForDisplayWithButtons = (workingDays, handleDayButtonClick) => {
    return workingDays.map((day, index) => (
      <div key={index}>
        {`Day: ${day.Day}, Start: ${day.Start}, End: ${day.End}`}
        <button onClick={() => handleDayButtonClick(index)}>עריכה</button>
        <button onClick={() => handleDayDeleteButtonClick(index)}>מחיקה</button>
      </div>
    )).concat(
      <div key="addNewDay">
        <button onClick={() => handleDayButtonClick(-1)}>הוסף יום חדש</button>
      </div>
    );
  };
  
  

  const handleDayButtonClick = (index) => {
    // Adding a new day
    if (index === -1) {
      setEditedWorkingDay({
        Day: daysOfWeek[0],  // Initialize the day properties with default values
        Start: '',
        End: '',
        Status:true
      });
    } else {
      // Editing an existing day
      setSelectedDayIndex(index);
      console.log(deatailUserList[index])
      setEditedWorkingDay(deatailUserList[index]);
    }
  
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
      // const response = await axios.delete(`http://localhost:3321/treatmant/deleteTreatmant/${formData.TreatmantID[index]._id}`);
  
      // if (response.data) {
      //   console.log(response.data);
      // } else {
      //   throw new Error('Error deleting the treatment.');
      // }
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


 
  const handleSaveChanges = async (index) => {
    if (index !== -1) {
      // Editing an existing day
      let dataDay = {
        _id: editedWorkingDay._id,
        Start: editedWorkingDay.Start,
        End: editedWorkingDay.End,
      };
  
      try {
        const response = await axios.put('http://localhost:3321/timeDay/updateTimeDay', dataDay);
        console.log(response);
        if (response.data) {
          console.log(response.data);
          // Assuming your server sends a success message back
        } else {
          throw new Error('Error updating the work day.');
        }
      } catch (error) {
        console.error(error);
        // Handle the error (e.g., show an error message to the user)
      }
  
      setDeatailUserList((prevUser) => {
        const updatedList = [...prevUser];
        updatedList[index] = editedWorkingDay;
        console.log(editedWorkingDay, updatedList);
        return updatedList;
      });
    } else {
      // Adding a new day
      setDeatailUserList((prevUser) => [...prevUser, editedWorkingDay]);
    }
  
    setShowModal(false);
    setEditedWorkingDay({}); // Clear the editedWorkingDay state after saving changes
  };
  
  
  
  


  const handleVacationDaysChange = (updatedVacationDays) => {
    setFormData((prevFormData) => ({ ...prevFormData, HoliDay: updatedVacationDays }));
    setHolidayList(updatedVacationDays)
  };


  const addNewDay =async ()=>{
    setShowModal(true)
    console.log(editedWorkingDay)
    const response = await axios.post('http://localhost:3321/timeDay/newTimeDay', editedWorkingDay);     
    console.log(response)
    if (response.data) {
      console.log(response.data);
      deatailUserList.push({...response.data,Day:editedWorkingDay.Day})
      return response.data; // Assuming your server sends a success message back
    } else {
      throw new Error('Error add the time day.');
    }

  }




 
    


    
  

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
        {formData.TreatmantID.map((treatment, index) => (
          <div key={index}>
            {`טיפול: ${treatment.TreatmantName}, מחיר: ${treatment.Price}, זמן: ${treatment.TreatmantTime}`}
            <button onClick={() => handleEditTreatment(index)}>עריכה</button>
            <button onClick={() => handleDeleteTreatment(index)}>מחיקה</button>

          </div>
        ))}
      </div>
      <button onClick={handleAddTreatmentClick} type="button">
          הוספת טיפול
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
      <button onClick={handleSubmitTreatmant} >
        שמירת שינויים
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
      <label>זמן הפסקה:</label>
      <input type="number" name="BrakeTime" value={formData.BrakeTime || ''}    onChange={handleChange} required />
    </div>
      <div>
      
      <label>ימי עבודה:</label>
      {formatDaysForDisplayWithButtons(deatailUserList, handleDayButtonClick,handleDayDeleteButtonClick)}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Edit Day"
      >
        <div>
            <h2>Edit Working Day</h2>
            <label>Day Name:</label>
<select
  name="Day"
  value={editedWorkingDay.Day || ''}
  onChange={(e) =>
    setEditedWorkingDay({
      ...editedWorkingDay,
      Day: e.target.value,
    })
  }
>
  {daysOfWeek.map((day) => (
    <option key={day} value={day}>
      {day}
    </option>
  ))}
</select>

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
                {/* Remove this line */}
                <button onClick={() => addNewDay()}>הוסף יום חדש</button>
                <button onClick={() => handleSaveChanges(selectedDayIndex)}>
                  שמירת שינויים
                  </button>

</>
              
            )}
          </div>
      </Modal>
    <div>
    <label>ימי חופשה:</label>
        <button onClick={() => setShowVacationDaysModal(true)}>עריכת ימי חופשה</button>
        <VacationDaysModal
          isOpen={showVacationDaysModal}
          onClose={() => setShowVacationDaysModal(false)}
          value={formData.HoliDay}  // Pass the vacation days array
          onVacationDaysChange={handleVacationDaysChange}  // Pass the change handler function
        />
    </div>

    </div>
    <div>
    {/* <input  className="input-field" placeholder="תחילת התאריך" type="date" />
    <input  className="input-field" placeholder="סיום התאריך" type="date" /> */}
    </div>
      {/* Add more fields as needed */}
      <button  onClick={handleSubmit} type="submit">Save</button>
    </form>
  );
};



export default EditForm;
