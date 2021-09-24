import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useLocalStorage from '../hooks/useLocalStorage';

const CreateRoom = () => {
  const [room, setRoom] = useLocalStorage('id');
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setRoom(uuidV4());
  };

  const handleCopy = () => {
    setCopied(true);
  };

  const url = window.location.href;

  return (
    <>
      <div
        className='container-fluid d-flex flex-column justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        {room ? (
          <div className=' d-flex flex-column justify-content-center align-items-center'>
            {' '}
            <strong>Your Room ID: </strong> {room}
            <CopyToClipboard text={`${url}room/${room}`} onCopy={handleCopy}>
              <button className='btn btn-secondary btn-sm p-0 mt-1 mb-1'>
                Copy Room link to clipboard
              </button>
            </CopyToClipboard>
            {copied ? (
              <span style={{ color: 'green' }}>
                Copied! Share link so others can join your Room.
              </span>
            ) : null}
            <Link to={`/room/${room}`}>
              <button
                className='btn btn-primary rounded-0 shadow-none mt-3'
                onClick={handleClick}
              >
                Click To Enter Room
              </button>
            </Link>
          </div>
        ) : (
          <button
            className='btn btn-primary btn-lg rounded-0 shadow-none'
            onClick={handleClick}
          >
            Create a Room
          </button>
        )}
      </div>
    </>
  );
};

export default CreateRoom;
