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
  const [finData, setfinData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [myQueue, setMyQueue] = useState([]);
  const navigate=useNavigate();
  const [detaill,setdetail]=useState([]);
  const [start, setStart] = useState(new Date);
  const [end, setEnd] = useState(new Date);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [tretment,setTretment]=useState([]);
  const [finQueue,setFinQueue]=useState([]);
  const currentDate = new Date(); // Current date and time
  const [dateTimequeue,setdateTimequeue]=useState({});

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
    if(treatments.length===1){
    allTreatments.push(...treatments);
  }else{
    allTreatments.push(...treatments);
  }
  setTretment([...allTreatments])
  });
};



  

  const updateDetail = () => {
    const connectedList = productsData.map(element => {
    const corresponding = userData.find(e => e.id._id === element.UserID);
      if (corresponding) {
        return {
          ...element,
          "Name": corresponding.id.Name,"Family":corresponding.id.FamilyName
        };
       
      }
      return null;
    }).filter(item => item !== null);
    const listuser = []
    const userTreat = connectedList.map(element=>{
      const listTreat = []
      element.TreatmantID.forEach((treat=>{
        // console.log(treat)
        const treatfind = tretment.find(a=>a.id._id===treat)
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
      listuser.push({ ...element, "TreatmantID": listTreat })
    })
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
    const Chat = (userid,filteredTreatm,allTreat,userSend) => {
     navigate("/Chat",{state:{userid,filteredTreatm,allTreat,userSend}});
    //  navigate("/Chat")
      console.log(userid)
      setVisible(false)
    }
    
    const detail = async () => {
          
          const userPromises = productsData.map(async (element) => {
            try {
              const res = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
              if (res.data) {
                const d = res.data;
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
        
        const queues = async () => {
         
          
          try {
            const res = await axios.get(`http://localhost:3321/queue/getQueueByCustomer${userSend.user._id}`);
            if (res.data) {
              const queue = res.data;
              setMyQueue(queue); // Update the state with the fetched data              
              return queue
            }
          } catch (err) {
            console.log(err);
            alert("אירעה שגיאה");
          }
          

        };

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
      
          



useEffect(() => {
 getAllProducts()
 queues()
 if (myQueue.length>0)
 {
  findTretmentQueue()
 }

}, []);

// useEffect(() => {
//   console.log(finData)
//  }, [finData]);
useEffect(() => {
    
  if (productsData.length > 0 && userData.length>0){
    updateDetail()
  }
}, [userData]);

  useEffect(() => {
    if (productsData.length>0){
      console.log(productsData);
      detail();
    }
  }, [productsData]);
  useEffect(() => {
    
    if (myQueue.length>0 && tretment.length>0 )
    {
      console.log(tretment)
     findTretmentQueue()
    }
   
   }, [myQueue,tretment]);

  if (isLoading) {
    return (<></>)
  }


return(
  <div>
  <button onClick={OwnerPage}>מעבר לדף העיסקי</button>
<div className="container">
{finData &&
  finData.map((user) => (
    <div className="userDetail" key={user._id}>
      <ul className="custom-list">
      <h3 >{user.Name}</h3>
      {user.TreatmantID && user.TreatmantID.map((filteredTreatm) => (
        <div className="tretmentDetail" key={filteredTreatm._id}>
          <li onClick={() => Chat(user._id,filteredTreatm,user.TreatmantID,userSend.user)}>{filteredTreatm.TreatmantName}</li>
        </div>
        
      ))}
      </ul>
    </div>
  ))}
 {visible && (
  <div className="queue">
    <h1>:התורים הקרובים שלך</h1>
    {finQueue &&
      finQueue.map((element) => (
        <div className="userQueue">
          <h3>{element.DateTime}-{element.TreatmantType.TreatmantName}</h3>
          <button onClick={nextPageDetails} className="button1">
      לשינוי/ביטול תור
    </button>
        </div>
      ))}
    
    
  </div>)}
</div>
</div>)
};
 


export default  ListExampleCelled