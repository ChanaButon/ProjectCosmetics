import React, { useState, useEffect } from "react";
import {  findTretmentQueue } from "./api"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeDay = {
  "morning": { value: 0, status: false },
  "noon": { value: 0, status: false },
  "evening": { value: 0, status: false }
};

const EarliestAvailableTime = ({ selectedDate, deatailUserList,selectedTimeOfDay,allTreat, onEarliestTimeChange }) => {
  const [earliestTime, setEarliestTime] = useState("Loading...");
  // console.log(deatailUserList.BrakeTime)
  const workingDayList = deatailUserList.WorkingDay;
  const QueueList = deatailUserList.QueueList;
  const date = new Date(selectedDate);
  const dayNumber = date.getDay();
  const dayName = daysOfWeek[dayNumber];
  const dayTime = deatailUserList.WorkingDay.find(a=>a.Day===dayName)
  console.log(dayTime.Start,dayTime.End)
  useEffect(() => {
    const fetchEarliestTime = async () => {
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
          calculateAviableQueue(responseListQueue,dayTime.Start,dayTime.End)
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

    const calculateAviableQueue = async (responseListQueue,start,end)=>{
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      const workStartMinutes = startHour * 60 +  startMinute;
      const workEndMinutes = endHour * 60 + endMinute;
      timeInDay(workStartMinutes,workEndMinutes)
      // console.log(workStartMinutes,workEndMinutes)
        // Filter queues within working hours
      const treatmentQueueResult = await findTretmentQueue(responseListQueue, allTreat);
      const filteredQueues = treatmentQueueResult.filter(queue => {
      const queueTimeMinutes = time(queue.DateTime)
        return queueTimeMinutes >= workStartMinutes && queueTimeMinutes <= workEndMinutes;
    });
    
    console.log(filteredQueues)
    const availableSlots = [];
    let lastEndTime = workStartMinutes;
    
    for (const queue of filteredQueues) {
      const queueTimeMinutes = time(queue.DateTime);
      console.log(queueTimeMinutes)
      if (queueTimeMinutes - lastEndTime > 0) {
        console.log("222")
        availableSlots.push({ start: lastEndTime, end: queueTimeMinutes});
        console.log(availableSlots)
      }
      lastEndTime = queueTimeMinutes + queue.TreatmantType.TreatmantTime ; // Consider queue duration for next iteration
    }
     // If there are no queues, the whole working duration is available
  if (filteredQueues.length === 0||availableSlots.length===0) {
    console.log("11")
    availableSlots.push({ start: workStartMinutes, end: workEndMinutes });
  }
  console.log(availableSlots)
  // Earliest available time is the start time of the first gap
  const earliestSlot = availableSlots[0];
  console.log(earliestSlot)
      if (selectedTimeOfDay==="morning"){
    
      }else if(selectedTimeOfDay==="noon"){
    
      }else if(selectedTimeOfDay==="evening"){
    
      }
    
    }

    const time = (date)=>{
      console.log(date)
      const [datePart, timePart] = date.split(', ');
      const [hourString, minuteString] = timePart.split(':');
      const hour = parseInt(hourString, 10);
      const minutes = parseInt(minuteString, 10);       
      const queueTimeMinutes =  hour* 60 + minutes;
      return queueTimeMinutes
    }

    const timeInDay = (start, end) => {
      console.log(start, end);
      
      if (start < 720 && end <= 720) {
          timeDay["morning"].value = start;
          timeDay["morning"].status = true;
      } else if (start > 1080 && end <= 1080) {
          timeDay["noon"].value = start;
          timeDay["noon"].status = true;
      } else if (start >= 1080) {
          timeDay["evening"].value = start;
          timeDay["evening"].status = true;
      } else if (start < 720 && end > 1080) {
          timeDay["morning"].value = start;
          timeDay["morning"].status = true;
          timeDay["noon"].value = 720;
          timeDay["noon"].status = true;
          timeDay["evening"].value = 1080;
          timeDay["evening"].status = true;
      } else if (start < 1080 && end > 1080) {
          timeDay["noon"].value = start;
          timeDay["noon"].status = true;
          timeDay["evening"].value = 1080;
          timeDay["evening"].status = true;
      }else if (start < 720 && end < 1080 && end > 720) {
        console.log("מייאו")
        timeDay["morning"].value = start;
        timeDay["morning"].status = true;
        timeDay["noon"].value = 720;
        timeDay["noon"].status = true;
    }  
      else {
          console.log("Invalid time range");
      }
      console.log(timeDay)
  };
  
  }, [selectedDate, workingDayList, onEarliestTimeChange]);

  return <span>{earliestTime}</span>;
};





export default EarliestAvailableTime;
