import mongoose from 'mongoose';
import Restaurant from '../src/models/restaurant';
import data from '../data/restaurants.json';

const MONGO_URI_TEST = process.env.MONGO_URI_TEST || 'mongodb://localhost/restaurant-test';


const beforeAll = async () => {
  await mongoose.connect(MONGO_URI_TEST, { useNewUrlParser: true });
  const listOfRestaurants = Object.values(data);

  await Restaurant.deleteMany();
  await Restaurant.insertMany(listOfRestaurants);
};


const afterAll = async () => {
  await Restaurant.deleteMany();
  await mongoose.disconnect();
};

export default { beforeAll, afterAll };
