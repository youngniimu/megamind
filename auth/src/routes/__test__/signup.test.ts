import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';

const password = 'password';
const color = 'rgb(5%,5%,5%)';
const username = 'niimu';

it('doesnt crash if the domain is wrong', async () => {
  const res = await request(app).get('/thisdoesntexist').expect(404);
});

it('creates an user', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password,
      color,
      username,
    })
    .expect(201);

  const user = await User.findOne({ username });

  expect(user!.username).toEqual(username);
});

it('disallows duplicate usernames', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password,
      color,
      username,
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      password,
      color,
      username,
    })
    .expect(400);
});

it('sets a cookie after successfull signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      password,
      color,
      username,
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.com',
      password: 'password',
      color,
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.com',
      password: 'a',
      color,
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.fi',
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'a',
    })
    .expect(400);
});
