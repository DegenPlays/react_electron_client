// UsersPage.js
import React, { useEffect, useState } from 'react';
import { socket } from '../components/socket';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Use websockets to fetch users from the server
    socket.emit('get-users');

    // Listen for user data from the server
    socket.on('users-data', data => {
      setUsers(data);
    });

    return () => {
      // Clean up event listener when the component unmounts
      socket.off('users-data');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>User Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default UsersPage;
