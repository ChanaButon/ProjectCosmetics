import axios from 'axios';

const addToQueue = async (selectedDate,treatmant, customerId) => {
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
      return "התור נוסף בהצלחה" // Assuming your server sends a success message back
    } else {
      throw new Error('Error adding user to the queue.');
    }
  } catch (error) {
    console.error('Error adding user to the queue:', error);
    throw error;
  }
};

export default addToQueue;
