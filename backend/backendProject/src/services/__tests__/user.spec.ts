import { strictEqual, deepStrictEqual } from 'assert';
import supertest from 'supertest';
import app from '../../app';
import { DefaultTokenForTesting } from '../../config';
let server: any;

beforeEach(async () => {
  server = app.listen(3002);
});

afterEach(async () => {
  server.close();
});



describe('GET /api/user/all', () => {
  jest.setTimeout(10000);
  it('should retrieve users with partial properties successfully', async () => {
    
    const mockUserData = [
      { firstname: 'user1', email: 'user1@gmail.com', password: 'test@202' },
      { firstname: 'user2', email: 'user2@gmail.com', password: 'test@202' },
    ];

    const findMock = jest.fn().mockResolvedValue(mockUserData);

    jest.mock('../../model/user', () => ({
      __esModule: true,
      default: {
        find: findMock,
      },
    }));

    const response = await supertest(app)
      .get('/api/user/all')
      .expect(200)
      .set('Authorization', `Bearer ${DefaultTokenForTesting}`)
      .expect('Content-Type', /json/);

    strictEqual(response.status, 200);
    deepStrictEqual(response.body.message, 'Users retrieved successfully');
     expect(response.body.result).toHaveLength(3);

  });
});
