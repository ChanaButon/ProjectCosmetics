import img from '../../images/IMG_8090.JPG'
import React, { useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
// import { Image } from 'semantic-ui-react'
//import Login from '../../professionalComponent/Login'
import axios from 'axios'
import H from './googleCalendar/googleCalnedar';
import DateTimePicker from 'react-datetime-picker';// import './h.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import './MainPage.css'

const  ListExampleCelled = () => {

  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(true);
  const navigate=useNavigate();
  const [detaill,setdetail]=useState([]);
  const [start, setStart] = useState(new Date);
  const [end, setEnd] = useState(new Date);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [tretment,setTretment]=useState([]);
  const [showPerson,setShowPerson]=useState({});

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });

    if (error) {
      alert("error");
      console.log(error);
    }
    Chat()
  }

  const getAllProducts = async () => {
    const response = await fetch('http://localhost:3321/product/getProducts');
    const data = await response.json();
    setProductsData(data)
    // console.log(data)
    // console.log(productsData)
    
    // const mio =data[0].TreatmantID[0];
    // // setTretment(mio)
    // console.log(mio);

    
    const allTreatments = [];

  // Map over each data object and its TreatmantID elements
  data.forEach(async (dataItem) => {
    const treatmentsPromises = dataItem.TreatmantID.map(async (element) => {
      try {
        const res1 = await axios.get(`http://localhost:3321/treatmant/findTreatById:${element}`);
        if (res1.data) {
          return res1.data;
        }
      } catch (err) {
        console.log(err);
        alert("אירעה שגיאה");
      }
    });

    const treatments = await Promise.all(treatmentsPromises);
    allTreatments.push(...treatments);
  });

  setTretment(allTreatments);
};





useEffect(() => {
  getAllProducts().then(() => {
    console.log(productsData);
  });
}, []);

  useEffect(() => {
    console.log(productsData); // This will log the updated productsData
    if (productsData.length>0){
      detail();
    }
  }, [productsData]);

  useEffect(() => {
    
    if (userData.length > 0 && tretment.length > 0) {
      //console.log(tretment[0].id.TreatmantName)
     // console.log(tretment.id.UserID)
      const personDict = userData.reduce((acc, user) => {
        const treatments = tretment
         // .filter((treatm) => treatm.id.UserID === user.id._id)
          .map((filteredTreatm) => filteredTreatm.id.TreatmantName);
        console.log(treatments[0])
        acc[user.id.Name] = treatments;
        console.log(treatments)
        return acc; 
      }, {});
      setShowPerson(personDict);
    }
  }, [userData, tretment]);

  // Now the showPerson state variable contains the dictionary.
  console.log(showPerson);

  
  
  const nextPageDetails = () => {
        
    navigate("/NextPageDetails")
    setVisible(false)
    }

    const OwnerPage = () => {
        
      navigate("/OwnerPage")
      setVisible(false)
    }
    const Chat = (userid) => {
     navigate("/Chat",{state:{userid}});
    //  navigate("/Chat")
      console.log(userid)
      setVisible(false)
    }
    
    const detail = async () => {
          console.log("meo");
          const userPromises = productsData.map(async (element) => {
            try {
              const res = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
              
              
              if (res.data) {
                const d = res.data;
                console.log(d);
                return d;
              }
            } catch (err) {
              console.log(err);
              alert("אירעה שגיאה");
            }
          });
      
          const userDataResults = await Promise.all(userPromises);
          setUserData(userDataResults);

         



        };






  return(
    <div>
      <button onClick={OwnerPage}>מעבר לדף העיסקי</button>
      
    

      // Inside your ListExampleCelled component

<div className="container">
  {userData &&
    userData.map((user) => (
      <div className="userDetail" key={user._id}>
        <h1 onClick={() => Chat(user.id._id)}>{user.id.Name}</h1>
        {tretment &&
          tretment
            .filter((treatm) => treatm.id.UserID === user.id._id)
            .map((filteredTreatm) => (
              <div className="tretmentDetail" key={filteredTreatm._id}>
                <h2>{filteredTreatm.id.TreatmantName}</h2>
              </div>
            ))}
      </div>
    ))}
  {visible && (
    <div>
      <h1>:התורים הקרובים שלך</h1>
      <h2>יום שני 14:00</h2>
      <button onClick={nextPageDetails} className="button1">
        לשינוי/ביטול תור
      </button>
    </div>
  )}


 

  </div> : <div />
    </div>

)

      }

export default  ListExampleCelled
