import React from 'react'

import Accordion from 'react-bootstrap/Accordion';

export default function Details() {
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
    </Accordion>
  );
}


