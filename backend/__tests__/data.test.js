const request = require('supertest');
const app = require('../app');

describe('GET /api/v1/data', () => {
  it('returns basic data array', async () => {
    const res = await request(app).get('/api/v1/data');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/data (feature-flagged)', () => {
  it('returns 404 when feature flag is disabled', async () => {
    const res = await request(app).get('/api/data');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not available');
    expect(res.body).toHaveProperty('feature', 'new-data-endpoint');
  });
});
