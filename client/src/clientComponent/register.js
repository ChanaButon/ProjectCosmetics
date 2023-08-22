
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addUser, setUser } from '../redux/actions'//יבוא של השם של הפונקציה באקשנס שאותו נרצה להפעיל

import './register.css'

// const mapStateToProps = (state) = {
//   return: {
//     aa: state.UserReducer.currentUser
//   }
// }



const Register = (props) => {
  const { dispatch,aa } = props
  const navigate = useNavigate()
  const [nextPage1, setNextPage] = useState(false)
  const nameRef = useRef('null')
  const FamilyNameRef = useRef('null')
  const IDRef = useRef('null')
  const passwordRef = useRef('null')
  const MailRef = useRef('null')
  const PhoneRef = useRef('null')
  




  

  if (nextPage1 == true) {

    navigate("/MainPage")
  }



  const checkUser = () => {
    //שליחת הנתונים להוספה לנוד - משתמש חדש כולל כל הנתונים 
    let user = {
      Name: nameRef.current.value,
      FamilyName:FamilyNameRef.current.value,
      ID:IDRef.current.value,
      Password: passwordRef.current.value,
      Mail:MailRef.current.value,
      Phone:PhoneRef.current.value,
      

      //
    }

    //שליחה לשרת
    axios.post('http://localhost:3321/User/newUser', user).then((res) => {
      if (res.data) {
        console.log(res);
        //עדכון לסטור
        dispatch(setUser(res.data.newUser))
        navigate("/MainPage")
      }
    }).catch((err) => {
      console.log(err);
      alert("אירעה שגיאה")
    })
    // async function createEvent(event) {
    //   const response = await axios.post('/create-event', event);
    //   return response.data;
    // }


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

      {/* <Message
        attached
        header='ברוכים הבאים!'
        content='נא למלא פרטים ליצירת חשבון'
      /> */}
      {/* <Form className='attached fluid segment'> */}
        {/* <Form.Group widths='equal'> */}
        
        {/* <Form.Input
          fluid
          label='שם'
          placeholder='First Name'
          type='text'
          inputRef={nameRef}
        /> */}

        {/* <Form.Input
          fluid
          label=' משפחה'
          placeholder='Last Name'
          type='text'
        /> */}
        {/* </Form.Group> */}
        {/* <Form.Input label=' phone' placeholder='ID' type='text' /> */}
        {/* <Form.Input label=' mail' placeholder='GIMAIL' type='text' /> */}



        {/* <Form.Input label='סיסמא' placeholder='Password' type='password' /> */}
        <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר' />
        <Button onClick={checkUser} color='pink'>Submit</Button>
      {/* </Form>
      <Message attached='bottom' warning>
        <Icon name='עזרה' />
        רשום ?&nbsp;<button onClick={checkUser}> לחץ להרשמה</button>&nbsp;
      </Message> */}


    </div>
   )
 } 

export default connect()(Register)












// const MessageExampleAttached = ({ setNextPage }) => (

//   <div>
//     <Message
//       attached
//       header='ברוכים הבאים!'
//       content='נא למלא פרטים ליצירת חשבון'
//     />
//     <Form className='attached fluid segment'>
//       {/* <Form.Group widths='equal'> */}
//       <Form.Input
//         fluid
//         label=' שם'
//         placeholder='First Name'
//         type='text'
//       />
//       <Form.Input
//         fluid
//         label=' משפחה'
//         placeholder='Last Name'
//         type='text'
//       />
//       {/* </Form.Group> */}
//       <Form.Input label=' תעודת זהות' placeholder='ID' type='text' />


//       <Form.Input label='סיסמא' placeholder='Password' type='password' />
//       <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר' />
//       <Button onClick={() => setNextPage(true)} color=' light pink'>Submit</Button>
//     </Form>
//     <Message attached='bottom' warning>
//       <Icon name='עזרה' />
//       רשום ?&nbsp;<a href='#'> לחץ להתחברות</a>&nbsp;
//     </Message>


//   </div>
// )



