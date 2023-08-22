import React from 'react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addUser, setUser } from '../redux/actions'
import React from 'react';
import axios from 'axios';






const MyComponent = (props) => {
    const TreatmantNameRef = useRef('null')
    const PriceRef = useRef('null')
    const TreatmantTimeRef = useRef('null')

  const handleSubmit = () => {
    const options = {
        TreatmantName:TreatmantNameRef.current.value,
        Price: PriceRef.current.value,
        TreatmantTime: TreatmantTimeRef.current.value
    };

    axios.post('http://localhost:3321/Treat/newTreatmant',options).then((response) => {
        if (res.data) {
            console.log(res);
            //עדכון לסטור
            dispatch(setUser(res.data.newProduct))
            navigate("/MainPage")
          }
        }).catch((err) => {
          console.log(err);
          alert("אירעה שגיאה")
        })
  };


  return (
    <div>
      {/* טופס או אלמנטים נוספים */}
      <button onClick={handleSubmit}>שלח</button>
    </div>
  );
};

export default MyComponent;


