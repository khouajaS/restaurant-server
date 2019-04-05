import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema({
  name: String,
  state: String,
});

export default model('Restaurant', RestaurantSchema);
