import { useState } from 'react';
import Chat from '../Chat';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8001');

const JoinRoom = ({ match }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', username, room);
      setShowChat(true);
      socket.emit('participants', username, room);
    }
  };

  return (
    <div className='row container-fluid'>
      <div className='col-md-8 col-lg-6 mx-auto'>
        {!showChat ? (
          <>
            <h3 className='text-center mt-4'>Ready to Enter Room</h3>
            <input
              type='text'
              className='form-control mb-2 shadow-none rounded-0'
              placeholder='Enter username...'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setRoom(match.params.roomId);
              }}
            />
            <button
              type='button'
              className='btn btn-primary form-control shadow-none rounded-0'
              onClick={joinRoom}
            >
              Enter Room
            </button>
          </>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
};

export default JoinRoom;
