import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
// import UserReducer from '../../redux/reducer'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../redux/actions'
import { isValidId } from '../../validation/validationUtils'
import './SignUp.css'

const Register = (props) => {
  const navigate = useNavigate()
  // const [nextPage1, setNextPage] = useState(false)
  const IDRef = useRef('null')
  const PasswordRef = useRef('null')
  const { dispatch } = props
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [form, setForm] = useState({
    ID: false,
    Password: false,
  });


  const send = () => {

    
      setForm({
        ID: !isValidId(IDRef.current.value),
        Password: !PasswordRef.current.value,})
        console.log(form)

        if(Object.values(form).some((status) => status === true)){
          return
        }

        if (!isChecked) {
          setCheckboxError(true); // Set checkbox error to true
          return;
        }
        let user = {
         
          ID:IDRef.current.value,
          Password: PasswordRef.current.value,
          
    
        }
    
    axios.post('http://localhost:3321/User/getUser', user).then((res) => {
      console.log(res.data);
      const userSend = res.data;
      if (res.data.status === false) {

        alert("not found")
      }
      else {

        //עדכון לסטור
        dispatch(setUser(res.data.getUser))
        console.log(userSend)
        navigate("/MainPage",{state:{userSend}});
      }
    }
  ).catch ((err) => {
    console.log(err);
    alert("אירעה שגיאה")
  })
}

return (
  <div>
    <div className="inputColumn">
      <label htmlFor="lastNameInput" className="inputLabel">
        :תעודת זהות
      </label>
      <br />
      <input ref={IDRef} placeholder='ID' id="lastNameInput"  className={`aaa bbb ${form.ID ? 'error' : ''}`} type="text" />
      {form.ID && <span className="error-text">ת"ז לא תקינה,נסה שוב</span>}
    </div>
    <div className="inputColumn">
      <label htmlFor="lastNameInput" className="inputLabel">
        :סיסמא
      </label>
      <br />
      <input ref={PasswordRef} placeholder='PassWord' id="lastNameInput"  className={`aaa bbb ${form.Password ? 'error' : ''}`} type="text" />
      {form.Password && <span className="error-text">שדה חובה</span>}
    </div>

    <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר'  checked={isChecked} onChange={() => { setIsChecked(!isChecked); setCheckboxError(false);  }}/>
        {checkboxError && <span className="error-text">יש לאשר את תנאי האתר</span>}
    <Button onClick={send} color='pink'>Submit</Button>




  </div>
)
}

export default connect()(Register)
