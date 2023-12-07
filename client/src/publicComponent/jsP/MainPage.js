  // import img from '../../images/IMG_8090.JPG'
  import React, { useEffect, useState } from 'react'
  // import { Image, List } from 'semantic-ui-react'
  import { useNavigate } from 'react-router-dom';
  // import { Image } from 'semantic-ui-react'
  //import Login from '../../professionalComponent/Login'
  import axios from 'axios'
  import { useLocation } from 'react-router-dom';
  // import H from './googleCalendar/googleCalnedar';
  // import DateTimePicker from 'react-datetime-picker';// import './h.css';
  import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
 import './MainPage.css'
import Search from './search.js'


  const  ListExampleCelled = () => {

    const location = useLocation();
    const { userSend } = location.state || {};
    

    const [userList, setUserList] = useState([]);
    const [finData, setfinData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [myQueue, setMyQueue] = useState([]);
    const navigate=useNavigate();
    console.log(finData)
    // const [detaill,setdetail]=useState([]);
    // const [start, setStart] = useState(new Date);
    // const [end, setEnd] = useState(new Date);
    const [userType, setUserType] = useState("");
    const [queueHistory, setQueueHistory] = useState([]);
    const [tretment,setTretment]=useState([]);
    const [finQueue,setFinQueue]=useState([]);
    const currentDate = new Date(); // Current date and time
    const { isLoading } = useSessionContext();
    console.log(userType)

    console.log(userList)

    

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = finData.filter(user => {
      // Combine the first name and family name and perform search
      const fullName = `${user.Name} ${user.Family}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const getAllUser = async () => {
        
      try {
        const response = await fetch(`http://localhost:3321/User/getAllUser`);
        const data = await response.json();
        setUserList(data);
        console.log(userList)
        
        // const type = data.find(temp => temp._id === userSend.user.UserType);
        // if (type) {
        //   setUserType(type); // Set userType state directly to the found type object
        // }
      } catch (error) {
        console.error(error);
        alert("אירעה שגיאה");
      }
      
    }


    const getAllProducts = async () => {
      const response = await fetch('http://localhost:3321/product/getProducts');
      const data = await response.json();
      setProductsData(data)
      const allTreatments = [];
    // console.log(data)

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
      connectedList.map(element  => {
        const listTreat = []
        element.TreatmantID.forEach((treat=>{
          // console.log(treat)
          const treatfind = tretment.find(a => a.id && a.id._id === treat);

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
    

    
    const nextPageDetails = (element) => {
      
      console.log(element)
      navigate("/NextPageDetails",{state:{element}})

      console.log(finQueue)
      setVisible(false)
      }

      const OwnerPage = () => {
          console.log(userSend,finData)
        const value= finData.find(a=>a.UserID===userSend.user._id)
        console.log(userData)
        console.log(value)
        navigate("/SignUp/MainPage/OwnerPage",{state:{value,tretment,userList}})
        setVisible(false)
      }
      
      
      const detail = async () => {
            
            const userPromises = productsData.map(async (element) => {
              try {
                const res = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
                if (res.data) {
                  const d = res.data;
                  // console.log(d);
                  return d;
                }
              } catch (err) {
                console.log(err);
                alert("אירעה שגיאה");
              }
            });
        
            const userDataResults = await Promise.all(userPromises);
            console.log(userDataResults)

            setUserData(userDataResults);

          };


          const handleExitClick = () => {
            navigate('/SignUp'); // Navigate to the main page
          };
          
          const queues = async () => {
          
            
            try {
              const res = await axios.get(`http://localhost:3321/queue/getQueueByCustomer${userSend.user._id}`);
              if (res.data) {
                const queue = res.data;
                setMyQueue(queue); // Update the state with the fetched data  
                setQueueHistory(queue);            
                return queue
              }
            } catch (err) {
              console.log(err);
              alert("אירעה שגיאה");
            }
            

          };

          const isWithinLastThreeMonths = (date) => {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return new Date(date) > threeMonthsAgo;
          };

        const findTretmentQueue = async () =>{
          console.log(myQueue)
          let flattenedObject = []
          const userQueue = []
          const userQueue1 = []
          myQueue.map(element=>{
              // console.log(myQueue)
              console.log(tretment)
              const treatfind = tretment.find(a => a.id && a.id._id === element.TreatmantType);

             // console.log(treatfind)
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
               // console.log({ ...element,"DateTime1":a.toLocaleString(), "TreatmantType": flattenedObject })
               // console.log(a.getHours()+3,a.getMinutes())
               const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
              userQueue.push({ ...element,"DateTime":a.toLocaleString('en-GB', options), "TreatmantType": flattenedObject })
              }
              else{
                const a = new Date(element.DateTime);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const formattedDate = a.toLocaleString('en-GB', options);
                if (isWithinLastThreeMonths(a)) {
                  userQueue1.push({ ...element, "DateTime": formattedDate, "TreatmantType": flattenedObject });
                }
              }
            })
            console.log(userQueue)
            setFinQueue(userQueue)
            setQueueHistory(userQueue1)
            console.log(finQueue)
            if(finQueue.length>0){
            setVisible(true)}

          }
        const findUserType = async () => {
        
          try {
            const response = await fetch(`http://localhost:3321/UserType/getAllUserType`);
            const data = await response.json();
            console.log(data,userSend,userSend.user.UserType)
            // setUserType(data);
            
            const type = data.find(temp => temp._id === userSend.user.UserType);
            console.log(type)
            if (type) {
              setUserType(type); // Set userType state directly to the found type object
            }
          } catch (error) {
            console.error(error);
            alert("אירעה שגיאה");
          }

        }
        

        const QueueHistoryTable = () => {
          console.log(queueHistory)
          return (
            <div className="queue-history">
              <h5>התורים שהיית בהם </h5>
              <h5>:ב - 3 חודשים האחרונים</h5>
              <table>
                <thead>
                  <tr>
                    <th>תאריך ושעה</th>
                    <th>סוג טיפול</th>
                  </tr>
                </thead>
                <tbody>
                  {queueHistory.map((element) => (
                    <tr key={element._id}>
                      <td>{element.DateTime}</td>
                      <td>{element.TreatmantType.TreatmantName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        };

    useEffect(() => {
    getAllProducts()
    getAllUser()
    queues()
    
    if (myQueue.length>0)
    {
      findTretmentQueue()
    }

    }, []);


      useEffect(() => {
      
      if (productsData.length > 0 && userData.length>0){
      updateDetail()
      findUserType()
      
      // console.log(userType)  
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
    <button className="exit-button" onClick={handleExitClick}>
      X
    </button>
    
    {userType && userType.userNameType === 'business' && (
        <button className='bootonBusnse' onClick={() => OwnerPage()}>
          מעבר לדף העיסקי
        </button>
      )}
      <h4 className='h4Queue'>:לקביעת תורים</h4>
      {finData.length > 0 && <Search finData={finData} userSend={userSend} />}
<div className="container1">
  <div className='TableDetail'>
{queueHistory.length>0 && <QueueHistoryTable />}
</div>
 {visible && (
  <div className="queue">
    <h1>:התורים הקרובים שלך</h1>
    {finQueue &&
      finQueue.map((element) => (
        <div className="userQueue" key = {element._id}>
          <h1>{element.DateTime}-{element.TreatmantType.TreatmantName}</h1>
          <button onClick={ () =>nextPageDetails(element)} className="button1">
            לפרטי / ביטול התור
    </button>
        </div>
      ))}
    
    
  </div>)}
</div>
</div>)
};


  export default  ListExampleCelled