const request = require('supertest');
const app = require('../index'); 

describe('Shopping List API', () => {
  it('should create a new shopping list', async () => {
    const res = await request(app)
      .post('/shoppingList/create')
      .send({
        name: 'Weekend',
        ownerId: '111',
        members: ['22222']
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Weekend');
  });
});
