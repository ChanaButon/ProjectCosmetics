import img from '../../images/IMG_8090.JPG'
import React, { useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
// import { Image } from 'semantic-ui-react'
//import Login from '../../professionalComponent/Login'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import H from './googleCalendar/googleCalnedar';
import DateTimePicker from 'react-datetime-picker';// import './h.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import './MainPage.css'

const  ListExampleCelled = () => {

  const location = useLocation();
  const { userSend } = location.state || {};
  console.log(userSend)

  const [finData, setfinData] = useState([]);
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



  

  const updateDetail = () => {
    console.log("hi")
    const connectedList = productsData.map(element => {
    const corresponding = userData.find(e => e.id._id === element.UserID);
    console.log(corresponding.id)
      if (corresponding) {
        console.log({
          ...element,
          "Name": corresponding.id.Name,"Family":corresponding.id.FamilyName
        })
        return {
          ...element,
          "Name": corresponding.id.Name,"Family":corresponding.id.FamilyName
        };
       
      }
      return null;
    }).filter(item => item !== null);
    console.log(connectedList)
    const listuser = []
    const userTreat = connectedList.map(element=>{
      const listTreat = []
      console.log(element)
      element.TreatmantID.forEach((treat=>{
        // console.log(treat)
        // console.log(tretment)
        const treatfind = tretment.find(a=>a.id._id===treat)
        console.log(treatfind)
        if (treatfind) {
          const flattenedObject = {
            _id: treatfind.id._id,
            TreatmantName: treatfind.id.TreatmantName,
            Price: treatfind.id.Price,
            TreatmantTime: treatfind.id.TreatmantTime
          };
          listTreat.push(flattenedObject);
          //console.log(listTreat)

        }
      }))
      console.log(listTreat)
      console.log({ ...element, "TreatmantID": listTreat })
      listuser.push({ ...element, "TreatmantID": listTreat })
      console.log(listuser)
    })
    console.log(listuser)
    setfinData(listuser)
    //setProductsData(listuser);
    // setProductsData(user)
    // setDeatailUserList((prevUser) => ({ ...prevUser, WorkingDay: connectedList }));
  };
  

  
  const nextPageDetails = () => {
        
    navigate("/NextPageDetails")
    setVisible(false)
    }

    const OwnerPage = () => {
        
      navigate("/OwnerPage")
      setVisible(false)
    }
    const Chat = (userid,filteredTreatm,userSend) => {
      console.log(userid,filteredTreatm,userSend)
     navigate("/Chat",{state:{userid,filteredTreatm,userSend}});
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


useEffect(() => {
 getAllProducts()
}, []);
// useEffect(() => {
//   console.log(finData)
//  }, [finData]);
useEffect(() => {
    
  console.log(userData.length)
  if (productsData.length > 0 && userData.length>0){
    updateDetail()
  }
}, [userData]);

  useEffect(() => {
    console.log(productsData); // This will log the updated productsData
    if (productsData.length>0){
      detail();
    }
  }, [productsData]);
  if (isLoading) {
    return <></>
  }
  

  return(
    <div>
      <button onClick={OwnerPage}>מעבר לדף העיסקי</button>
      
    

      // Inside your ListExampleCelled component

<div className="container">
{finData &&
  finData.map((user) => (
    <div className="userDetail" key={user._id}>
      <h1 onClick={() => Chat(user.UserID)}>{user.Name}</h1>
      {user.TreatmantID && user.TreatmantID.map((filteredTreatm) => (
        <div className="tretmentDetail" key={filteredTreatm._id}>
          <h2 onClick={() => Chat(user._id,filteredTreatm,userSend.user)}>{filteredTreatm.TreatmantName}</h2>
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