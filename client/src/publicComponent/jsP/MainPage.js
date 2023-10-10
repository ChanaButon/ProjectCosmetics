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
    console.log(data)
    console.log(productsData)
  };

  
  
  useEffect(() => {
    getAllProducts().then(() => {
      console.log(productsData); // Move this line here
    });
  }, []);

  useEffect(() => {
    console.log(productsData); // This will log the updated productsData
    if (productsData.length>0){
      detail();
    }
  }, [productsData]);
  
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
              //element.TreatmantID.map(async(treat)=>{
              //  console.log(treat)
             // const res1 = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
             // const res1 = await axios.get(`http://localhost:3321/treatmant/findTreatById/${treat}`);
             // console.log(res1)
              //})
              
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
      
    

{/* <button onClick={nextPageDetails} >התורים הקרובים שלך</button> */}
{/* <button>לשינוי/ביטול תור</button> */}
<div>
      {userData &&
          userData.map((user) =>
             (
              <div className="userDetail" key={user._id}>
                <h1 onClick={()=>Chat(user.id._id)}>{user.id.Name} {user.id.FamilyName}</h1>
                {/* <h1 onClick={googleSignIn}>{user.id.Name} {user.id.FamilyName}</h1> */}

                {/* <H/> */}
                {/* <h1>{user.id.FamilyName}</h1> */}
                
                </div>
                
               
            ) 
          )}
      </div>


      {visible ? <div>      

<h1> :התורים הקרובים שלך</h1>
<h2>יום שני 14:00</h2>
  <button onClick={nextPageDetails} className="button1">לשינוי/ביטול תור </button>

  </div> : <div />}  
    </div>

)

}

export default  ListExampleCelled



  
