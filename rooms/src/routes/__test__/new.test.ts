import request from 'supertest';
import { app } from '../../app';

it('creates a room with valid props', async () => {
  await request(app)
    .post('/api/rooms')
    .send({
      username: 'nuumy',
      password: 'asd',
      publicRoom: false,
    })
    .expect(201);
});
