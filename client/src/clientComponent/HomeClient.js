import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Details from './Details';

export default function HomeClient(userName) {
  console.log(userName.userName.Name)
  const[user,setUser]=useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (userName.length>0){
      console.log(userName);
      setUser(userName)
    }
  }, []);
  
  console.log(user)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        הגדרות
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>פרטים שלי</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
            
         <h3>היי {userName.userName.Name}</h3> 
          { userName&& < Details user={userName}/>}
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
}

