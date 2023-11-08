import React, { useState } from 'react';
import './search.css';
import Scroll from './Scroll'; // Import the Scroll component from the appropriate file location
import { useNavigate } from 'react-router-dom';

const Search = ({ finData, userSend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  console.log(finData)

  const favorite =finData.filter(user=>{
    console.log( userSend.user)
    const customer = user.Customers.find(a=>a=== userSend.user._id)
    console.log(customer)
    if( customer){
      return user
    }
  }) 
  console.log(favorite)
  const filteredUsers = finData.filter(user => {
    // Combine the first name and family name and perform search
    const fullName = `${user.Name} ${user.Family}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const Chat = (userid, filteredTreatm, allTreat, userSend) => {
    const value = finData.find(a => a._id === userid);
    console.log(finData, userid);
    navigate("/SignUp/MainPage/Chat", { state: { value, userid, filteredTreatm, allTreat, userSend } });
    //  navigate("/Chat")
    console.log(userid);
  }

  return (
    <div>
      <input
        className='SearchUser'
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Scroll>
        <div className='container'>
          {searchTerm && // Check if searchTerm is not empty
            filteredUsers.map((user) => (
              <div className="userDetail" key={user._id}>
                <ul className="custom-list">
                  <h3>{user.Name} {user.Family}</h3>
                  {user.TreatmantID && user.TreatmantID.map((filteredTreatm) => (
                    <div className="treatmentDetail" key={filteredTreatm._id}>
                      <li onClick={() => Chat(user._id, filteredTreatm, user.TreatmantID, userSend.user)}>{filteredTreatm.TreatmantName}</li>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Scroll>
    </div>
  );
};

export default Search;
