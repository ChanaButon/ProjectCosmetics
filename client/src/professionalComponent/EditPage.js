import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedWorkingDay, setEditedWorkingDay] = useState({});
  const { value } = location.state || {};
  const [formData, setFormData] = useState(value || {});
  const [dayList, setDayList] = useState([]);
  const [dayWeekList, setDayWeekList] = useState([]);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const statusOptions = ['true', 'false'];
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dayweekList, setDayweekList] = useState([]);
  const [deatailUserList, setDeatailUserList] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedHolidays, setEditedHolidays] = useState(value.HoliDay || []);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showVacationDaysPage, setShowVacationDaysPage] = useState(false);

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
    const connectedList = [];
    dayweekList.forEach((dayweekItem) => {
      const correspondingDay = dayList.find((dayItem) => dayItem.id.Day === dayweekItem.id._id);
      console.log(dayweekItem);
      if (correspondingDay) {
        console.log(connectedList);
        connectedList.push({
          ...correspondingDay.id,
          Day: dayweekItem.id.DayName,
        });
      }
    });
    setDeatailUserList(connectedList);
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
      const data1 = {
        _id: value._id,
        Name: value.Name,
        Addres: value.Addres,
        WorkingDay: deatailUserList.WorkingDay,
        BrakeTime: value.BrakeTime,
        HoliDay: value.HoliDay,
      };
      console.log(data1);
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

  const formatDaysForDisplayWithButtons = (workingDays, handleDayButtonClick) => {
    return workingDays.map((day, index) => (
      <div key={index}>
        {`${day.Day}: ${day.Start} - ${day.End}`}
        <button onClick={() => handleDayButtonClick(index)}>Edit</button>
      </div>
    ));
  };

  const handleDayButtonClick = (index) => {
    setSelectedDayIndex(index);
    setEditedWorkingDay(deatailUserList[index]);
    setShowModal(true);
  };

  const handleSaveChanges = (index) => {
    setDeatailUserList((prevUser) => {
      const updatedList = [...prevUser];
      updatedList[index] = editedWorkingDay;
      return updatedList;
    });

    setShowModal(false);
  };

  const addHoliday = (newHoliday) => {
    setEditedHolidays((prevHolidays) => [...prevHolidays, newHoliday]);
  };

  const handleDeleteHoliday = (index) => {
    setEditedHolidays((prevHolidays) => prevHolidays.filter((holiday, i) => i !== index));
  };

  const handleEditHoliday = (index, updatedHoliday) => {
    setEditedHolidays((prevHolidays) =>
      prevHolidays.map((holiday, i) => (i === index ? updatedHoliday : holiday))
    );
  };

  const handleSaveVacationDays = () => {
    setEditedHolidays((prevHolidays) => [...prevHolidays, ...selectedDays]);
    setShowVacationDaysPage(false);
  };
  const handleUpdateVacationDays = (date) => {
    setSelectedDays([date]); // Set the selectedDays array with the single selected date
    setShowModal(true); // Show the modal for confirming the selected vacation day
  };

  const handleCancelVacationDays = () => {
    setShowVacationDaysPage(false);
  };

  const formatHolidaysForDisplayWithButtons = () => {
    return editedHolidays.map((holiday, index) => (
      <div key={index}>
        {`Start Date: ${holiday.StartDate}, End Date: ${holiday.EndDate}`}
        <button onClick={() => handleEditHoliday(index)}>Edit</button>
        <button onClick={() => handleDeleteHoliday(index)}>Delete</button>
        <button onClick={() => addHoliday(index)}>add</button>
      </div>
    ));
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
      <label>זמן הפסקה:</label>
      <input type="number" name="BrakeTime" value={formData.BrakeTime || ''}    onChange={handleChange} required />
    </div>
      <div>
      
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
    <div>
    <input  className="input-field" placeholder="תחילת התאריך" type="date" />
    <input  className="input-field" placeholder="סיום התאריך" type="date" />
    </div>
    
      {/* Add more fields as needed */}
      <button  onClick={handleSubmit} type="submit">Save</button>
    </form>
  );
};



export default EditForm;
