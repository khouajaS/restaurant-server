import request from 'supertest';
import app from '../src/app';
import helpers from './helpers';

describe('GET /restaurants/:state', () => {
  beforeAll(helpers.beforeAll);

  afterAll(helpers.afterAll);

  test('should return 400 if state with 1 char', (done) => {
    request
      .agent(app)
      .get('/restaurants/a')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({ message: 'state code must contains two characters' });
        return done();
      });
  });

  test('should return 400 if state with 3 char', (done) => {
    request
      .agent(app)
      .get('/restaurants/abc')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({ message: 'state code must contains two characters' });
        return done();
      });
  });

  test('should return empty list if state does not exist', (done) => {
    request
      .agent(app)
      .get('/restaurants/ab')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.restaurants.length).toEqual(0);
        return done();
      });
  });

  test('should return all LA restaurants', (done) => {
    request
      .agent(app)
      .get('/restaurants/LA')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.restaurants.length).toEqual(3);
        expect(res.body.restaurants[0].name).toBeDefined();
        expect(res.body.restaurants.map(rest => rest.state)).toEqual(['LA', 'LA', 'LA']);
        return done();
      });
  });

  test('should return all CA restaurants', (done) => {
    request
      .agent(app)
      .get('/restaurants/ca')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.restaurants.length).toEqual(1);
        expect(res.body.restaurants[0].name).toBeDefined();
        expect(res.body.restaurants[0].state).toEqual('CA');
        return done();
      });
  });
});
