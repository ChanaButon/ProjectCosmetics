import React, { useState, useEffect } from "react";
import {  findTretmentQueue } from "./api"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeDay = {
  "morning": { value: 0, status: false },
  "noon": { value: 0, status: false },
  "evening": { value: 0, status: false }
};




const EarliestAvailableTime = ({ selectedDate, deatailUserList, selectedTimeOfDay, allTreat,filteredTreatm, onEarliestTimeChange, onTimeSelection }) => {
  const [timeDayCancelled, setTimeDayCancelled] = useState([]);
  const [earliestTime, setEarliestTime] = useState("Loading...");
  const workingDayList = deatailUserList.WorkingDay;
  const BrakeTime = deatailUserList.BrakeTime;
  const QueueList = deatailUserList.QueueList;
  const date = new Date(selectedDate);
  const dayNumber = date.getDay();
  const dayName = daysOfWeek[dayNumber];
  const dayTime = deatailUserList.WorkingDay.find(a=>a.Day===dayName)
  console.log(dayTime.Start,dayTime.End,filteredTreatm.TreatmantTime)

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
          console.log(fin,fin.length,timeDay)
          if(selectedTimeOfDay==="morning"){
            if( timeDay["morning"].status === true && (timeDay["morning"].value+filteredTreatm.TreatmantTime+BrakeTime <= 720|| timeDay["noon"].value===720) ){
              if(fin.length> 0){
                const option = fin.find(a=>a.Time==="morning"&& a.Start+filteredTreatm.TreatmantTime+BrakeTime<=a.End)
                console.log(option,filteredTreatm.TreatmantTime)
                if(option!==undefined){setEarliestTime(convertToDate(option.Start,selectedDate))}else{
                  setEarliestTime(convertToDate(timeDay["morning"].value,selectedDate))}
              }
              else{
              setEarliestTime(convertToDate(timeDay["morning"].value,selectedDate))}
              // setEarliestTime(timeDay["morning"].value)
            }else{
             
              setEarliestTime("אין תור זמין בשעות הבוקר")
            }
          }else if(selectedTimeOfDay==="noon" &&  (timeDay["noon"].value+filteredTreatm.TreatmantTime+BrakeTime <= 1080|| timeDay["evening"].value===1080)){
            if(timeDay["noon"].status === true){
            if(fin.length> 0 ){
              const option = fin.find(a=>a.Time==="noon"&& a.Start+filteredTreatm.TreatmantTime+BrakeTime<=a.End)
              console.log(option,filteredTreatm.TreatmantTime)
              if(option!==undefined){setEarliestTime(convertToDate(option.Start,selectedDate))}
              else{setEarliestTime(convertToDate(timeDay["noon"].value,selectedDate))}}
            else{setEarliestTime(convertToDate(timeDay["noon"].value,selectedDate))}
            }else{setEarliestTime("אין תור זמין בשעות הצהריים")}
          }else if(timeDay["evening"].status === true||fin.length> 0){
             if(fin.length> 0 ){
                const option = fin.find(a=>a.Time==="evening"&& a.Start+filteredTreatm.TreatmantTime+BrakeTime<=a.End)
                console.log(option,filteredTreatm.TreatmantTime)
                if(option!==undefined){setEarliestTime(convertToDate(option.Start,selectedDate))}
                else{
                  setEarliestTime(convertToDate(timeDay["evening"].value,selectedDate))}
                }
                
                else{
                  console.log("hooo")
                setEarliestTime(convertToDate(timeDay["evening"].value,selectedDate))}
            }else{
              setEarliestTime("אין תור זמין בשעות הערב")
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
    const cancelledTimes = [];

        sortedQueues.forEach((queue) => {
          console.log(queue)
          const queueStartTime = time(queue.DateTime);
          const queueEndTime = queueStartTime + queue.TreatmantType.TreatmantTime;
          console.log(queueStartTime,timeDay,(queueStartTime===timeDay["noon"].value) ,timeDay["noon"].value )
          if(!(queueStartTime===timeDay["morning"].value||queueStartTime===timeDay["noon"].value||queueStartTime===timeDay["evening"].value)){
            if(queueStartTime< 720 &&  timeDay["morning"].status === true){
              cancelledTimes.push({ Start: timeDay["morning"].value, End: queueStartTime, Time: "morning" });
            }else if(queueStartTime< 1080 &&  timeDay["noon"].status === true){
              cancelledTimes.push({ Start: timeDay["noon"].value, End: queueStartTime, Time: "noon" });
            }else if(queueStartTime>1080 &&  timeDay["evening"].status === true){
              cancelledTimes.push({ Start: timeDay["evening"].value, End: queueStartTime, Time: "evening" });
            }
          }
          if (queueEndTime <= workEndMinutes && queueStartTime >= workStartMinutes) {
            if(queueStartTime< 720){
              timeDay["morning"].value = queueEndTime+BrakeTime;
              if(queueEndTime + BrakeTime>=720){
                timeDay["morning"].status = false;
                timeDay["noon"].value = timeDay["noon"].value+queueEndTime+BrakeTime-720;
              }
            }else if(queueStartTime<1080){
              timeDay["noon"].value = queueEndTime+BrakeTime;
              if(queueEndTime+BrakeTime >=1080){
                timeDay["noon"].status = false;
                timeDay["evening"].value = timeDay["evening"].value+queueEndTime+BrakeTime-1080;
              }
            }else{
              timeDay["evening"].value=queueEndTime+BrakeTime;
              console.log(queueEndTime + BrakeTime,queueEndTime + BrakeTime >= workEndMinutes,workEndMinutes)
              if(queueEndTime + BrakeTime >= workEndMinutes|| queue.TreatmantType.TreatmantTime+queueEndTime + BrakeTime > workEndMinutes){
                timeDay["evening"].status = false;
              }
            }
          }
          console.log(cancelledTimes)
          setTimeDayCancelled(cancelledTimes); // Set the cancelled times after the list is full
        });
        return cancelledTimes
    
    }

  
    const time = (date)=>{
      // console.log(date)
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
      const timezoneOffset = (dateTime.getTimezoneOffset() === -120) ? 2 : 3; // -120 for +0200, -180 for +0300
      const newDateTime = new Date(adjustedTime-timezoneOffset*60*60*1000);
      return newDateTime.toLocaleTimeString()
    
    }
  



    const timeInDay = (start, end) => {
      console.log(start, end);
      if (start < 720 && end <= 720) {
        console.log("1")
          timeDay["morning"].value = start;
          timeDay["morning"].status = true;
      } else if (start > 1080 && end <= 1080) {
        console.log("2")
          timeDay["noon"].value = start;
          timeDay["noon"].status = true;
      } else if (start >= 1080) {
        console.log("3")
          timeDay["evening"].value = start;
          timeDay["evening"].status = true;
      } else if (start < 720 && end > 1080) {
        console.log("4")
          timeDay["morning"].value = start;
          timeDay["morning"].status = true;
          timeDay["noon"].value = 720;
          timeDay["noon"].status = true;
          timeDay["evening"].value = 1080;
          timeDay["evening"].status = true;
      } else if (start < 1080 && end > 1080) {
        console.log("5")
          timeDay["noon"].value = start;
          timeDay["noon"].status = true;
          timeDay["evening"].value = 1080;
          timeDay["evening"].status = true;
      }else if (start < 720 && end < 1080 && end > 720) {
        console.log("6")
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

  },[selectedDate,earliestTime, workingDayList, onEarliestTimeChange])

  return <span>{earliestTime}</span>;
};



export default EarliestAvailableTime;
