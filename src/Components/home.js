import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import API from '../API/api';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/api/user/alluser`);
        console.log('API Response:', response.data); 

        if (response.data.success && response.data.data.length > 0) {
          setUsers(response.data.data); 
        } else {
          setUsers([]); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <h1>Welcome to the page</h1>
      {users.length > 0 ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data found.</p>
      )}
    </>
  );
}

export default Home;
