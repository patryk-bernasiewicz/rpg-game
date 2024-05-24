import request from 'supertest';
import app from '../app';
import { mockUserRepository } from '../__mocks__/user.mock';
import { User } from '../entity/User';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null); // Użytkownik nie istnieje
    mockUserRepository.save.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'hashedpassword',
    } as User);

    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });
});
