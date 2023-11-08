import React, { useState } from 'react';
import './search.css';
import Scroll from './Scroll';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';


const Search = ({ finData, userSend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const favoriteUsers = finData.filter(user => {
    const customer = user.Customers.find(a => a === userSend.user._id);
    return customer;
  });

  const filteredUsers = searchTerm ? finData.filter(user => {
    const fullName = `${user.Name} ${user.Family}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  }) : favoriteUsers;

  const Chat = (userid, filteredTreatm, allTreat, userSend) => {
    const value = finData.find(a => a._id === userid);
    navigate("/SignUp/MainPage/Chat", { state: { value, userid, filteredTreatm, allTreat, userSend } });
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
      <div className="searchIcon">
          <FaSearch />
        </div>
      <Scroll>
        <div className='container'>
          {filteredUsers.map((user) => (
            <div className="userDetail" key={user._id}>
              <ul className="custom-list">
                <h3>
                  {favoriteUsers.some(favUser => favUser._id === user._id) ? (
                    <span className="iconWithBlackBorder" style={{ marginRight: '5px', fontSize: '1.2em' }}>    <FaHeart color="red" size={20} /> 
                    </span >
                  ) : (
                    <span className="iconWithBlackBorder" style={{ marginRight: '5px', fontSize: '1.2em' }}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="iconWithBlackBorder"
                  >
                    <path
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg> </span>
                  )}
                  {user.Name} {user.Family}
                </h3>
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
