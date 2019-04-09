import mongoose from 'mongoose';
import Restaurant from '../src/models/restaurant';
import data from '../data/restaurants.json';
import { retry } from './utils';

const MONGO_URI_TEST = process.env.MONGO_URI_TEST || 'mongodb://localhost/restaurant-test';

const beforeAll = async () => {
  const mongoUrl = MONGO_URI_TEST.replace('localhost', process.IPAddress);

  await retry(mongoose, mongoose.connect, [mongoUrl, { useNewUrlParser: true }]);

  const listOfRestaurants = Object.values(data);

  await Restaurant.deleteMany();
  await Restaurant.insertMany(listOfRestaurants);
};

const afterAll = async () => {
  await Restaurant.deleteMany();
  await mongoose.disconnect();
};

export default { beforeAll, afterAll };
