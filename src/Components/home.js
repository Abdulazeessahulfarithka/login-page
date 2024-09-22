import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import API from '../API/api';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/api/user/alluser`); 
        console.log(response)
        if (response.data) {
          setUser(response.data);
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

      {user ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneno}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No user data found.</p>
      )}
    </>
  );
}

export default Home;
