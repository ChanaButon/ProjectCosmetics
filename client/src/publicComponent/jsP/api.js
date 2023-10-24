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
  // console.log(list, tretment);
  const newQueue = [];
  list.map((element) => {
    const treatfind = tretment.find((a) => a._id === element.TreatmantType);
    // console.log(treatfind);

      const a = new Date(element.DateTime);
      newQueue.push({ ...element, "DateTime": a.toLocaleString(), "TreatmantType": treatfind });
  });
  console.log(newQueue);
  return newQueue; 
};


export { addToQueueApi, findTretmentQueue };