import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import UserReducer from '../../redux/reducer'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../redux/actions'


const Register = (props) => {
  const navigate = useNavigate()
  const [nextPage1, setNextPage] = useState(false)
  const IDRef = useRef('null')
  const PasswordRef = useRef('null')
  const { dispatch } = props
  // if(nextPage1==true){

  //   navigate("/MainPage")
  // }



  const send = () => {

    let user1 = {
      ID: IDRef.current.value,
      Password: PasswordRef.current.value,
    }
    axios.post('http://localhost:3321/User/getUser', user1).then((res) => {
      console.log(res.data);
      if (res.data.status == false) {

        alert("not found")
      }
      else {

        //עדכון לסטור
        dispatch(setUser(res.data.getUser))
        navigate("/MainPage")
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
      <input ref={IDRef} placeholder='ID' id="lastNameInput" className="aaa bbb" type="text" />
    </div>
    <div className="inputColumn">
      <label htmlFor="lastNameInput" className="inputLabel">
        :סיסמא
      </label>
      <br />
      <input ref={PasswordRef} placeholder='PassWord' id="lastNameInput" className="aaa bbb" type="text" />
    </div>

    <Form.Checkbox inline label='אני מאשר/ת את תנאי האתר' />
    <Button onClick={send} color='pink'>Submit</Button>




  </div>
)
}

export default connect()(Register)
