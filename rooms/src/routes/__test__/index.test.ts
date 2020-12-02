import request from 'supertest';
import { Room } from '../../models/room';
import { app } from '../../app';

const createRoom = async (status: boolean) => {
  const room = Room.build({
    admin: '1',
    players: ['1'],
    password: '1',
    publicRoom: status,
  });
  await room.save();
};

it('gets all the rooms', async () => {
  createRoom(true);
  createRoom(true);
  createRoom(false);
  const response = await request(app).get('/api/rooms/').send();
  expect(response.body.length).toEqual(2);
});
