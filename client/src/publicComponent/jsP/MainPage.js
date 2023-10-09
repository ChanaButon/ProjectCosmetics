import img from '../../images/IMG_8090.JPG'
import React, { useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
// import { Image } from 'semantic-ui-react'
//import Login from '../../professionalComponent/Login'
import axios from 'axios'


const  ListExampleCelled = () => {

  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(true);
  const navigate=useNavigate();
  const [detaill,setdetail]=useState([]);

  const getAllProducts = async () => {
    const response = await fetch('http://localhost:3321/product/getProducts');
    const data = await response.json();
    setProductsData(data)
    console.log(data)
    console.log(productsData)
    console.log(data[0].TreatmantID[0])
  }

    const findTreatmentNames = (treatmentIds) => {
      const treatmentNames = [];
      // Assuming treatmentsData is an array containing treatment objects with 'id' and 'name' properties
      treatmentIds.forEach((treatmentId) => {
        const foundTreatment = treatmentsData.find((treatment) => treatment.id === treatmentId);
        if (foundTreatment) {
          treatmentNames.push(foundTreatment.name);
        }
      });
    
      return treatmentNames;
    };

  return treatmentNames;
};

    // const response1 = await fetch('http://localhost:3321/User/getUserbyID');
    //  const data11 = await response1.json();
    // setUserData(data11)
    // console.log(data11)
  

  
  
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
      const Chat = () => {
        
        navigate("/Chat")
        setVisible(false)
        }
  
  
        // const detail = async () => {
        //   console.log("meo");
        //   const userPromises = productsData.map(async (element) => {
        //     try {
        //       const res = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
        //       //element.TreatmantID.map(async(treat)=>{
        //       //  console.log(treat)
        //      // const res1 = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
        //     // const res1 = await axios.get(`http://localhost:3321/treatmant/findTreatById/${treat}`);
        //      // console.log(res1)
        //       //})
              
        //       if (res.data) {
        //         const d = res.data;
        //         console.log(d);
        //         return d;
        //       }
        //     } catch (err) {
        //       console.log(err);
        //       alert("אירעה שגיאה");
        //     }
        //   });
      
        //   const userDataResults = await Promise.all(userPromises);
        //   setUserData(userDataResults);
        // };


        const detail = async () => {
          const userPromises = productsData.map(async (element) => {
            try {
              const userResponse = await axios.get(`http://localhost:3321/User/findUserById/${element.UserID}`);
              const treatmentResponse = await axios.get(`http://localhost:3321/treatmant/findTreatById/${element.TreatmantID[0]}`);
        
              if (userResponse.data && treatmentResponse.data) {
                const user = userResponse.data;
                const treatment = treatmentResponse.data;
        
                const userDataItem = {
                  name: user.id.Name,
                  familyName: user.id.FamilyName,
                  treatment: treatment.name, // Assuming the treatment object has a 'name' property
                };
        
                return userDataItem;
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
    userData.map((user, index) => (
      <div className="userDetail" key={index}>
        <h1 onClick={Chat}>{user.name} {user.familyName}</h1>
        <p>Treatment: {user.treatment}</p>
      </div>
    ))}
      </div>


      {visible ? <div>      

<h1> :התורים הקרובים שלך</h1>
<h2>יום שני 14:00</h2>
  <button onClick={nextPageDetails} className="button1">לשינוי/ביטול תור </button>

  </div> : <div />}
    </div>

  )
export default  ListExampleCelled



  

// import React from 'react'
// import { Image, List } from 'semantic-ui-react'

// const ListExampleSizes = () => {
//   const sizes = [ 'huge']

//   return (
//     <div>
//       {sizes.map((size) => (
//         <div key={size}>
//           <List divided horizontal size={size}>
//             <List.Item>
//               <Image avatar src='/images/avatar/small/helen.jpg' />
//               <List.Content>
//                 <List.Header>Helen</List.Header>
//               </List.Content>
//             </List.Item>
//             <List.Item>
//               <Image avatar src='/images/avatar/small/christian.jpg' />
//               <List.Content>
//                 <List.Header>Christian</List.Header>
//               </List.Content>
              
//             </List.Item>
//             <List.Item>
//               <Image avatar src='/images/avatar/small/daniel.jpg' />
//               <List.Content>
//                 <List.Header>Daniel</List.Header>
//                 טיפול פנים
//               </List.Content>
//             </List.Item>
//           </List>

//           <br />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ListExampleSizes