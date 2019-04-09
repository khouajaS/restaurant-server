import { Schema, model } from 'mongoose';

const AlbumSchema = new Schema({
  albumId: Number,
  title: String,
  url: String,
  thumbnailUrl: String,
});

export default model('Album', AlbumSchema);
