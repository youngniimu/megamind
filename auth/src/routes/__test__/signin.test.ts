import request from 'supertest';
import { app } from '../../app';

it('fails when an username that doesnt exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      username: 'niimu',
      password: 'password',
    })
    .expect(400);
});

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'niimu',
      password: '123',
      color: 'rgb(5%,5%,5%)',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      username: 'niimu',
      password: '12',
    })
    .expect(400);
});

it('responds with a cookie with valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'niimu',
      password: '123',
      color: 'rgb(5%,5%,5%)',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      username: 'niimu',
      password: '123',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
