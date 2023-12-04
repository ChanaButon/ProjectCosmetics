import axios from 'axios';
const currentDate = new Date(); // Current date and time

const addToQueueApi = async (selectedDate,treatmant, customerId,productId) => {
  try {
    const data = {
      DateTime:selectedDate,
      TreatmantType:treatmant._id,
      Customer:customerId,
    };
    console.log(data)

    const response = await axios.post('http://localhost:3321/queue/newQueue', data);
    if (response.data) {
      console.log(response.data);
      const data1 = {
       _id:productId,
        Customers:customerId,
        QueueList:response.data._id,
      };
      console.log(data1)
     const response1 = await axios.put('http://localhost:3321/product/updateProduct', data1);
     if(response.data){
      console.log(response1.data);
      return "התור נוסף בהצלחה" // Assuming your server sends a success message back
     }
    } else {
      throw new Error('Error adding user to the queue.');
    }
  } catch (error) {
    console.error('Error adding user to the queue:', error);
    throw error;
  }
};

const findTretmentQueue = async (list, tretment) => {
  // console.log(list, tretment);
  const newQueue = [];
  list.map((element) => {
    const treatfind = tretment.find((a) => a._id === element.TreatmantType);
    // console.log(treatfind);

    if (new Date(element.DateTime) > currentDate) {
      const a = new Date(element.DateTime);
      newQueue.push({ ...element, "DateTime": a.toLocaleString(), "TreatmantType": treatfind });
    }
    
  });
  console.log(newQueue);
  return newQueue; 
};

const findTretmentQueuewithoutDate = async (list, tretment) => {
  console.log(list, tretment);
  const newQueue = [];
  list.map((element) => {
    const treatfind = tretment.find((a) => a.id._id === element.TreatmantType);
     console.log(element.DateTime);

      const a = new Date(element.DateTime);
      console.log(a,a.toLocaleString())
     
      newQueue.push({ ...element, "DateTime": a.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }), "TreatmantType": treatfind.id });
  });
  console.log(newQueue);
  return newQueue; 
};
const findCustomerQueue = async (list, customer) => {
  console.log(list, customer);
  const newQueue = [];
  list.map((element) => {
    const custfind = customer.find((a) => a._id === element.Customer);
     console.log(custfind);

     // const a = new Date(element.DateTime);
      newQueue.push({ ...element,"Customer": custfind });
  });
  console.log(newQueue);
  return newQueue; 
};

const handleJoinWaitingListClick = async (userID,filteredTreatm,date,selectedTimeOfDay,userSend,serviceId) => {

  console.log(userID,filteredTreatm._id,date,selectedTimeOfDay,userSend.Mail)
  try {
    const data = {
      userId: userID,
      treatmentId:filteredTreatm._id ,
      preferredDate:date,
      preferredTime:selectedTimeOfDay,
      userMail:userSend.Mail,
      serviceId:serviceId
    };
    console.log(data)

    const response = await axios.post('http://localhost:3321/waitList/newWaitList', data);
    if (response.data) {
      console.log(response.data);
      
    } else {
      throw new Error('Error adding user to the waitList.');
    }
  } catch (error) {
    console.error('Error adding user to the waitList:', error);
    throw error;
  }
  alert("הוספת לרשימת המתנה בוצעה בהצלחה. תודה שבחרת להמתין!");
};

function areDatesOnSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const checkWaitList = async (serviceId,name,family, selectedTimeOfDay, date1, userSend) => {
  try {
    const response = await axios.get('http://localhost:3321/waitList/getWatting');
    if (response.data) {
      console.log(response.data);
      for (const element of response.data) {
        const date2 = new Date(element.preferredDate);
        console.log(
          element.serviceId === serviceId,
          element.preferredTime === selectedTimeOfDay,
          areDatesOnSameDay(date2,date1)
        );
        console.log(
          element.serviceId,
          serviceId,
          element.preferredTime,
          selectedTimeOfDay,
          date1,
         date2
        );

        console.log(areDatesOnSameDay(date2,date1),date2, date1);

        if (
          element.serviceId === serviceId &&
          element.preferredTime === selectedTimeOfDay &&
          areDatesOnSameDay(date2,date1)
        ) {
          const date = new Date(date1);
          const formattedDate = date.toLocaleDateString('en-IL'); 
          const responsee = await axios.post('http://localhost:3321/send-mail', {
            to: userSend.Mail,
            // body:"fghj"
            body: family + " " + name + "אצל" + formattedDate + " - קיים שעה שונה זמינה בתאריך",
          });

          console.log(responsee.data);
          console.log(element._id)
          const response1 = await axios.delete(`http://localhost:3321/waitList/deleteWaittingById:${element._id}`);
          console.log(response1.data)
        }
      }
    } else {
      throw new Error('Error adding user to the waitList.');
    }
  } catch (error) {
    console.error('Error checking waitlist:', error);
  }
};

export { addToQueueApi, findTretmentQueue,findTretmentQueuewithoutDate ,findCustomerQueue,handleJoinWaitingListClick,checkWaitList};