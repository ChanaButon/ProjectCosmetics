import axios from 'axios';

const addToQueue = async (selectedDate,treatmant, customerId,productId) => {
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

export default addToQueue;


const findTretmentQueue = async () =>{
  console.log(myQueue)
  let flattenedObject = []
  const userQueue = []
  myQueue.map(element=>{
      // console.log(myQueue)
      // console.log(tretment)
      const treatfind = tretment.find(a=>a.id._id===element.TreatmantType)
      console.log(treatfind)
      if (treatfind) {
        flattenedObject = {
          _id: treatfind.id._id,
          TreatmantName: treatfind.id.TreatmantName,
          Price: treatfind.id.Price,
          TreatmantTime: treatfind.id.TreatmantTime
        };

      }
      // console.log({ ...element, "TreatmantType": flattenedObject })
      if(new Date(element.DateTime) > currentDate){
        // console.log()
        const a = new Date(element.DateTime)
        console.log({ ...element,"DateTime1":a.toLocaleString(), "TreatmantType": flattenedObject })
       // console.log(a.getHours()+3,a.getMinutes())
      userQueue.push({ ...element,"DateTime":a.toLocaleString(), "TreatmantType": flattenedObject })
      }
    })
    console.log(userQueue)
    setFinQueue(userQueue)

}