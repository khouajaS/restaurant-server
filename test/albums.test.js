import request from 'supertest';
import app from '../src/app';
import helpers from './helpers';

describe('GET /albums/:albumId', () => {
  beforeAll(helpers.beforeAll, 30000);

  afterAll(helpers.afterAll, 30000);

  test('should return 400 if albumId is not a number', (done) => {
    request
      .agent(app)
      .get('/albums/aa')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({ message: 'album id must be an int' });
        return done();
      });
  });

  test('should return 400 if albumId is not an int', (done) => {
    request
      .agent(app)
      .get('/albums/11.1')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({ message: 'album id must be an int' });
        return done();
      });
  });

  test('should return empty list if albumId does not exist', (done) => {
    request
      .agent(app)
      .get('/albums/12')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.albums.length).toEqual(0);
        return done();
      });
  });

  test('should return all pic with albumId 1', (done) => {
    request
      .agent(app)
      .get('/albums/1')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.albums.length).toEqual(3);
        expect(res.body.albums[0].title).toBeDefined();
        expect(res.body.albums[0].url).toBeDefined();
        expect(res.body.albums[0].thumbnailUrl).toBeDefined();
        expect(res.body.albums.map(album => album.albumId)).toEqual([1, 1, 1]);
        return done();
      });
  });

  test('should return all pic with albumId 2', (done) => {
    request
      .agent(app)
      .get('/albums/2')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.albums.length).toEqual(1);
        expect(res.body.albums[0].title).toBeDefined();
        expect(res.body.albums[0].url).toBeDefined();
        expect(res.body.albums[0].thumbnailUrl).toBeDefined();
        expect(res.body.albums[0].albumId).toEqual(2);
        return done();
      });
  });
});
