import React from 'react'

import Accordion from 'react-bootstrap/Accordion';

export default function Details(user) {
  console.log(user.user.userName.Name)
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>אודות קוסמטיק</Accordion.Header>
        <Accordion.Body>
          האתר יעזור לך לקבוע תור במהריות וביעילות
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>מדיניות האתר</Accordion.Header>
        <Accordion.Body>
          אין התחייבות כספית
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>פירוט העסק</Accordion.Header>
        <Accordion.Body>
          <p>שם בעל העסק: {user.user.userName.Name} {user.user.userName.Family}</p>
          <p>תיאור העסק:  {user.user.userName.Describe}</p>
          <p>כתובת העסק:  {user.user.userName.Addres}</p>
          {/* <p>מספר עסק:{user.user.userName.Name}</p> */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}


