import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Details from './Details';

export default function HomeClient() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            
          היי  שירה
          <Details/>
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
}

