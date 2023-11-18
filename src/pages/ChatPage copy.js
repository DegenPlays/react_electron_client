// ChatPage.js
import React, { useState, useEffect } from 'react';
import { socket } from '../components/socket';

const ChatPage = ({ user }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Use websockets to fetch users from the server
    socket.emit('get-users');

    // Listen for user data from the server
    socket.on('users-data', data => {
        const filteredUsers = data.filter(u => u.id !== user.id);
        setUsers(filteredUsers);
    });
    
    // Listen for chat history data from the server
    socket.on('chat-history', data => {
      if (data.recipient === selectedUser.id) {
        setChatHistory(data.history);
      }
    });

    // Subscribe to chat events, e.g., 'receive-message'
    socket.on('receive-message', (data) => {
      console.log(data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Unsubscribe from events when the component is unmounted
    return () => {
      socket.off('receive-message');
      socket.off('users-data');
      socket.off('chat-history');
    };
  }, []);

  const handleSendMessage = () => {
    if (selectedUser && message.trim() !== '') {
      const data = {
        sender: user.username,
        recipient: selectedUser.id,
        message: message.trim(),
      };

      // Emit a 'send-message' event to the server
      socket.emit('send-message', data);

      // Update the local messages state
      setMessages((prevMessages) => [...prevMessages, data]);

      // Clear the message input
      setMessage('');
    }
  };
  const handleUserSelect = (chosenUser) =>{
    setSelectedUser(chosenUser)
    socket.emit('get-chat-history', { recipient: chosenUser.id });
  }

  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        <label>Select User:</label>
        <table>
            <tbody>
            {users.map(curUser => (

                <tr key={curUser.id}>
                <td><button onClick={() => handleUserSelect(curUser)}>{curUser.username}</button></td>

                {/* Add more columns as needed */}
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      {selectedUser && (
        <div>
          <h3>Chatting with {selectedUser.username}</h3>
          <div>
            {/* Display the chat messages */}
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg}</strong>
                <strong>{msg.sender}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
