



import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addUser, setUser } from '../redux/actions'//יבוא של השם של הפונקציה באקשנס שאותו נרצה להפעיל

// import '../register.css'
import '.././clientComponent/register.css'


// const mapStateToProps = (state) = {
//   return: {
//     aa: state.UserReducer.currentUser
//   }
// }



const Register = (props) => {
  const { dispatch,aa } = props
  const navigate = useNavigate()
   const [TreatmantID, setTreatmantID] = useState([
    "גבות/שפם",
    "מניקור",
    "פדיקור",
    "טיפול פנים",
    "הלחמת ריסים"
  ]);
  // const TreatmantID = ["גבות/שפם", "מניקור", "פדיקור", "טיפול פנים", "הלחמת ריסים "];
  const nameRef = useRef('null')
  const FamilyNameRef = useRef('null')
  const IDRef = useRef('null')
  const passwordRef = useRef('null')
  const MailRef = useRef('null')
  const PhoneRef = useRef('null')
  const checkListRef=useRef([])
  const TreatmantNameRef = useRef('null')
  const PriceRef = useRef('null')
  const TreatmantTimeRef = useRef('null')
 
const checkUser = () => {
  let selectedTreatments = TreatmantID.filter(
    (item, index) => checkListRef.current[index].checked
  );

    // const selectedTreatments = TreatmantID.filter((item, index) => checkListRefs[index].current.checked);
    //שליחת הנתונים להוספה לנוד - משתמש חדש כולל כל הנתונים 
    let product = {
      //מכיל את כל יוזר ואת כל עסק
      Name: nameRef.current.value,
      FamilyName:FamilyNameRef.current.value,
      ID:IDRef.current.value,
      Password: passwordRef.current.value,
      Mail:MailRef.current.value,
      Phone:PhoneRef.current.value,
      TreatmantName:selectedTreatments,
      
    }
   

    //שליחה לשרת
    axios.post('http://localhost:3321/Product/newProduct',product).then((res) => {
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






  }

  return (
    <div>
   
<div className="inputRow">
  <div className="inputColumn">
    <label htmlFor="firstNameInput" className="inputLabel">
      :שם פרטי
    </label>
    <br/>
    <input ref={nameRef} placeholder='Name' id="firstNameInput" className="aaa bbb"  type="text" />
  </div>
  <div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :שם משפחה
    </label>
    <br/>
    <input ref={FamilyNameRef}  placeholder='FamilyName' id="lastNameInput" className="aaa bbb" type="text" />
  </div>
<br/>
<div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :תעודת זהות
    </label>
    <br/>
    <input ref={IDRef}  placeholder='ID' id="lastNameInput" className="aaa bbb"  type="text" />
  </div>
{/* <br/> */}
<br/>
<div className="inputColumn">
    <label htmlFor="lastNameInput" className="inputLabel">
      :סיסמא
    </label>
    <br/>
    <input ref={passwordRef}  placeholder='PassWord' id="lastNameInput" className="aaa bbb" type="text" />
  </div>
  <div className="inputColumn">
    <label htmlFor="emailInput" className="inputLabel">
      :אימייל
    </label>
    <br/>
    <input ref={MailRef}  placeholder='Gmail' id="emailInput" className="aaa bbb"  type="email" />
  </div>
  <div className="inputColumn">
    <label htmlFor="phoneInput" className="inputLabel">
      :טלפון
    </label>
    <br/>
    <input ref={PhoneRef} placeholder='Phone' id="phoneInput" className="aaa bbb"  type="tel" />
  </div>
</div>
<div className="title">התמחות:</div>
{TreatmantID.map((item, index) => (
  <div  key={index}>
    <label htmlFor={`checkbox-${index}`} className="title">
      {item}
      
    </label>
    {/* <input ref={checkListRef.current[index]} type="checkbox" id={`checkbox-${index}`} name="specialization" className="checkbox-input" value={item} /> */}
    <input ref={ref => (checkListRef.current[index] = ref)} type="checkbox" id={`checkbox-${index}`} name="specialization" className="checkbox-input" value={item} />

  </div>
))}

        <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר' />
        <Button onClick={checkUser} color='pink'>Submit</Button>


    </div>
   )
 } 

export default connect()(Register)








