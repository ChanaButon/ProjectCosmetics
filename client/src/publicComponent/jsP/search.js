import React, { useState } from 'react';

const Search = ({ finData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = finData.filter(user => {
    // Combine the first name and family name and perform search
    const fullName = `${user.Name} ${user.Family}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

   
{filteredUsers &&
  filteredUsers.map((user) => (
    <div className="userDetail" key={user._id}>
      <ul className="custom-list">
      <h3 >{user.Name} {user.Family}</h3>
      {user.TreatmantID && user.TreatmantID.map((filteredTreatm) => (
        <div className="tretmentDetail" key={filteredTreatm._id}>
          <li >{filteredTreatm.TreatmantName}</li>
        </div>
        
      ))}
      </ul>
    </div>
  ))}
    </div>
  );
};

export default Search;
