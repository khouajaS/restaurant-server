import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import Restaurant from './models/restaurant';
import Album from './models/album';
import restaurantsJson from '../data/restaurants.json';
import albumsJson from '../data/albums.json';

const initDatabase = async () => {
  try {
    const restaurants = await Restaurant.find();
    const albums = await Album.find();
    if (restaurants.length < 4) {
      const listOfRestaurants = Object.values(restaurantsJson);
      await Restaurant.deleteMany();
      await Restaurant.insertMany(listOfRestaurants);
    }
    if (albums.length < 4) {
      await Album.deleteMany();
      await Album.insertMany(albumsJson.albums);
    }
  } catch (error) {
    throw new Error(error);
  }
};

dotEnv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/restaurant';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(initDatabase)
  .then(() => {
    app.listen(
      PORT,
      () => console.log(`Application Restaurant is running at port: ${PORT}`),
    );
  })
  .catch((error) => {
    console.error(error);
  });
