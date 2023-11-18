// ChatPage.js
import React, { useState, useEffect } from 'react';
import { socket } from '../components/socket';

// Update client-side code

// ...

const ChatPage = ({ user }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
  
    useEffect(() => {
      // Use websockets to fetch users and chat history from the server
      socket.emit('get-users');
  
      // Listen for user data from the server
      socket.on('users-data', data => {
        // Exclude the current user from the list
        const filteredUsers = data.filter(u => u.id !== user.id);
        setUsers(filteredUsers);
      });
  
      // Listen for chat history data from the server
      socket.on('chat-history', data => {
        console.log('chat-history',data)
        console.log(parseInt(data.recipient))
        console.log(selectedUser.id)
        if (parseInt(data.recipient) === selectedUser.id) {
            console.log('loading history')
            console.log(data)
          setChatHistory(data.history);
        }
      });
  
      // Subscribe to chat events, e.g., 'receive-message'
      socket.on('receive-message', (data) => {
        console.log('receive-message',data)
        setMessages((prevMessages) => [...prevMessages, data]);
      });
  
      // Unsubscribe from events when the component is unmounted
      return () => {
        socket.off('receive-message');
        socket.off('users-data');
        socket.off('chat-history');
      };
    }, [selectedUser]);
  
    const handleSendMessage = () => {
      if (selectedUser && message.trim() !== '') {
        const data = {
          sender: user.id,
          senderName: user.username,
          recipient: selectedUser.id,
          message: message.trim(),
        };
  
        // Emit a 'send-message' event to the server
        socket.emit('send-message', data);
  
        // Update the local messages state
        setMessages((prevMessages) => [...prevMessages, data]);
  
        // Update the chat history for the recipient
        // setChatHistory((prevHistory) => [...prevHistory, data]);
  
        // Clear the message input
        setMessage('');
      }
    };
  
    const handleUserSelect = (chosenUser) => {
      setSelectedUser(chosenUser);
  
      // Load chat history for the selected user
      socket.emit('get-chat-history', { sender: user.id, recipient: chosenUser.id });
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <label>Select User:</label>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <button onClick={() => handleUserSelect(user)}>
                        {user.username}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedUser && (
            <div>
              <h3>Chatting with {selectedUser.username}</h3>
              <div>
                {/* Display the chat history */}
                {chatHistory.map((msg, index) => (
                  <div key={index}>
                    <strong>{msg.senderName}:</strong> {msg.message}
                  </div>
                ))}
              </div>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.senderName}:</strong> {msg.message}
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
      </header>
    </div>
  );
};

export default ChatPage;
  