

import img from '../../images/IMG_8090.JPG'
import React, { useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
// import Details from '../../clientComponent/Details'
import { useNavigate } from 'react-router-dom';
// import { Image } from 'semantic-ui-react'
//import Login from '../../professionalComponent/Login'
//import Chat from '../jsP/Chat'



export default function ListExampleCelled  ()  {


  const [visible, setVisible] = useState(true);
  const navigate=useNavigate()

  const getAllProducts = async () => {
    const response = await fetch('http://localhost:3321/product/getProducts');
    const data = await response.json();
    setProductsData(data)
    console.log(data)

    const response1 = await fetch('http://localhost:3321/User/getUserbyID');
     const data11 = await response1.json();
    setUserData(data11)
    console.log(data11)
  };

  const [productsData, setProductsData] = useState([]);
  const [userData, setUserData] = useState([]);
  
  useEffect(()=>{
    getAllProducts();
  },[])
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
  
  

  return(
    <div>
      <button onClick={OwnerPage}>מעבר לדף העיסקי</button>

    <List celled>
    <List.Item onClick={Chat}>
      <Image  avatar src={img} />
      <List.Content>
        <List.Header>דליה</List.Header>
        גבות  
      </List.Content>
    </List.Item>
    <List.Item onClick={Chat}>
      <Image avatar src={img} />
      <List.Content>
        <List.Header>אפרת</List.Header>הלחמת ריסים
      </List.Content>
    </List.Item>
    <List.Item onClick={Chat}>
      <Image avatar src={img} />
      {/* <img ></img> */}
      <List.Content>
        <List.Header>חני</List.Header>
        טיפול פנים
      </List.Content>
    </List.Item>
  </List>
{visible ? <div>      

<h1> :התורים הקרובים שלך</h1>
<h2>יום שני 14:00</h2>
  <button onClick={nextPageDetails} className="button1">לשינוי/ביטול תור </button>

  </div> : <div />}  
{/* <button onClick={nextPageDetails} >התורים הקרובים שלך</button> */}
{/* <button>לשינוי/ביטול תור</button> */}

    </div>
)

}



  








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