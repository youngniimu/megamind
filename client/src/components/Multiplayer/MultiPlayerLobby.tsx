import React, { useState, useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';

import { ToggleSwitch } from '../Common/ToggleSwitch/ToggleSwitch';

interface Room {
  roomName: string;
  id: string;
  admin: string;
  players: string[];
  password: string;
  publicRoom: boolean;
}

const MultiPlayerLobby = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [publicRoom, setPublicroom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { doRequest: getRooms } = useRequest({
    url: '/api/rooms',
    method: 'get',
    data: {},
    onSuccess(data) {
      setRooms(data);
    },
  });
  const { doRequest: createRoom } = useRequest({
    url: '/api/rooms',
    method: 'post',
    data: { password, publicRoom },
    onSuccess() {
      setTimeout(() => {
        window.history.pushState({}, '', '/multiplayer/game');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
      }, 2000);
    },
  });

  useEffect(() => {
    getRooms();
  }, []);

  const onSubmit = (event: any) => {
    event.preventDefault();
    createRoom();
  };

  const roomList = rooms.map((room: Room) => {
    return (
      <tr>
        <td>{room.roomName}</td>
        <td>{room.players.length}</td>
        <td>{room.password !== '' ? '0' : ''}</td>
        <td>
          <button>JOIN</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        <h2>Rooms:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Players</th>
              <th>PW</th>
              <th />
            </tr>
          </thead>
          <tbody>{roomList}</tbody>
        </table>
        <button onClick={getRooms}>Refresh</button>
      </div>
      <div>
        <h3>Create a room</h3>
        <form onSubmit={onSubmit}>
          public: {publicRoom}
          <ToggleSwitch
            name="public"
            toggle={() => setPublicroom(!publicRoom)}
            style={{ right: '10px' }}
          />
          <h4>password</h4>
          <input
            type="password"
            placeholder="not required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export { MultiPlayerLobby };
