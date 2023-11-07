import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Details from './Details';
import './HomeClient.css'
export default function HomeClient(userName) {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  // console.log(userName)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (userName.length > 0) {
      setUser(userName);
    }
  }, []);

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (show && e.target.id !== 'offcanvasTrigger' && e.target.id !== 'offcanvasBody') {
  //       handleClose();
  //     }
  //   };

  //   document.addEventListener('click', handleClick);
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [show]);

  return (
    <>
  <Button variant="primary" onClick={handleShow} className="offcanvas-trigger" id="offcanvasTrigger">
  ☰
  </Button>
  <div className="offcanvas-container">
    <Offcanvas show={show} onHide={handleClose} backdrop="static">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="offcanvas-title">פרטים שלי</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body" id="offcanvasBody">
        <h3>היי זה האתר של  {userName.userName.Name}</h3>
        {userName && <Details user={userName} />}
      </Offcanvas.Body>
    </Offcanvas>
  </div>
</>
  );
}
