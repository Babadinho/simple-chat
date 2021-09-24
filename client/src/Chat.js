import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import io from 'socket.io-client';

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessage = async () => {
    if (message) {
      const messageData = {
        author: username,
        room: room,
        message: message,
        time: moment(new Date()).format('kk:mm'),
      };

      await socket.emit('send_message', messageData);
      // setMessageList((list) => [...list, messageData]);
    }
    setMessage('');
  };

  const receiveMessage = () => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  };

  const showParticipants = () => {
    socket.on('show_participants', (clients) => {
      console.log(clients);
      setParticipants(clients);
    });

    socket.on('joined_users', (user) => {
      setUsers((list) => [...list, user]);
    });
  };

  useEffect(() => {
    receiveMessage();
    showParticipants();
  }, [socket]);

  return (
    <div className='chat-window mt-5'>
      <div className='d-flex'>
        <h5 className='me-2'>Room ID: {room}</h5>{' '}
      </div>
      <div className='chat-header'>
        <p>Live Chat ({participants.length})</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent, index) => {
            return (
              <div
                className='message'
                id={username === messageContent.author ? 'you' : 'other'}
                key={index}
              >
                <div>
                  <div className='message-meta'>
                    <p className='text-muted text-capitalize' id='author'>
                      {messageContent.author === username
                        ? 'You'
                        : messageContent.author}
                    </p>
                  </div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p className='time' id='time'>
                      {messageContent.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <div class='input-group mb-3'>
          <input
            type='text'
            class='form-control rounded-0 shadow-none border-top-0'
            placeholder='Enter message..'
            value={message}
            aria-label="Recipient's username"
            aria-describedby='button-addon2'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === 'Enter' && sendMessage();
            }}
          />
          <button
            class='btn btn-primary rounded-0 shadow-none'
            type='button'
            id='button-addon2'
            onClick={sendMessage}
          >
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
