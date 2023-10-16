import React, { useState, useEffect } from "react";

const EarliestAvailableTime = ({ selectedDate, deatailUserList,selectedTimeOfDay, onEarliestTimeChange }) => {
  const [earliestTime, setEarliestTime] = useState("Loading...");
  const workingDayList = deatailUserList.WorkingDay;
  const QueueList = deatailUserList.QueueList;
  console.log(selectedTimeOfDay)
  console.log(deatailUserList)
  useEffect(() => {
    const fetchEarliestTime = async () => {
      console.log(selectedDate)
      try {
        if (workingDayList) {
          const dayOfWeekOptions = { weekday: 'long' };
          const dayOfWeekFormatter = new Intl.DateTimeFormat('en-US', dayOfWeekOptions);
          const formattedDayOfWeek = dayOfWeekFormatter.format(selectedDate);
          const params = new URLSearchParams({
            selectedDate: selectedDate.toISOString(), // Convert to ISO string or any suitable format
            QueueList: JSON.stringify(QueueList)
          });
          const listQueue = await fetch(`http://localhost:3321/queue/getQueueDate?${params.toString()}`);
          if (!listQueue.ok) {
            throw new Error('Failed to fetch data');
          }

          const responseListQueue = await listQueue.json();
          console.log(responseListQueue);
          calculateAviableQueue(responseListQueue)
          const workingTimes = workingDayList
            .filter(day => day.Day.toLowerCase() === formattedDayOfWeek.toLowerCase());

          if (workingTimes.length > 0) {
            const earliestTime = Math.min(...workingTimes.map(day => {
              const [hours, minutes] = day.Start.split(':').map(Number);
              return hours * 60 + minutes;
            }));
            const formattedEarliestTime = `${Math.floor(earliestTime / 60).toString().padStart(2, '0')}:${(earliestTime % 60).toString().padStart(2, '0')}`;
            setEarliestTime(formattedEarliestTime);

            if (formattedEarliestTime !== "Not Available") {
              // Call the callback function with earliestTime when it's available
              onEarliestTimeChange(formattedEarliestTime);
            }
          } else {
            setEarliestTime("Not Available");
            onEarliestTimeChange("Not Available");
          }
        }
      } catch (error) {
        console.error(error);
        setEarliestTime("Not Available");
        onEarliestTimeChange("Not Available");
      }
    };

    fetchEarliestTime();

    const calculateAviableQueue = (responseListQueue)=>{
      console.log(responseListQueue)
      if (selectedTimeOfDay==="morning"){
    
      }else if(selectedTimeOfDay==="noon"){
    
      }else if(selectedTimeOfDay==="evening"){
    
      }
    
    }
  }, [selectedDate, workingDayList, onEarliestTimeChange]);

  return <span>{earliestTime}</span>;
};





export default EarliestAvailableTime;
