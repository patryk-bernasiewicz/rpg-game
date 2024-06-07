import request from 'supertest';

import app from '../app';
import { User } from '../entity/User';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should login a user', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedpassword',
      comparePassword: jest.fn().mockResolvedValue(true),
    } as unknown as User;

    const res = await request(app).post('/api/login').send({
      username: 'testuser',
      password: 'hashedpassword',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should logout a user', async () => {
    const res = await request(app).post('/api/logout');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
