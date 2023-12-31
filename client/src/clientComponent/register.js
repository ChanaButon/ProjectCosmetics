
import React, { useRef, useState,useEffect  } from 'react'

import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import {  setUser } from '../redux/actions'//יבוא של השם של הפונקציה באקשנס שאותו נרצה להפעיל

import './register.css'
import { isValidPhoneNumber } from '../validation/validationUtils.js'
import {isValidEmail} from '../validation/validationUtils'
import { isValidId } from '../validation/validationUtils.js'

const Register = (props) => {
  const { dispatch } = props
  const navigate = useNavigate()
  const [nextPage1, setNextPage] = useState(false)
  const nameRef = useRef('null')
  const FamilyNameRef = useRef('null')
  const IDRef = useRef('null')
  const passwordRef = useRef('null')
  const MailRef = useRef('null')
  const PhoneRef = useRef('null')

  const [formErrors, setFormErrors] = useState({
    name: false,
    familyName: false,
    ID: false,
    password: false,
    mail: false,
    phone: false,
  });
  const [checkboxError, setCheckboxError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
 // const [isPageOpen, setIsPageOpen] = useState(true);

  
  const handleExitClick = () => {
    navigate('/'); // Navigate to the main page
  };

  if (nextPage1 == true) {

    navigate("/register/MainPage")
  }



  useEffect(() => {
    if (Object.values(formErrors).some((status) => status === true)) {
      return;
    }

    if (!isChecked) {
      setCheckboxError(true); // Set checkbox error to true
      return;
    }

    // Continue with the rest of your code (axios.post, navigation, etc.)
  }, [formErrors, isChecked]);

  const checkUser = () => {
    
    setFormErrors({name: !nameRef.current.value,
      familyName: !FamilyNameRef.current.value,
      ID: !isValidId(IDRef.current.value),
      password: !passwordRef.current.value,
      mail: !isValidEmail(MailRef.current.value),
      phone: !isValidPhoneNumber(PhoneRef.current.value),
  });
    
    console.log(formErrors);



    //שליחת הנתונים להוספה לנוד - משתמש חדש כולל כל הנתונים 
    let user = {
      Name: nameRef.current.value,
      FamilyName:FamilyNameRef.current.value,
      ID:IDRef.current.value,
      Password: passwordRef.current.value,
      Mail:MailRef.current.value,
      Phone:PhoneRef.current.value,
      Type: "client",
      

    }
    console.log(isValidEmail(MailRef.current.value),isValidPhoneNumber(PhoneRef.current.value),isValidId(IDRef.current.value))
    if(user.Name!==""&&user.FamilyName!==""&&user.ID!==""&&user.Password!==""&&user.Mail!==""&&user.Phone!==""&&isValidEmail(MailRef.current.value)&&isValidPhoneNumber(PhoneRef.current.value)&&isValidId(IDRef.current.value))
    {
    //שליחה לשרת
    axios.post('http://localhost:3321/User/newUser', user).then((res) => {
      if (res.data) {
        const userSend = {"user":res.data}
        console.log(userSend)
        dispatch(setUser(res.data.newUser))
        navigate("/register/MainPage",{state:{userSend}})
      }
    }).catch((err) => {
      console.log(err);
      alert("אירעה שגיאה")
    })

  }
  }
  return (
    <div>
      <button className="exit-button" onClick={handleExitClick}>
      X
    </button>
   
<div className="inputRow">
  <div className="inputColumn">
    <label htmlFor="firstNameInput" className="inputLabel">
      :שם פרטי
    </label>
    <br/>
    <input ref={nameRef} placeholder='Name' id="firstNameInput" className={`aaa bbb ${formErrors.name ? 'error' : ''}`}  type="text" />
    {formErrors.name && <span className="error-text">שדה חובה</span>}
  </div> 
  <div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :שם משפחה
    </label>
    <br/>
    <input ref={FamilyNameRef}  placeholder='FamilyName' id="lastNameInput"  className={`aaa bbb ${formErrors.familyName ? 'error' : ''}`} type="text" />
    {formErrors.familyName && <span className="error-text">שדה חובה</span>}
  </div>
<br/>
<div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :תעודת זהות
    </label>
    <br/>
    <input ref={IDRef}  placeholder='ID' id="lastNameInput" className={`aaa bbb ${formErrors.ID ? 'error' : ''}`}   />
    {formErrors.ID && <span className="error-text">ת"ז לא תקינה ,הקש שוב</span>}
  </div>
{/* <br/> */}
<br/>
<div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :סיסמא
    </label>
    <br/>
    <input ref={passwordRef}  placeholder='PassWord' id="lastNameInput" className={`aaa bbb ${formErrors.password ? 'error' : ''}`} type="text" />
    {formErrors.password && <span className="error-text">שדה חובה</span>}
  </div>
  <div className="inputColumn">
    <label htmlFor="emailInput" className="inputLabel">
      :אימייל
    </label>
    <br/>
    <input ref={MailRef}  placeholder='Gmail' id="emailInput" className={`aaa bbb ${formErrors.mail ? 'error' : ''}`}   type="email" />
    {formErrors.mail && <span className="error-text">מייל לא תקין, הקש שוב</span>}
  </div>
  <div className="inputColumn">
    <label htmlFor="phoneInput" className="inputLabel">
      :טלפון
    </label>
    <br/>
    <input  ref={PhoneRef} placeholder='Phone' id="phoneInput" className={`aaa bbb ${formErrors.phone ? 'error' : ''}`}  type="tel" />
    {formErrors.phone && <span className="error-text">הקש מספר טלפון תקין</span>}
  </div>
</div>

      
        <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר'  checked={isChecked} onChange={() => { setIsChecked(!isChecked); setCheckboxError(false);  }}/>
        {checkboxError && <span className="error-text">יש לאשר את תנאי האתר</span>}
        <Button onClick={checkUser} color='pink'>Submit</Button>
      


    </div>
   )

 } 



export default connect()(Register)