import React, { useState, useEffect } from "react";
import {  findTretmentQueue } from "./api"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeDay = {
  "morning": { value: 0, status: false },
  "noon": { value: 0, status: false },
  "evening": { value: 0, status: false }
};

const EarliestAvailableTime = ({ selectedDate, deatailUserList, selectedTimeOfDay, allTreat, onEarliestTimeChange, onTimeSelection }) => {
  const [earliestTime, setEarliestTime] = useState("Loading...");
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
          const fin =await calculateAviableQueue(responseListQueue,dayTime.Start,dayTime.End)
          console.log(timeDay,fin)
          if(selectedTimeOfDay==="morning"){
            if( timeDay["morning"].status === true){
              setEarliestTime(convertToDate(timeDay["morning"].value,selectedDate))
              // setEarliestTime(timeDay["morning"].value)
            }else{
              setEarliestTime("אין תור זמין בשעות הבוקר")
            }
          }else if(selectedTimeOfDay==="noon"){
            if( timeDay["noon"].status === true){
              setEarliestTime(convertToDate(timeDay["noon"].value,selectedDate))
              // setEarliestTime(timeDay["noon"].value)
            }else{
              setEarliestTime("אין תור זמין בשעות הצהריים")
            }
          }else{
            if( timeDay["evening"].status === true){
              setEarliestTime(convertToDate(timeDay["evening"].value,selectedDate))
              // setEarliestTime(timeDay["evening"].value)
            }else{
              setEarliestTime("אין תור זמין בשעות הערב")
            }
          }
          console.log(earliestTime)
          onTimeSelection(earliestTime);
        }
      } catch (error) {
        console.error(error);
        setEarliestTime("Not Available");
        onEarliestTimeChange("Not Available");
      }
      onTimeSelection(earliestTime);

    };

    fetchEarliestTime();

    const calculateAviableQueue = async (responseListQueue,start,end)=>{
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      const workStartMinutes = startHour * 60 +  startMinute;
      const workEndMinutes = endHour * 60 + endMinute;
      timeInDay(workStartMinutes,workEndMinutes)
      const treatmentQueueResult = await findTretmentQueue(responseListQueue, allTreat);
      // console.log(treatmentQueueResult)
      const filteredQueues = treatmentQueueResult.filter(queue => {
      const queueTimeMinutes = time(queue.DateTime)
      console.log(queueTimeMinutes)
        return queueTimeMinutes >= workStartMinutes && queueTimeMinutes <= workEndMinutes;
    });
    
    const sortedQueues = filteredQueues.sort((a,b)=>{
      return time(a.DateTime) - time(b.DateTime);
    })
    console.log(sortedQueues)

        sortedQueues.forEach((queue) => {
          const queueStartTime = time(queue.DateTime);
          const queueEndTime = queueStartTime + queue.TreatmantType.TreatmantTime;
          // console.log(queueEndTime,workEndMinutes,queueStartTime,workStartMinutes)
          if (queueEndTime <= workEndMinutes && queueStartTime >= workStartMinutes) {
            if(queueStartTime< 720){
              timeDay["morning"].value = queueEndTime;
              if(queueEndTime>=720){
                timeDay["morning"].status = false;
                timeDay["noon"].value = timeDay["noon"].value+queueEndTime-720;
              }
            }else if(queueStartTime<1080){
              timeDay["noon"].value = queueEndTime;
              if(queueEndTime>=1080){
                timeDay["noon"].status = false;
                timeDay["evening"].value = timeDay["evening"].value+queueEndTime-1080;
              }
            }else{
              timeDay["evening"].value=queueEndTime;
              if(queueEndTime <= workEndMinutes){
                timeDay["evening"].status = false;
              }
            }
          }
          return 
        });

 
    
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

    const convertToDate = (minuteTime,date1)=>{
      const millisecondsSinceMidnight = minuteTime * 60 * 1000;
      const dateTime = new Date(date1);
      const localTimezoneOffset = dateTime.getTimezoneOffset() * 60 * 1000;
      const adjustedTime = dateTime.getTime() - localTimezoneOffset + millisecondsSinceMidnight;
      const newDateTime = new Date(adjustedTime-3*60*60*1000);
      return newDateTime.toLocaleTimeString()
      // console.log(newDateTime,newDateTime.toLocaleTimeString());
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
  onTimeSelection(earliestTime);
  }, [selectedDate,earliestTime, workingDayList, onEarliestTimeChange]);

  return <span>{earliestTime}</span>;
};





export default EarliestAvailableTime;
